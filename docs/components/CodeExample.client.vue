<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import "../monaco-config"
import { processPlaygroundCode } from "~/src/processPlaygroundCode"
const props = defineProps<{ file: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
const result = ref<Array<string[]>>([])
const error = ref("")
const sensibleError = ref<string>()

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
    value: code.value.replace(/\n$/, ""),
    overviewRulerLanes: 0,
    language: "typescript",
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    lineNumbers: "off",
    glyphMargin: false,
    folding: false,
    renderLineHighlight: "none",
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
    result.value = []
    error.value = ""

    worker = new Worker(
      new URL("../src/playground.worker.ts", import.meta.url),
      {
        type: "module",
      }
    )

    worker.postMessage(code)
    worker.onmessage = (e: {
      data: { lineNumber: number; value: unknown } | { error: string }
    }) => {
      if ("error" in e.data) {
        sensibleError.value = e.data.error
        return
      } else {
        result.value[e.data.lineNumber] ??= []
        if (e.data.value instanceof Date) {
          result.value[e.data.lineNumber].push(
            `Date: ${e.data.value.toISOString()}`
          )
        } else {
          result.value[e.data.lineNumber].push(String(e.data.value))
        }
      }
    }
    worker.onerror = (e) => {
      result.value = []
      error.value = "Your code contains errors."
    }
  }

  let debounceTimer: NodeJS.Timeout | number | null = null
  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue()
    updateSize()
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => runInsideWorker(code.value), 500)
  })
  updateSize()

  // Run the initial code
  runInsideWorker(editor.getValue())
})
</script>

<template>
  <div
    class="flex flex-col md:flex-row rounded-lg my-8 md:my-12 mdl:-mx-8 lg:-mx-24 relative"
  >
    <div class="md:w-1/2" ref="el"></div>
    <div
      class="md:w-1/2 bg-slate-200 font-mono p-4 overflow-auto rounded-bl-lg rounded-br-lg md:rounded-tr-lg md:rounded-bl-none"
    >
      <ul v-if="result">
        <li
          v-for="logs in result"
          class="text-nowrap h-6 text-slate-600 empty:hidden md:empty:block"
        >
          {{ logs ? logs.join(", ") : "" }}
        </li>
      </ul>
      <div class="bg-red-500 font-mono p-4" v-else-if="error">
        {{ error }}
      </div>
    </div>
    <div
      class="sensible-error bg-red-600 text-white font-mono font-sm p-2 text-xs z-50 absolute top-[calc(100%-5px)] left-0 w-full rounded-bl-lg rounded-br-lg"
      v-if="sensibleError"
    >
      {{ sensibleError }}
    </div>
  </div>
</template>

<style scoped></style>
