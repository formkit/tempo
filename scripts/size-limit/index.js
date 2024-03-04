import path from "path"
import fs from "fs"
import sizeLimit from "size-limit"
import filePlugin from "@size-limit/file"
import esbuildPlugin from "@size-limit/esbuild"
import bytes from "bytes-iec"

import * as funcs from "../../dist/index.cjs"

const formatBytes = (size) => {
  return bytes.format(size, { unitSeparator: " " })
}

const getConfigFromIndexFile = (pathToIndexFile, functionNames) => {
  return functionNames
    .map((name) => {
      if (name === "default") {
        return
      }

      return {
        path: pathToIndexFile,
        import: { [pathToIndexFile]: `{ ${name} }` },
        name,
        files: [pathToIndexFile],
      }
    })
    .filter(Boolean)
}

const baseDir = process.cwd()
const esmPath = path.resolve(baseDir, "./dist/index.mjs")
const cjsPath = path.resolve(baseDir, "./dist/index.cjs")

const functionNames = Object.keys(funcs)

const esmFiles = getConfigFromIndexFile(esmPath, functionNames)
const cjsFiles = getConfigFromIndexFile(cjsPath, functionNames)

const allImports = [
  {
    path: esmPath,
    limit: "5.1 kb",
    import: { [esmPath]: "*" },
    name: "all esm",
    files: [esmPath],
    sizeLimit: 5100,
  },
  {
    path: cjsPath,
    limit: "5.4 kb",
    import: { [cjsPath]: "*" },
    name: "all cjs",
    files: [cjsPath],
    sizeLimit: 5400,
  },
]

const allFiles = [...esmFiles, ...cjsFiles, ...allImports]

const getFuncSizes = async () => {
  const result = await sizeLimit([filePlugin, esbuildPlugin], {
    cwd: "/Users/aleksandrkarpov/Documents/myprojects/tempo",
    configPath: ".size-limit.cjs",
    checks: allFiles,
  })

  const funcs = {}

  result.forEach((funcSize, index) => {
    const funcItem = allFiles[index]
    const { size } = funcSize
    const { name, path } = funcItem

    const importType = path === esmPath ? "esm" : "cjs"

    if (!funcs[name]) funcs[name] = {}

    funcs[name][importType] = { size, formattedSize: formatBytes(size) }

    console.log("\n  " + name, importType, size, formatBytes(size))
  })

  return funcs
}

getFuncSizes().then((sizes) => {
  const pathToSave = path.resolve(baseDir, "docs/assets/func-sizes.json")
  fs.writeFileSync(pathToSave, JSON.stringify(sizes, null, 2))
})
