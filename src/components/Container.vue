<template>
  <div>
    <Post :articlePost="articleCont[i]" v-for="(item, i) in articleCont" :key="i" />
  </div>
</template>

<script>
import Post from "./Post";

export default {
  name: "Container",
  components: {
    Post: Post,
  },
  props: {
    articleCont: Array,
  },
};
</script>

<style>
</style>