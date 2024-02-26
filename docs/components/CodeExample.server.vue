<script setup lang="ts">
const props = defineProps<{ file: string }>()
const code = ref("")
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
</script>

<template>
  <div class="chrome" :style="{
    height: `${Math.min(1000, code.split('\n').length * 21)}px`
  }"></div>
</template>

<style scoped>
.chrome {
  width: 500px;
}
</style>
