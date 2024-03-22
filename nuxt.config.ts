// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  i18n: {
    lazy: true,
    langDir: "locales/",
    defaultLocale: "en",
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
        file: "fr-FR.json",
      },
    ],
  },
});
