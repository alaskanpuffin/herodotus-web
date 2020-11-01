<template>
  <div id="tags">
    <div v-for="tag in tags" :key="tag.id" class="tag-wrapper">
      <h2 :style="'background-color: ' + tag.color + '; color: ' + color(tag.color) + ';'">
      {{ tag.title }}
      </h2>
    </div>
  </div>
</template>

<script>
import contrast from "contrast";

export default {
  props: ["tags"],
  methods: {
    color: function (color) {
      if (!color || contrast(color) === "light") {
        return "#000";
      } else {
        return "#fff";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: inline-block;
  h2 {
    height: 20px;
    line-height: 20px;
    width: fit-content;
    margin-right: 5px;
    background-color: rgb(230, 230, 230);
    color: #000;
    display: block;
    border-radius: 5px;
    padding: 0 8px;
    font-size: 14px;
  }
}
</style>