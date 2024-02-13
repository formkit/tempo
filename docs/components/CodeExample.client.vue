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
    fontSize: 14,
    scrollbar: {
      vertical: "hidden",
      alwaysConsumeMouseWheel: false,
    },
    value: code.value.replace(/\n$/, ""),
    overviewRulerLanes: 0,
    language: "typescript",
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    lineNumbers: "on",
    lineNumbersMinChars: 3,
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
        sensibleError.value = ""
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
    :class="`
      relative
      flex
      flex-col
      md:flex-row
      md:flex-wrap
      rounded-lg
      mt-8
      mb-12
      md:my-12
      md:-mr-2
      min-[850px]:-mr-10
      min-[900px]:-mr-20
      min-[1000px]:-mr-40
      lg:-mr-4
      min-[1100px]:-mr-[10vw]
      min-[1200px]:-mr-[16vw]
      min-[1600px]:-mr-64
      shadow-sm
      bg-[#f9f9f9] ${'' /* --vs-editor-background */}
      after:-z-10
      after:absolute
      after:-inset-px
      after:bg-sky-600/50
      after:rounded-lg

      dark:bg-[#180626] ${'' /* --vs-editor-background */}
      dark:after:-inset-px
      dark:after:bg-purple-900
    `"
  >
    <div class="md:w-3/5 min-[1200px]:w-1/2" ref="el"></div>
    <div
      :class="`
        md:w-2/5
        min-[1200px]:w-1/2
        bg-slate-200
        border
        border-l-slate-300
        font-mono
        text-xs
        md:text-sm
        p-4
        overflow-auto
        rounded-bl-lg
        rounded-br-lg
        md:rounded-tr-lg
        md:rounded-bl-none

        dark:bg-purple-600/5
        dark:border-t-0
        dark:border-r-0
        dark:border-b-0
        dark:border-l-purple-950/50
      `"
    >
      <ul v-if="result">
        <li
          v-for="logs in result"
          class="text-nowrap h-[] text-slate-800 text-sm empty:hidden md:empty:block dark:text-purple-300"
        >
          {{ logs ? logs.join(", ") : "" }}
        </li>
      </ul>
      <div class="bg-red-500 font-mono p-4" v-else-if="error">
        {{ error }}
      </div>
    </div>
    <div
      class="sensible-error bg-red-600 text-white font-mono font-sm p-2 text-xs relative -top-3 -mb-10 h-9 leading-0 z-50 w-auto rounded-lg border border-red-400 shadow-md"
      v-if="sensibleError"
    >
      {{ sensibleError }}
    </div>
  </div>
</template>

<style scoped></style>
