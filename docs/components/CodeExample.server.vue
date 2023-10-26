<script setup lang="ts">
const props = defineProps<{ file: string }>()
const code = ref("")
const value = await import(`../examples/${props.file}.ts?raw`)
code.value = value.default
onMounted(() => {
  alert("here")
})
</script>

<template>
  <div class="chrome" :data-code="code"></div>
</template>

<style scoped>
.chrome {
  width: 500px;
  height: 300px;
}
</style>
