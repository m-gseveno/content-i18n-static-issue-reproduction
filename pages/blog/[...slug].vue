<template>
  <NuxtLink :to="switchLocalePath('fr')">FR</NuxtLink>
  <br />
  <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
  <br />
  <NuxtLink :to="switchLocalePath('es')">ES</NuxtLink>
  <br />
  <br />
  <main>
    <nuxt-link :to="localePath('blog')">Back</nuxt-link>
    <!-- <ContentRenderer :value="page" /> -->
    <main v-if="data">
      <ContentRenderer v-if="data" :value="data" />
    </main>
  </main>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const route = useRoute();
const article = route.fullPath.split('/').pop();
const { locale } = useI18n();

function redirect404() {
  const router = useRouter();
  router.push("/404");
}

interface ContentError extends Error {
  statusCode: number;
}

const { data, error } = await useAsyncData<
  ParsedContent,
  ContentError
>(`aricle:${useRoute().fullPath}`, () =>
  queryContent("/blog")
    .where({ _locale: locale.value, _path: `/blog/${article}` })
    .findOne()
);

if (error.value && error.value.statusCode === 404) {
  redirect404();
}
</script>
  