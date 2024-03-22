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
    <ContentRenderer :value="page" />
  </main>
</template>

<script setup lang="ts">
const i18n = useI18n();
const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();
const article = route.fullPath.split("/").pop();
const switchLocalePath = useSwitchLocalePath();

const { data: page } = await useAsyncData(
  `${article}-${i18n.locale.value}`,
  () => {
    console.log(`loading ${i18n.locale.value}`);
    const data = queryContent(i18n.locale.value, `blog/${article}`)
      .findOne()
      .then((item: any) => {
        return item;
      })
      .catch((e: any) => {
        console.error(e);
        if (e) {
          console.log("fetching default");
          return queryContent(`blog/${article}`)
            .findOne()
            .then((item: any) => item)
            .catch((e: any) => console.error(e));
        }
      });

    return data;
  },
  {
    watch: [locale],
  }
);
</script>
