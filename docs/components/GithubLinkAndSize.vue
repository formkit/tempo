<script lang="ts" setup>
defineProps<{
  githubLink: string
  functionSize: string
}>()
</script>

<template>
  <div class="flex items-center">
    <p class="!text-xs !m-0 bg-slate-300 p-1 rounded-md shrink-0 !leading-4">
      <span class="pr-2">size </span>
      <span class="font-bold">{{ functionSize }}</span>
    </p>
    <a :href="githubLink" class="p-1 bg-slate-300 ml-3 rounded-md">
      <IconGitHub class="opacity-70" />
    </a>
  </div>
</template>
