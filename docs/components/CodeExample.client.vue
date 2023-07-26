<script setup lang="ts">
import "../monaco-config"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
const props = defineProps<{ location: string }>()
const code = ref("")
const el = ref<null | HTMLDivElement>(null)
const value = await import(/* @vite-ignore */ `../${props.location}?raw`)
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
