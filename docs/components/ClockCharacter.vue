<script lang="ts" setup>
const props = defineProps<{
  char: string
  settleTime: number
}>()
const chars = "0123456789abcdefghijklmnopqrstuvwxyz"
const currentChar = ref("")
const finished = ref(false)

onMounted(() => {
  let startTime = Date.now()
  let duration = props.settleTime
  let easeOutQuad = (t: number) => t * (2 - t)

  const updateChar = () => {
    let elapsedTime = Date.now() - startTime
    let progress = elapsedTime / duration
    if (progress < 1) {
      let easedTime = easeOutQuad(progress)
      let randomIndex = Math.floor(Math.random() * chars.length)
      currentChar.value = chars[randomIndex]
      let nextUpdate = Math.round(easedTime * 100)
      setTimeout(updateChar, nextUpdate)
    } else {
      currentChar.value = props.char
      finished.value = true
    }
  }

  updateChar()
})
</script>

<template>
  <div class="block aspect-[0.71] w-[1em] relative">
    <svg class="aspect-[0.71] absolute inset-0 z-20" fill="currentColor">
      <use
        v-if="currentChar"
        :href="'/font-sprite.svg#char-' + currentChar"
        :class="`transition-all ${finished ? '' : ' opacity-20'}`"
      />
    </svg>
    <svg class="aspect-[0.71] absolute inset-0 z-0" fill="currentColor">
      <use href="/font-sprite.svg#char-8" class="opacity-5" />
      <use href="/font-sprite.svg#char-i" class="opacity-5" />
    </svg>
  </div>
</template>
