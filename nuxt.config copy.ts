import svgLoader from "vite-svg-loader";
import { head } from "./utils/helpers";
import { visualizer } from "rollup-plugin-visualizer";

const locales = [
  {
    code: "de",
    iso: "de",
    name: "Deutsch",
    file: "de-DE.json",
    lang: "de-DE",
    backend: "de",
  },
  {
    code: "en",
    iso: "en",
    name: "English",
    file: "en-US.json",
    lang: "en-US",
    backend: "en",
  },
  {
    code: "es",
    iso: "es",
    name: "Español",
    file: "es-ES.json",
    lang: "es-ES",
    backend: "es",
  },
  {
    code: "fr",
    iso: "fr",
    name: "Français",
    file: "fr-FR.json",
    lang: "fr-FR",
    backend: "fr",
  },
  {
    code: "it",
    iso: "it",
    name: "Italiano",
    file: "it-IT.json",
    lang: "it-IT",
    backend: "it",
  },
  {
    code: "ja",
    iso: "ja",
    name: "日本語",
    file: "ja-JP.json",
    lang: "ja-JP",
    backend: "ja",
  },
  {
    code: "ko",
    iso: "ko",
    name: "한국어",
    file: "ko-KR.json",
    lang: "ko-KR",
    backend: "ko",
  },
  {
    code: "pt",
    iso: "pt",
    name: "Português",
    file: "pt-BR.json",
    lang: "pt-BR",
    backend: "pt",
  },
  {
    code: "ru",
    iso: "ru",
    name: "Русский",
    file: "ru-RU.json",
    lang: "ru-RU",
    backend: "ru",
  },
  {
    code: "zh-hans",
    iso: "zh-hans",
    name: "简体中文",
    file: "zh-CN.json",
    lang: "zh-CN",
    backend: "zh_CN",
  },
  {
    code: "zh-hant",
    iso: "zh-hant",
    name: "繁體中文",
    file: "zh-TW.json",
    lang: "zh-TW",
    backend: "zh_TW",
  },
];

const baseUrl = process.env.VUE_APP_NEBO_BACKEND || "";
const ssoUrl = process.env.VUE_APP_SSO_BACKEND || "";

const meta = [
  { itemProp: "version", content: process.env.STATIC_SITE_DOCKERTAG },
  { itemProp: "sha-1", content: process.env.GIT_COMMIT_SHA1 },
];

const links = [
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  // {rel: 'manifest', href: 'public/manifest.json'}
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  build: {
    analyze: {
      enabled: true,
    },
    transpile: ["wide-align", "string-width"],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  devtools: { enabled: true },
  app: {
    head: head(baseUrl, meta, links),
  },
  css: [
    "~/assets/style/noto.css",
    "~/assets/style/handwriting.css",
    "~/assets/style/inter.css",
  ],
  runtimeConfig: {
    public: {
      baseUrl,
      ssoUrl,
    },
  },
  tailwindcss: {
    cssPath: "~/tailwind/index.scss",
    exposeConfig: false,
  },
  plugins: ["~/plugins/authPlugin.client.ts"],
  vite: {
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        // Allow serving langs from olevel up to the project root
        allow: [".."],
      },
      proxy: {
        "/ssourl": {
          target: "https://www.nebo.app",
          changeOrigin: true,
          cookiePathRewrite: "/",
        },
      },
    },
    plugins: [svgLoader({}), visualizer()],
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: ["./utils/helpers.js"],
      },
    },
  },
  // content: {
  //   defaultLocale: "en",
  //   locales: [
  //     "de",
  //     "en",
  //     "es",
  //     "fr",
  //     "it",
  //     "ja",
  //     "ko",
  //     "pt",
  //     "ru",
  //     "zh-hans",
  //     "zh-hant",
  //   ],
  // },
  routeRules: {
    "/get": { redirect: { to: "/", statusCode: 301 } },
    "/sso": { ssr: false },
    "/ssourl": { ssr: false },
  },
  i18n: {
    lazy: true,
    langDir: "locales/",
    defaultLocale: "en",
    locales: locales,
  },
  gtag: {
    id: "G-K4GM280492",
    initialConsent: false,
  },
  delayHydration: {
    mode: "init",
    debug: process.env.NODE_ENV === "development",
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-gtag",
    "@nuxtjs/tailwindcss",
    "ms-icons/nuxt",
    "nuxt-delay-hydration",
  ],
});
