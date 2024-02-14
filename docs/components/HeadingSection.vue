<script lang="ts" setup>
defineProps<{
  title: string
  size?: "sm"
  sidebarExclude?: boolean
}>()
const heading = ref<HTMLElement>()
const isInView = useElementVisibility(heading)
</script>

<template>
  <component
    :is="size === 'sm' ? 'h3' : 'h2'"
    class="text-2xl data-[size=sm]:text-base mb-8"
    ref="heading"
    :id="title.toLowerCase().replace(/ /g, '-')"
    :data-size="size"
    :data-sidebar-exclude="sidebarExclude"
  >
    <span class="sr-only">{{ title }}</span>
    <ClockFont
      :chars="title.toLocaleLowerCase()"
      :delay="120"
      :start="isInView"
    />
  </component>
</template>
