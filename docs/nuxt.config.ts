// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  app: {
    head: {
      title: "Tempo • Dates by FormKit",
      htmlAttrs: {
        class: "dark:bg-slate-900 dark:text-white",
      },
    },
  },
  tailwindcss: {
    config: {
      darkMode: "class",
      theme: {
        fontFamily: {
          mono: ["Menlo", "Monaco", "Courier New", "monospace"],
        },
      },
    },
  },
  experimental: {
    componentIslands: true,
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  vite: {
    worker: {
      format: "es",
    },
  },
})
