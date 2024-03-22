<template>
  <h1>Blogs</h1>
  <NuxtLink :to="switchLocalePath('fr')">FR</NuxtLink>
  <br>
  <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
  <br>
  <NuxtLink :to="switchLocalePath('es')">ES</NuxtLink>
  <br>
  <br>
  <ul>
    {{
      blogPosts
    }}
    <li v-for="item in blogPosts" :key="item.uid">
      <nuxt-link :to="localePath(`/blog/${item.uid}`)">{{
        item.title
      }}</nuxt-link>
      <p>{{ item.intro }}</p>
    </li>
  </ul>
</template>

<script setup>
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath()
const i18n = useI18n();

const { data: blogPosts } = await useAsyncData(
  `blog-posts-${i18n.locale.value}`,
  async () => {
    const data = await queryContent(i18n.locale.value, "blog")
      .only(["title", "intro", "uid", "published"])
      .sort({ published: -1, $numeric: true })
      .find()
      .then((item) => {
        return item;
      })
      .catch((e) => {
        if (e) {
          console.log(e);
        }
        console.log("IH");
      });

    if (data.length === 0) {
      return await queryContent("blog")
        .only(["title", "intro", "uid", "published"])
        .sort({ published: -1, $numeric: true })
        .find();
    }

    return data;
  },
  {
    watch: [i18n.locale],
  }
);
</script>
