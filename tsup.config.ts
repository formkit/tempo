import { defineConfig } from "tsup"
import { esbuildPluginFilePathExtensions as fpe } from "esbuild-plugin-file-path-extensions"

export default defineConfig([
  // for bundlers
  {
    entry: ["src/**.ts"],
    format: ["cjs", "esm"],
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: true,
    outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
    esbuildPlugins: [fpe()], // this extension adds .mjs / .cjs to imports, this also prevents separate chunk files
  },
  // for cdn/browsers
  {
    // entry: ["src/index.ts"],
    entry: {
      bundle: "src/index.ts",
    },
    format: ["cjs", "esm"],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,

    outExtension: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },
])
