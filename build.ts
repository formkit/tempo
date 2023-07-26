import { execa } from "execa"
import consola from "consola"
import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"

async function clean() {
  console.info("Cleaning up old dist directory")
  await execa("shx", ["rm", "-rf", `./dist`])
}

async function base() {
  console.info("Rolling up tempo")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.ts",
    "--configPlugin",
    "typescript",
  ])
}

async function declarations() {
  console.info("Creating declarations file")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.ts",
    "--configPlugin",
    "typescript",
    "--environment",
    "DECLARATIONS:true",
  ])
  await execa("shx", ["mv", "./dist/src/index.d.ts", "./dist/index.d.ts"])
  await execa("shx", ["rm", "-r", "./dist/src"])
}

async function terser() {
  console.info("Creating minified version")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.ts",
    "--configPlugin",
    "typescript",
    "--environment",
    "MIN:true",
  ])
}

async function addPackageJSON() {
  console.info("Writing package.json")
  const raw = await readFile(resolve("./package.json"), "utf8")
  const packageJSON = JSON.parse(raw)
  delete packageJSON.private
  delete packageJSON.devDependencies
  delete packageJSON.scripts
  await writeFile(
    resolve("./dist/package.json"),
    JSON.stringify(packageJSON, null, 2)
  )
}

;(async () => {
  await clean()
  consola.log("Rolling up module...")
  await base()
  consola.log("Rolling up declarations...")
  await declarations()
  consola.log("Minifying...")
  await terser()
  consola.log("Adding package.json")
  await addPackageJSON()
  consola.success("Build complete")
})()
