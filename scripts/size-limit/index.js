import path from "path"
import sizeLimit from "size-limit"
import filePlugin from "@size-limit/file"
import esbuildPlugin from "@size-limit/esbuild"
import bytes from "bytes-iec"

import * as funcs from "../../dist/index.cjs"

function formatBytes(size) {
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
        import: {
          [pathToIndexFile]: `{ ${name} }`,
        },
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
    path: "./dist/index.mjs",
    limit: "5.1 kb",
    import: {
      "/Users/aleksandrkarpov/Documents/myprojects/tempo/dist/index.mjs": "*",
    },
    name: "all esm",
    files: ["/Users/aleksandrkarpov/Documents/myprojects/tempo/dist/index.mjs"],
    sizeLimit: 5100,
  },
  {
    path: "./dist/index.cjs",
    limit: "5.4 kb",
    import: {
      "/Users/aleksandrkarpov/Documents/myprojects/tempo/dist/index.cjs": "*",
    },
    name: "all cjs",
    files: ["/Users/aleksandrkarpov/Documents/myprojects/tempo/dist/index.cjs"],
    sizeLimit: 5400,
  },
]

const allFiles = [...esmFiles, ...cjsFiles, ...allImports]

sizeLimit([filePlugin, esbuildPlugin], {
  cwd: "/Users/aleksandrkarpov/Documents/myprojects/tempo",
  configPath: ".size-limit.cjs",
  checks: allFiles,
}).then((results) => {
  results.forEach((funcSize, index) => {
    const funcItem = allFiles[index]
    const { size } = funcSize
    const { name, path } = funcItem

    const importType = path === esmPath ? "esm" : "cjs"

    console.log("\n  " + name, importType, size, formatBytes(size))
  })
})
