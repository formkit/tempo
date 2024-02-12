// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/color-mode"],
  app: {
    head: {
      title: "Tempo • Dates by FormKit",
      htmlAttrs: {
        class: "dark:bg-slate-900 dark:text-white",
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          crossorigin: "",
          href: "https://tempo-formkit-dsn.algolia.net",
        },
      ],
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
  colorMode: {
    classSuffix: "",
    storageKey: "tempo-color-mode",
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
