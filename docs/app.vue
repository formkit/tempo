<script setup lang="ts">
// import "@docsearch/css"
onMounted(async () => {
  const docsearch = await import("@docsearch/js")
  docsearch.default({
    container: "#docsearch",
    appId: "TIC56YZVU3",
    indexName: "tempo-formkit",
    apiKey: "57bf4858266f8e7c7037df759ac8df2f",
  })
  document.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLBodyElement &&
      e.target.classList.contains("DocSearch--active")
    ) {
      const closeButton = document.querySelector(".DocSearch-Cancel")
      if (closeButton instanceof HTMLElement) {
        closeButton.click()
      }
    }
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
    <NuxtPage class="mr-auto pt-20 ml-6 min-[1400px]:ml-10" />
  </div>
  <TheFooter />
</template>
