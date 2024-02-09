<script setup lang="ts">
const showTagline = ref<undefined | boolean>(undefined)

onMounted(() => {
  setTimeout(() => {
    showTagline.value = true
  }, 1750)
})
</script>

<template>
  <ContainerSection>
    <header class="flex flex-col mb-24">
      <SuperHeader />
      <ClockFont
        chars="tempo"
        class="text-[10vw] justify-center mb-4 max-w-3xl m-auto text-sky-500 !px-20 !py-16 !rounded-2xl"
        :delay="600"
      />
      <h1
        class="tagline text-center lg:leading-none text-[6vw] lg:text-6xl font-bold max-w-2xl m-auto opacity-0 translate-y-4 transition-all duration-700 data-[show]:opacity-100 data-[show]:translate-y-0 text-slate-700 mb-10 md:mb-14 lg:mb-20"
        :data-show="showTagline"
      >
        The easiest way to work with dates in&nbsp;JavaScript.
      </h1>
      <HeaderButtons />
    </header>
  </ContainerSection>
</template>
