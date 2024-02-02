<script lang="ts" setup>
const props = defineProps({
  char: {
    type: String,
    required: true,
  },
  settleTime: {
    type: Number,
    required: true,
  },
  start: {
    type: Boolean,
    default: true,
  },
})
const chars = "0123456789abcdefghijklmnopqrstuvwxyz"
const currentChar = ref("")
const finished = ref(false)

onMounted(() => {
  const easeOutQuad = (t: number) => t * (2 - t)
  let startTime: number
  let duration: number
  let hasRun = false
  const updateChar = (firstCall = false) => {
    if (firstCall) {
      startTime = Date.now()
      duration = props.settleTime
      hasRun = true
    }
    const elapsedTime = Date.now() - startTime
    const progress = elapsedTime / duration
    if (progress < 1) {
      const easedTime = easeOutQuad(progress)
      const randomIndex = Math.floor(Math.random() * chars.length)
      currentChar.value = chars[randomIndex]
      const nextUpdate = Math.round(easedTime * 100)
      setTimeout(updateChar, nextUpdate)
    } else {
      currentChar.value = props.char
      finished.value = true
    }
  }
  const stopWatch = watchEffect(() => {
    props.start && !hasRun && updateChar(true)
  })
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
