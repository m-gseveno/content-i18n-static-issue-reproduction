<template>
  <section>
    <h1>{{ $t('title') }}</h1>
    <nuxt-link :to="localePath('/blog')">To blog</nuxt-link>
    <ContentQuery
        path="/blog"
        :locale="i18n.locale.value"
        v-slot="{ data }"
        :only="['title', 'description', 'uid']"
        style="padding-top: 4rem"
      >
        <ul>
          <li v-for="item in data" :key="item.uid">
            <nuxt-link :to="localePath(`/blog/${item.uid}`)">
              {{  item.title }}
            </nuxt-link>
          </li>
        </ul>
      </ContentQuery>
  </section>
</template>

<script setup>
const localePath = useLocalePath();
const i18n = useI18n();
</script>
