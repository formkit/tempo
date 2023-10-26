<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import "../monaco-config"
const props = defineProps<{ file: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
watch(el, () => {
  const code = el.value?.dataset.code
  monaco.editor.create(el.value!, {
    value: code,
    language: "typescript",
    minimap: { enabled: false },
  })
})
</script>

<template>
  <div class="chrome" ref="el" :data-code="code"></div>
</template>

<style scoped>
.chrome {
  width: 500px;
  height: 300px;
}
</style>
