<template>
  <div id="content">
    <h1>General Settings</h1>
    <a class="btn" id="indexarticles" @click="indexArticles">
      <span v-if="indexloading == false">Re-Index MeiliSearch</span>
      <i v-if="indexloading == true" class="fa fa-spinner fa-pulse"></i>
    </a>
    <a class="btn" id="logoutall" @click="logoutAllSessions"
      >Log Out All Current Sessions</a
    >

    <p id="version">
      Frontend Version: {{ $store.state.version }} - Backend Version:
      <span v-if="versionLoading == false">{{ backendVersion }}</span
      ><i v-else class="fa fa-spinner fa-pulse"></i>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Configuration from "@/configuration.js";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "GeneralSettings",
  data: function () {
    return {
      indexloading: false,
      versionLoading: true,
      backendVersion: "",
    };
  },
  mounted() {
    axios
      .get(`${apiRoot}/version/`)
      .then((response) => {
        this.backendVersion = response.data.version;
      })
      .catch(() => {
        this.backendVersion = "error";
      })
      .then(() => {
        this.versionLoading = false;
      });
  },
  methods: {
    logoutAllSessions: function () {
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .post(`${apiRoot}/api/auth/logoutall/`, {}, config)
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
    indexArticles: function () {
      if (this.indexloading == false) {
        this.indexloading = true;
        var config = {
          headers: {
            Authorization: "Token " + this.$cookies.get("token"),
          },
        };
        axios
          .get(`${apiRoot}/indexarticles/`, config)
          .then(() => {
            toastr.success(
              "The search index has been updated with all current articles."
            );
          })
          .catch((error) => {
            console.log(error);
            toastr.error("An error has occured.");
          })
          .then(() => {
            this.indexloading = false;
          });
      }
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
  position: relative;
  #version {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .btn {
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-top: 30px;
    text-align: center;
    transition: 0.3s;
  }
  #logoutall {
    border: solid rgb(179, 74, 74) 2px;
    color: rgb(179, 74, 74);
    &:hover {
      background-color: rgb(179, 74, 74);
      color: #fff;
    }
  }
  #indexarticles {
    border: solid rgb(197, 169, 116) 2px;
    color: rgb(197, 169, 116);
    &:hover {
      background-color: rgb(197, 169, 116);
      color: #fff;
    }
  }
}
</style>