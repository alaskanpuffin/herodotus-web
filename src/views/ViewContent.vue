<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <error v-if="error == true" :text="errorText"></error>
      <div v-if="content != null" class="col-12" id="content">
        <div id="toolbar">
          <router-link
            :to="'/edit/' + content.id"
            id="edit-btn"
            v-if="$store.state.userAuthenticated == true"
          >
            <i class="fa fa-pen"></i> Edit
          </router-link>
          <a id="delete-btn" @click="deleteArticle" v-if="$store.state.userAuthenticated == true">
            <span v-if="deleteLoading == false">
              <i class="fa fa-trash"></i> Delete
            </span>
            <span v-if="deleteLoading == true">
              <i class="fa fa-spinner fa-pulse"></i>
            </span>
          </a>
          <a id="link-btn" v-if="content.url" target="_blank" :href="content.url">
            <i class="fa fa-link"></i> Original Link
          </a>
        </div>
        <p id="date">{{ content.date }}</p>
        <h1>{{ content.title }}</h1>
        <br>
        <p id="author"><span v-if="content.author">By: {{ content.author }}</span> <span v-if="content.publisher && content.author" style="margin: 0 5px;">//</span> <i>{{ content.publisher }}</i></p>
        <div class="divider"></div>
        <div class="article" v-if="content.html == null">
          <p v-for="(line, index) in splitContent" :key="index">{{ line }}</p>
        </div>
        <div class="article" v-html="content.html" id="markdown-wrapper"></div>
      </div>
    </div>
    <loader v-if="loading == true"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import toastr from "toastr";
import Configuration from "@/configuration.js";
import showdown from "showdown";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "ViewContent",
  components: {
    Loader,
    Error,
  },
  props: {
    id: String,
  },
  data: function () {
    return {
      content: null,
      loading: true,
      deleteLoading: false,
      error: false,
      errorText: "An error has occured, please try again.",
    };
  },
  mounted() {
    var converter = new showdown.Converter({tables: true, emoji: true});

    axios
      .get(`${apiRoot}/content/${this.id}/`)
      .then((response) => {
        this.content = response.data;
        if (this.content.richtext == true) {
          this.content.html = converter.makeHtml(this.content.content);
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        if (error.response.status == 404) {
          this.errorText = "This article does not exist.";
        }
      });
  },
  computed: {
    splitContent: function () {
      return this.content.content.split("\n");
    },
  },
  methods: {
    deleteArticle: function () {
      if (this.deleteLoading == false) {
        if (confirm("Are you sure you want to delete this article?") == true) {
          this.deleteLoading = true;
          var config = {
            headers: {
              Authorization: "Token " + this.$cookies.get("token"),
            },
          };
          axios
            .delete(`${apiRoot}/content/${this.id}/`, config)
            .then(() => {
              toastr.success("The article was successfully deleted.");
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
              toastr.error("An error has occured.");
            })
            .then(() => {
              this.deleteLoading = false;
            });
        }
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
  padding: 50px 80px;
  h1 {
    font-size: 34px;
  }
  .divider {
    width: 100px;
    height: 5px;
    border-radius: 5px;
    margin: 30px 0;
    background-color: rgb(170, 164, 138);
  }
  p {
    font-size: 20px;
    margin-bottom: 15px;
  }
  #toolbar {
    height: 33px;
    width: 100%;
    top: -33px;
    right: 0;
    position: absolute;
    padding-right: 20px;
    a {
      height: 30px;
      float: right;
      margin-left: 20px;
      border-radius: 5px 5px 0 0;
      line-height: 30px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      text-decoration: none;
      width: 100px;
      display: block;
      transition: 0.3s;
      margin-top: 3px;
      cursor: pointer;
      &:hover {
        height: 33px;
        top: -33px;
        margin-top: 0;
      }
    }
    #edit-btn {
      background-color: rgb(105, 162, 189);
    }
    #delete-btn {
      background-color: rgb(189, 105, 105);
    }
    #link-btn {
      background-color: rgb(216, 167, 77);
      width: 150px;
    }
  }
}
</style>