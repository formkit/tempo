<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ComputerIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-vue-next';

const colorMode = useColorMode()

type ColorMode = 'system' | 'light' | 'dark';

function handleColorModeChange(type: ColorMode) {
  colorMode.preference = type;
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
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="icon" class="transition-none">
            <ComputerIcon v-if="colorMode.preference === 'system'" class="size-5" />
            <MoonIcon v-else-if="colorMode.preference === 'dark'" class="size-5" />
            <SunIcon v-else class="size-5" />
          </UiButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-36">
          <DropdownMenuGroup>
            <DropdownMenuItem @click="handleColorModeChange('system')">
              <ComputerIcon class="me-2 size-4" /> System
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleColorModeChange('light')">
              <SunIcon class="me-2 size-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleColorModeChange('dark')">
              <MoonIcon class="me-2 size-4" /> Dark
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style>
</style>
