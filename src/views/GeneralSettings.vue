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

    <div class="divider"></div>

    <div class="row">
      <div class="col-sm-6">
        <a class="btn" @click="exportArticles"
          ><span v-if="exportLoading == false">Export Articles</span
          ><i v-else class="fa fa-spinner fa-pulse"></i
        ></a>
      </div>
      <div class="col-sm-6">
        <a class="btn" @click="importArticles"
          ><span v-if="importLoading == false">Import Articles</span
          ><i v-else class="fa fa-spinner fa-pulse"></i
        ></a>
        <input ref="importinput" type="file" style="display: none" />
      </div>
    </div>

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
import FileDownload from "js-file-download";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "GeneralSettings",
  data: function () {
    return {
      indexloading: false,
      versionLoading: true,
      backendVersion: "",
      downloadUrl: "",
      exportLoading: false,
      importLoading: false,
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

    this.$refs.importinput.addEventListener("change", (event) => {
      var formData = new FormData();
      this.importLoading = true;
      formData.append("content", event.target.files[0]);
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .post(`${apiRoot}/import/`, formData, config)
        .then(() => {
          toastr.success("The articles have been imported.");
        })
        .catch((error) => {
          console.log(error);
          toastr.error("An error has occured.");
        })
        .then(() => {
          event.target.value = '';
          this.importLoading = false;
        });
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
    exportArticles: function () {
      if (this.exportLoading == false) {
        this.exportLoading = true;
        var config = {
          headers: {
            Authorization: "Token " + this.$cookies.get("token"),
          },
          responseType: 'text',
          transformResponse: [data => data],
        };
        axios
          .get(`${apiRoot}/export/`, config)
          .then((response) => {
            console.log(response.data)
            FileDownload(response.data, "herodotus_export.json");
          })
          .catch((error) => {
            console.log(error);
            toastr.error("An error has occured.");
          })
          .then(() => {
            this.exportLoading = false;
          });
      }
    },
    importArticles: function () {
      this.$refs.importinput.click();
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
  .divider {
    height: 1px;
    width: 100%;
    margin-top: 30px;
    background-color: rgb(238, 238, 238);
  }
  #version {
    margin-top: 40px;
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
    border: solid rgb(175, 175, 175) 2px;
    color: rgb(85, 85, 85);
    &:hover {
      background-color: rgb(175, 175, 175);
      color: #fff;
    }
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