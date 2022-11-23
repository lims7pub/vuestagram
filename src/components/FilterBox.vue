<template>
  <div :class="filter + ' filter-item'" :style="`background-image: url(${image})`">
    <slot></slot>
    <button @click="fire">버튼</button>
  </div>
</template>

<script>
export default {
  name: "filterBox",
  props: {
    image: String,
    filter: String,
  },
  methods: {
    fire() {
        this.emitter.emit('applyFilter', this.filter) //발사
    },
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>