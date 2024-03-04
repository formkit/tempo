const funcs = require("./dist/index.cjs")

const path = "./dist/index.mjs"

module.exports = [
  ...Object.keys(funcs)
    .map((name) => {
      if (name === "format" || name === "parse") {
        return
      }
      return { path, name, import: `{ ${name} }` }
    })
    .filter(Boolean),

  { path, limit: "2.9 kb", import: "{ format }", name: "format" },
  { path, limit: "4.3 kb", import: "{ parse }", name: "parse" },
  { path, limit: "5.1 kb", import: "*", name: "all esm" },
  { path: "./dist/index.cjs", limit: "5.4 kb", import: "*", name: "all cjs" },
]
