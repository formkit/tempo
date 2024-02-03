<script lang="ts" setup>
defineProps<{
  title: string
  size?: "sm"
}>()
const heading = ref<HTMLElement>()
const isInView = useElementVisibility(heading)
</script>

<template>
  <h2
    class="text-2xl data-[size=sm]:text-base mb-8"
    ref="heading"
    :data-size="size"
  >
    <span class="sr-only">{{ title }}</span>
    <ClockFont
      :chars="title.toLocaleLowerCase()"
      :delay="200"
      :start="isInView"
    />
  </h2>
</template>
