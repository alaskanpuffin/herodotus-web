<template>
  <div id="content">
    <loader v-if="loading == true"></loader>
    <h1 class="mb-3">Manage Users</h1>

    <error v-if="error == true" :text="errorText"></error>

    <router-link to="/settings/user/add" id="adduser" v-if="loading == false && error == false">
      <i class="fa fa-plus"></i> Add
    </router-link>
    <user-card
      v-for="(user, index) in content"
      v-on:remove="content.splice(index, 1)"
      :user="user"
      :key="user.id"
    ></user-card>
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
    UserCard,
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
      .get(process.env.VUE_APP_API_ROOT + "/user/", config)
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