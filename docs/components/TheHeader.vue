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
    <header class="flex flex-col mb-[12%]">
      <div
        class="super-header w-full mt-4 mb-[12%] flex justify-between items-center"
      >
        <NuxtLink
          to="https://formkit.com"
          class="head-message text-sm grayscale flex opacity-30 transition-all hover:opacity-100 hover:grayscale-0"
        >
          <LogoMark class="w-3 mr-2 fill-[#FCAB5E]" /> Made with ♥ by the
          FormKit team.
        </NuxtLink>
        <ul class="flex gap-4">
          <li>
            <NuxtLink
              to="https://github.com/formkit/tempo"
              class="group flex items-center relative"
            >
              <GitHubStars />
              <GitHubLogo class="opacity-20 group-hover:opacity-100 w-5 h-5" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <ClockFont
        chars="tempo"
        class="text-[15vw] justify-center mb-[12%] max-w-3xl m-auto"
        :delay="600"
      />
      <h1
        class="tagline text-center leading-tight lg:leading-tight text-[6vw] lg:text-6xl font-bold max-w-2xl m-auto opacity-0 translate-y-4 transition-all data-[show]:opacity-100 data-[show]:translate-y-0 text-slate-700"
        :data-show="showTagline"
      >
        The easiest way to work with dates in&nbsp;JavaScript.
      </h1>
    </header>
  </ContainerSection>
</template>
