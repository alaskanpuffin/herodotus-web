<template>
  <div id="content">
    <loader v-if="loading == true"></loader>
    <h1 class="mb-3">Manage Tags</h1>

    <error v-if="error == true" :text="errorText"></error>

    <tag-card
      v-for="(tag, index) in content"
      v-on:remove="content.splice(index, 1)"
      :tag="tag"
      :key="tag.id"
    ></tag-card>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import TagCard from "@/components/TagCard.vue";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  name: "UserSettings",
  components: {
    Loader,
    Error,
    TagCard,
  },
  data: function () {
    return {
      content: null,
      loading: true,
      error: false,
      errorText: 'An error has occured, please try again.'
    };
  },
  mounted() {
    var config = {
      headers: {
        Authorization: "Token " + this.$cookies.get("token"),
      },
    };

    axios
      .get(`${apiRoot}/tag/`, config)
      .then((response) => {
        this.content = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        if (error.response.status == 403) {
          this.errorText = "You do not have permission to manage users.";
        }
      });
  },
};
</script>

<style lang="scss" scoped>
#content {
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  width: 100%;
  padding: 20px 30px;
  min-height: 300px;
  position: relative;
  #logoutall {
    width: 100%;
    border: solid rgb(179, 74, 74) 2px;
    color: rgb(179, 74, 74);
    cursor: pointer;
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-top: 30px;
    text-align: center;
    transition: 0.3s;
    &:hover {
      background-color: rgb(179, 74, 74);
      color: #fff;
    }
  }
  #adduser {
    position: absolute;
    padding: 3px 10px;
    font-weight: bold;
    text-decoration: none;
    top: 20px;
    right: 30px;
    display: block;
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 0;
    color: #FFF;
    background-color: #95958c;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgb(240, 240, 240);
    cursor: pointer;
  }
}
</style>