<script setup lang="ts">
import docsearch from "@docsearch/js"
onMounted(() => {
  docsearch({
    container: "#docsearch",
    appId: "TIC56YZVU3",
    indexName: "tempo-formkit",
    apiKey: "57bf4858266f8e7c7037df759ac8df2f",
  })
})
</script>

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
