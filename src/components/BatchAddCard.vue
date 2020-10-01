<template>
  <div id="feed-card">
    <div id="name-block">
      <h2>{{ site.publisher }}</h2>
      <p>
        {{ site.url }}
      </p>
    </div>
    <div id="actions">
      <a id="delete-feed" @click="deleteFeed" v-if="loading == false">
        <i class="fa fa-trash"></i>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "BatchAddCard",
  props: ["site", "loading"],
  methods: {
    deleteFeed: function () {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="scss" scoped>
#feed-card {
  width: 100%;
  min-height: 70px;
  box-shadow: 0 1px 3px rgb(204, 204, 204);
  padding: 10px 20px;
  margin-top: 15px;
  background-color: #fff;
  position: relative;
  p {
    max-width: 80%;
    word-break: break-word;
  }
  #actions {
    height: 70px;
    position: absolute;
    top: 0;
    right: 0;
    a {
      width: 30px;
      height: 30px;
      margin: 20px 0;
      margin-right: 20px;
      display: inline-block;
      background-color: rgb(230, 230, 230);
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      color: #000;
    }
  }
}
</style>