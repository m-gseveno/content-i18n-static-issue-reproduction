<template>
  <h1>Blogs</h1>
  <NuxtLink :to="switchLocalePath('fr')">FR</NuxtLink>
  <br />
  <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
  <br />
  <NuxtLink :to="switchLocalePath('es')">ES</NuxtLink>
  <br />
  <br />
  <blog />
</template>

<script setup>
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const i18n = useI18n();
</script>
