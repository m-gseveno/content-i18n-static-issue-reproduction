// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/content"],
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  content: {
    defaultLocale: "en",
    locales: [
      "en",
      "es",
      "fr",
    ],
  },
  i18n: {
    lazy: true,
    langDir: "locales/",
    defaultLocale: "en",
    strategy: 'prefix_except_default',
    detectBrowserLanguage:{
      useCookie: false
    },
    locales: [
      {
        code: "en",
        iso: "en",
        name: "English",
        file: "en-US.json",
      },
      {
        code: "fr",
        iso: "fr",
        name: "Français",
        file: "fr-FR.json",
      },
      {
        code: "es",
        iso: "es",
        name: "Spanish",
        file: "es-ES.json",
      },
    ],
  },
});
