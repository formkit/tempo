<script lang="ts" setup>
defineProps<{
  chars: string
}>()
</script>

<template>
  <div class="flex">
    <svg v-for="char in chars" width="142" height="200">
      <use :href="'#char-' + char" />
    </svg>
  </div>
</template>
