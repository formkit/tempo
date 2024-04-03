import { defineConfig } from "tsup"
import { esbuildPluginFilePathExtensions as fpe } from "esbuild-plugin-file-path-extensions"

export default defineConfig([
  // for bundlers like vite, rollup, esbuild, webpack etc
  {
    entry: ["src/**.ts"],
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
    esbuildPlugins: [fpe()],
  },
  // common js for node and other backend runtimes
  {
    entry: ["src/index.ts"],
    format: ["cjs"],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    outExtension: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },

  // bundle js for browsers/cdn
  {
    entry: {
      bundle: "src/index.ts",
    },
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,

    outExtension: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },
])
