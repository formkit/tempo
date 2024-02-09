// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/color-mode"],
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
      theme: {
        fontFamily: {
          mono: ["Menlo", "Monaco", "Courier New", "monospace"],
        },
      },
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
  },
  experimental: {
    componentIslands: true,
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
})
