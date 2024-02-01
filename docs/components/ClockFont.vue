<script lang="ts" setup>
defineProps<{
  chars: string
  delay: number
}>()
</script>

<template>
  <div class="flex">
    <ClockCharacter
      v-for="(char, i) in chars"
      :key="char"
      :char="char"
      :settle-time="delay + i * (delay / 2)"
    />
  </div>
</template>
