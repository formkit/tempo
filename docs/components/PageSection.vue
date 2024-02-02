<script lang="ts" setup>
defineProps<{
  id: string
}>()
</script>

<template>
  <div class="page-section max-w-3xl mx-auto my-16" :id="id">
    <slot />
  </div>
</template>

<style></style>
