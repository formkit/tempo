<script setup lang="ts">
const showTagline = ref<undefined | boolean>(undefined)

onMounted(() => {
  setTimeout(() => {
    showTagline.value = true
  }, 1450)
})
</script>

<template>
  <ContainerSection>
    <header class="flex flex-col mb-14 md:mb-20 lg:mb-24">
      <SuperHeader />
      <ClockFont
        chars="tempo"
        class="text-[15vw] md:text-[10vw] justify-center mb-4 max-w-2xl m-auto text-sky-500 !px-0 !py-[10%] lg:!px-20 lg:!py-16 !rounded-2xl"
        :delay="500"
      />
      <h1
        :class="`
          tagline
          text-center
          text-[10vw]
          sm:text-[8vw]
          md:text-[6vw]
          font-bold
          leading-none
          max-w-2xl
          m-auto
          opacity-0
          translate-y-4
          transition-all
          duration-700
          data-[show]:opacity-100
          data-[show]:translate-y-0
          text-slate-700
          mb-14
          lg:leading-none
          lg:text-6xl
          lg:mb-20

          dark:text-purple-100
        `"
        :data-show="showTagline"
      >
        The <span class="italic">easiest</span> way to work with
        <span class="text-sky-600 dark:text-purple-500">dates</span>
        in&nbsp;JavaScript.
      </h1>
      <HeaderButtons />
    </header>
  </ContainerSection>
</template>
