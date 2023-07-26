import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"

const DECLARATIONS = process.env.DECLARATIONS || false
const MIN = process.env.MIN || false

const external = ["../index"]

function createOutput() {
  if (DECLARATIONS) {
    return {
      dir: "./dist",
      format: "esm",
    }
  }
  return {
    file: `./dist/index.${MIN ? "min.js" : "mjs"}`,
    format: "esm",
  }
}

const plugins = [
  typescript({
    tsconfig: "tsconfig.json",
    compilerOptions: DECLARATIONS
      ? {
          declaration: true,
          emitDeclarationOnly: true,
        }
      : {},
    rootDir: "./",
    outDir: `./dist`,
    include: ["./src/**/*"],
    exclude: ["./docs"],
  }),
]

if (MIN) {
  plugins.push(terser())
}

export default {
  external,
  input: `./src/index.ts`,
  output: createOutput(),
  plugins,
}
