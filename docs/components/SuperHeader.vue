<script lang="ts" setup>
import IconSun from '@/assets/sun.svg'
import IconMoon from '@/assets/moon.svg'
import IconSystem from '@/assets/system.svg'

const colorMode = useColorMode()

const handleColorModeChange = () => {
  const nextType = colorMode.preference === 'system' ? 'light' : colorMode.preference === 'light' ? 'dark' : 'system'

  colorMode.preference = nextType
}
</script>

<template>
  <div :class="`
      super-header
      w-full
      mt-4
      mb-[12%]
      sm:mb-10
      md:mb-14
      lg:mb-20
      flex
      justify-between
      items-center
    `">
    <NuxtLink to="https://formkit.com?utm_source=tempo&utm_medium=website&utm_campaign=header" :class="`
        group/logo
        head-message
        text-xs
        md:text-sm
        flex
        transition-all
        text-slate-600
        hover:text-slate-500
        grayscale
        hover:grayscale-0
        opacity-50
        hover:opacity-100

        dark:text-purple-300
        dark:hover:text-purple-500
      `">
      <LogoMark class="w-3 mr-2 fill-[#FCAB5E] grayscale group-hover/logo:grayscale-0" />
      Made with ♥ by
      <span class="hidden sm:inline sm:mx-[0.5ch]">the</span> FormKit
      <span class="hidden sm:inline sm:ml-[0.5ch]">team</span>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <ul class="flex gap-4">
        <li>
          <NuxtLink to="https://github.com/formkit/tempo" class="group/github flex items-center relative">
            <GitHubStars />
            <GitHubLogo
              class="text-slate-500 opacity-60 group-hover/github:opacity-100 w-4 h-4 sm:w-5 sm:h-5 dark:text-purple-500" />
          </NuxtLink>
        </li>
      </ul>

      <button @click="handleColorModeChange"
        class="size-10 flex items-center justify-center rounded text-blue-600 dark:text-purple-500 outline-none focus:ring-2 ring-blue-400 dark:ring-purple-600">
        <IconSun v-if="colorMode.preference === 'light'" class="text-xl" />
        <IconMoon v-else-if="colorMode.preference === 'dark'" class="text-xl" />
        <IconSystem v-else class="text-xl" />
      </button>
    </div>
  </div>
</template>

<style>
</style>
