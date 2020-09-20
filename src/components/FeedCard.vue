<template>
  <div id="feed-card">
    <div id="name-block">
      <h2>{{ feed.title }}</h2>
      <p>{{ feed.url }}</p>
    </div>
    <div id="actions">
      <a id="delete-feed" @click="deleteFeed">
        <i v-if="loading == false" class="fa fa-trash"></i>
        <i v-if="loading == true" class="fa fa-spinner fa-pulse"></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  name: "FeedCard",
  props: ["feed"],
  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    deleteFeed: function () {
      if (this.loading == false) {
        if (confirm("Are you sure you want to delete this feed?") == true) {
          this.loading = true;
          var config = {
            headers: {
              Authorization: "Token " + this.$cookies.get("token"),
            },
          };
          axios
            .delete(
              `${apiRoot}/feed/${this.feed.id}/`,
              config
            )
            .then(() => {
              toastr.success("The feed was successfully deleted.");
              this.$emit('remove');
            })
            .catch((error) => {
              console.log(error);
              toastr.error("An error has occured.");
            })
            .then(() => {
              this.loading = false;
            });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#feed-card {
  width: 100%;
  height: 70px;
  box-shadow: 0 1px 3px rgb(204, 204, 204);
  padding: 10px 20px;
  margin-top: 15px;
  background-color: #FFF;
  position: relative;
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