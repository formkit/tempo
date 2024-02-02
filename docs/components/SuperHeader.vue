<script lang="ts" setup></script>

<template>
  <div
    class="super-header w-full mt-4 mb-[12%] sm:mb-10 md:mb-14 lg:mb-20 flex justify-between items-center"
  >
    <NuxtLink
      to="https://formkit.com"
      class="head-message text-sm grayscale flex opacity-30 transition-all hover:opacity-100 hover:grayscale-0"
    >
      <LogoMark class="w-3 mr-2 fill-[#FCAB5E]" /> Made with ♥ by the FormKit
      team.
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
</template>

<style></style>
