<template>
  <div id="user-card">
    <div id="name-block">
      <h2>{{ user.username }}</h2>
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
    <div id="actions">
      <router-link :to="'/settings/user/' + user.id">
        <i class="fa fa-pen"></i>
      </router-link>
      <a id="delete-user" @click="deleteUser">
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
  name: "UserCard",
  props: ["user"],
  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    deleteUser: function () {
      if (this.loading == false) {
        if (confirm("Are you sure you want to delete this user?") == true) {
          this.loading = true;
          var config = {
            headers: {
              Authorization: "Token " + this.$cookies.get("token"),
            },
          };
          axios
            .delete(
              `${apiRoot}/user/${this.user.id}/`,
              config
            )
            .then(() => {
              toastr.success("The user was successfully deleted.");
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
#user-card {
  width: 100%;
  height: 70px;
  box-shadow: 0 1px 3px rgb(204, 204, 204);
  padding: 10px 20px;
  margin-top: 15px;
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