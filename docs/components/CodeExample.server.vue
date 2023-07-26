<script setup lang="ts">
const props = defineProps<{ location: string }>()
const code = ref("")
const value = await import(/* @vite-ignore */ `${props.location}?raw`)
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
