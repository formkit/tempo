<script lang="ts" setup>
defineProps<{
  chars: string
}>()
</script>

<template>
  <div class="flex">
    <ClockCharacter
      v-for="(char, i) in chars"
      :key="char"
      :char="char"
      :settle-time="1000 + i * 750"
    />
  </div>
</template>
