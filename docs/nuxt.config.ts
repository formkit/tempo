const description =
  "An open-source library for handling complex date operations across timezones. The easiest way to work with dates in JavaScript."

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-fathom",
  ],
  fathom: {
    siteId: "SJEMUVGK",
  },
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
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          name: "og:title",
          content: "Tempo • Dates by FormKit",
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "og:image",
          content: "https://tempo.formkit.com/og.png",
        },
        {
          name: "og:url",
          content: "https://tempo.formkit.com",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:site",
          content: "https://tempo.formkit.com",
        },
        {
          name: "twitter:creator",
          content: "@formkit",
        },
        {
          name: "twitter:title",
          content: "Tempo • Dates by FormKit",
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: "https://tempo.formkit.com/og.png",
        },
      ],
    },
  },
  tailwindcss: {
    config: {
      darkMode: "class",
      theme: {
        fontFamily: {
          mono: ["Menlo", "Monaco", "monospace"],
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
  debug: true,
  // nitro: {
  //   storage: {
  //     kv: {
  //       driver: process.env.KV_DRIVER,
  //       accountId: process.env.KV_ACCOUNT_ID,
  //       namespaceId: process.env.KV_NAMESPACE_ID,
  //       apiToken: process.env.KV_API_TOKEN,
  //     },
  //   },
  // },
})
