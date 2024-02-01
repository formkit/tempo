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
        class="super-header w-full mt-4 mb-[12%] sm:mb-10 md:mb-14 lg:mb-20 flex justify-between items-center"
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
        class="text-[10vw] justify-center mb-[12%] max-w-3xl m-auto"
        :delay="600"
      />
      <h1
        class="tagline text-center leading-tight lg:leading-tight text-[6vw] lg:text-6xl font-bold max-w-2xl m-auto opacity-0 translate-y-4 transition-all duration-600 data-[show]:opacity-100 data-[show]:translate-y-0 text-slate-700 mb-10 md:mb-14 lg:mb-20"
        :data-show="showTagline"
      >
        The easiest way to work with dates in&nbsp;JavaScript.
      </h1>
      <div
        class="flex flex-col justify-center items-center gap-4 sm:flex-row sm:gap-8"
      >
        <a
          class="bg-black py-3 px-6 text-white rounded-lg flex items-center text-sm"
          href="#introduction"
        >
          Get started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5 ml-2"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#copy-code"
          class="group font-mono text-sm text-fuchsia-700 shadow-lg py-3 px-6 bg-white rounded-lg flex items-center gap-4"
        >
          npm i @formkit/tempo
          <IconCopy class="w-3 text-gray-400 group-hover:text-fuchsia-700" />
        </a>
      </div>
    </header>
  </ContainerSection>
</template>
