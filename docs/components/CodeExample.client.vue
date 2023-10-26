<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import "../monaco-config"
const props = defineProps<{ file: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
const stopWatch = watch(el, () => {
  const editor = monaco.editor.create(el.value!, {
    value: code.value,
    language: "typescript",
    minimap: { enabled: false },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
  })
  stopWatch()
  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue()
  })

})
</script>

<template>
  <div class="p-4 rounded-md bg-slate-100 dark:bg-slate-700">
    <div class="chrome" ref="el"></div>
  </div>
</template>

<style scoped>
.chrome {
  width: 500px;
  height: 300px;
}
</style>
