<template>
  <div id="content">
    <loader v-if="loading == true"></loader>
    <error v-if="error == true" :text="errorText"></error>

    <h1 class="mb-3">Manage Users</h1>
    <user-card v-for="(user, index) in content" v-on:remove="content.splice(index, 1)" :user="user" :key="user.id"></user-card>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import UserCard from "@/components/UserCard.vue";

export default {
  name: "UserSettings",
  components: {
    Loader,
    Error,
    UserCard
  },
  data: function () {
    return {
      content: null,
      loading: true,
      error: false,
    };
  },
  mounted() {
    var config = {
      headers: {
        Authorization: "Token " + this.$cookies.get("token"),
      },
    };

    axios
      .get(process.env.VUE_APP_API_ROOT + "/user/", config)
      .then((response) => {
        this.content = response.data;
        console.log(response.data);
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.error = true;
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
}
</style>