<script lang="ts" setup>
defineProps({
  chars: {
    type: String,
    required: true,
  },
  delay: {
    type: Number,
    required: true,
  },
  start: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="inline-flex">
    <ClockCharacter
      v-for="(char, i) in chars"
      :key="char"
      :char="char"
      :start="start"
      :settle-time="delay + i * (delay / 2)"
    />
  </div>
</template>
