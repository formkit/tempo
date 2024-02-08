import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
})
