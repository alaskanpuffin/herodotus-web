<template>
  <div id="content">
    <h1>General Settings</h1>
    <a id="logoutall" @click="logoutAllSessions">Log Out All Current Sessions</a>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";

export default {
  name: "GeneralSettings",
  methods: {
    logoutAllSessions: function () {
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .post(process.env.VUE_APP_API_ROOT + "/api/auth/logoutall/", {}, config)
        .then(() => {
          this.$cookies.remove("token");
          this.$store.state.userAuthenticated = false;
          toastr.success("You have been logged out.");
        })
        .catch((error) => {
          console.log(error);
          toastr.error("An error has occured.");
        })
        .then(() => {
          this.$router.push("/");
        });
    },
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