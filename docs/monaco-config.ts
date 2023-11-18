import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import tempoDeclarations from "../dist/index.d.ts?raw"
import nightOwl from "~/src/night-owl"
import chromeTools from "~/src/chrome-tools"

if (typeof window !== "undefined") {
  self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === "json") {
        return new jsonWorker()
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker()
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker()
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker()
      }
      return new editorWorker()
    },
  }
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
  monaco.languages.typescript.typescriptDefaults.addExtraLib(`
    declare module '@formkit/tempo' {
      ${tempoDeclarations}
    }
  `)
  monaco.editor.defineTheme("night-owl", nightOwl)
  monaco.editor.defineTheme("chrome-dev-tools", chromeTools)
  const isDarkMode = false
  if (isDarkMode) {
    monaco.editor.setTheme("night-owl")
  } else {
    monaco.editor.setTheme("chrome-dev-tools")
  }
}
