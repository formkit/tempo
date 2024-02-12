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
    <NuxtPage />
  </ContainerSection>
  <TheFooter />
</template>
