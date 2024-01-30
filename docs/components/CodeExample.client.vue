<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import "../monaco-config"
import { processPlaygroundCode } from "~/src/processPlaygroundCode"
const props = defineProps<{ file: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
const result = ref()
const error = ref("")

const stopWatch = watch(el, () => {
  if (!(el.value instanceof HTMLElement)) return
  const container = el.value
  const editor = monaco.editor.create(container, {
    padding: {
      top: 16,
      bottom: 16,
    },
    fontSize: 16,
    scrollbar: {
      vertical: "hidden",
      alwaysConsumeMouseWheel: false,
    },
    value: code.value,
    overviewRulerLanes: 0,
    language: "typescript",
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    lineNumbers: "off",
    glyphMargin: false,
    folding: false,
  })
  stopWatch()

  let ignoreEvent = false
  function updateSize() {
    const width = container.clientWidth
    const contentHeight = Math.min(1000, editor.getContentHeight())
    container.style.height = `${contentHeight}px`
    try {
      ignoreEvent = true
      editor.layout({ width, height: contentHeight })
    } finally {
      ignoreEvent = false
    }
  }

  new ResizeObserver(updateSize).observe(el.value)

  let worker: Worker | null = null

  function runInsideWorker(code: string) {
    if (code === "") return
    code = processPlaygroundCode(code)
    if (worker) worker.terminate()
    result.value = ""
    error.value = ""

    worker = new Worker(
      new URL("../src/playground.worker.ts", import.meta.url),
      {
        type: "module",
      }
    )
    worker.postMessage(code)
    worker.onmessage = (e) => {
      result.value = e.data
    }
    worker.onerror = (e) => {
      result.value = ""
      error.value = "Your code contains errors."
    }
  }

  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue()
    updateSize()
    runInsideWorker(code.value)
  })
  updateSize()

  // Run the initial code
  runInsideWorker(editor.getValue())
})
</script>

<template>
  <div class="rounded-md bg-slate-100 dark:bg-slate-800 flex">
    <div class="w-1/2" ref="el"></div>
    <div class="w-1/2 bg-slate-200 font-mono whitespace-pre p-4">
      <div v-if="result">{{ result }}</div>
      <div class="bg-red-500 font-mono p-4" v-else-if="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
