<script setup lang="ts"></script>

<template>
  <TheHeader />
  <ContainerSection>
    <TheSearch />
  </ContainerSection>
  <div
    class="docs-layout flex w-full mt-20 border-t border-t-slate-300 dark:border-t-purple-950"
  >
    <TheSidebar />
    <NuxtPage class="mr-auto pt-20 ml-10" />
  </div>
  <TheFooter />
</template>
