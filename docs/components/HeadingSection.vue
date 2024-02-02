<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <h2 class="text-2xl mb-8 text-sky-500">
    <span class="sr-only">{{ title }}</span>
    <ClockFont :chars="title.toLocaleLowerCase()" :delay="200" />
  </h2>
</template>

<style></style>
