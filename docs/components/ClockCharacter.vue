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
      let nextUpdate = Math.round(easedTime * 150)
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
  <svg width="142" height="200">
    <use href="/font-sprite.svg#char-8" class="fill-lcd" />
    <use href="/font-sprite.svg#char-i" class="fill-lcd" />
    <use
      v-if="currentChar"
      :href="'/font-sprite.svg#char-' + currentChar"
      :class="`transition-all fill-sky-500${finished ? '' : ' opacity-50'}`"
      style="box-shadow: 0 0 1em rgba(0, 0, 255, 0.5)"
    />
  </svg>
</template>
