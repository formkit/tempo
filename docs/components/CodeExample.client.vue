<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import "../monaco-config"
const props = defineProps<{ file: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
const stopWatch = watch(el, () => {
  if (!(el.value instanceof HTMLElement)) return
  const container = el.value
  const editor = monaco.editor.create(container, {
    padding: {
      top: 16,
      bottom: 16,
    },
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
  function updateHeight() {
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

  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue()
    updateHeight()
  })
  updateHeight()
})
</script>

<template>
  <div class="p-4 rounded-md bg-slate-100 dark:bg-slate-800">
    <div class="chrome" ref="el"></div>
  </div>
</template>

<style scoped>
.chrome {
  width: 500px;
  height: 200px;
}
</style>
