<script lang="ts" setup>
defineProps<{
  title: string
}>()
const heading = ref<HTMLElement>()
const isInView = useElementVisibility(heading)
watchEffect(() => console.log(isInView.value))
</script>

<template>
  <h2 class="text-2xl mb-8 text-sky-500" ref="heading">
    <span class="sr-only">{{ title }}</span>
    <ClockFont
      :chars="title.toLocaleLowerCase()"
      :delay="200"
      :start="isInView"
    />
  </h2>
</template>
