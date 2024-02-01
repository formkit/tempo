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
    <svg class="aspect-[0.71] absolute inset-0 z-20">
      <use
        v-if="currentChar"
        :href="'/font-sprite.svg#char-' + currentChar"
        :class="`transition-all fill-sky-500${finished ? '' : ' opacity-20'}`"
      />
    </svg>
    <!-- <svg class="aspect-[0.71] absolute inset-0 blur-sm z-10">
      <use
        v-if="currentChar"
        :href="'/font-sprite.svg#char-' + currentChar"
        :class="`transition-all fill-sky-200${finished ? '' : ' opacity-20'}`"
      />
    </svg> -->
    <!-- <svg class="aspect-[0.71] absolute inset-0 z-0">
      <use href="/font-sprite.svg#char-8" class="fill-lcd" />
      <use href="/font-sprite.svg#char-i" class="fill-lcd" />
    </svg> -->
  </div>
</template>
