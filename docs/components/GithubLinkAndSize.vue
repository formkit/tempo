<script lang="ts" setup>
defineProps<{
  githubLink: string
  functionSize: string | undefined
}>()
</script>

<template>
  <div class="flex items-stretch gap-2">
    <span
      v-if="functionSize"
      class="flex items-center gap-x-1.5 py-0.5 rounded-md text-sky-500 dark:text-lime-500"
      title="Tree shaken size of this function."
    >
      <span class="font-bold text-sm">{{ functionSize }}</span>
    </span>
    <a
      :href="githubLink"
      class="flex items-center gap-x-1.5 py-0.5 rounded-md dark:hover:bg-purple-800 dark:text-white"
    >
      <IconGitHub />
    </a>
  </div>
</template>
