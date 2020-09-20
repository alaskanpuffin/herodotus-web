<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Manage Content Feeds</h1>

          <div class="feed-wrapper">
            <div id="add-feed">
              <form @submit.prevent="submitForm" novalidate="true" ref="form">
                <div class="row">
                  <div class="col-6">
                    <input
                      type="text"
                      v-model="form.url"
                      placeholder="RSS Feed Url"
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      type="text"
                      v-model="form.title"
                      placeholder="Title"
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div class="col-2">
                    <button>
                      <span v-if="submitLoading == false">Add</span>
                      <span v-if="submitLoading == true">
                        <i class="fa fa-spinner fa-pulse"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <feed-card
              v-for="(feed, index) in content"
              v-on:remove="content.splice(index, 1)"
              :feed="feed"
              :key="feed.id"
            ></feed-card>
          </div>
          <error v-if="content.length < 1 && loading == false" :text="'No results found.'"></error>
          <loader v-if="loading == true"></loader>
          <error v-if="error == true" :text="errorText"></error>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import FeedCard from "@/components/FeedCard.vue";
import axios from "axios";
import toastr from "toastr";
import Configuration from "@/configuration.js";
import Pristine from "pristinejs";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "Feeds",
  props: {
    id: String,
  },
  components: {
    Loader,
    Error,
    FeedCard,
  },
  data: function () {
    return {
      form: {
        title: "",
        url: "",
      },
      content: [],
      loading: true,
      submitLoading: false,
      pristine: null,
      error: false,
      errorText: "An error has occured, please try again.",
    };
  },
  mounted() {
    this.pristine = new Pristine(
      this.$refs.form,
      { errorClass: "error" },
      true
    );
    axios
      .get(`${apiRoot}/feed/`)
      .then((response) => {
        console.log(response.data);
        this.content = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        if (error.response.status == 404) {
          this.errorText = "An error has occured.";
        }
      });
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true && this.submitLoading == false) {
        this.submitLoading = true;
        var config = {
          headers: {
            Authorization: "Token " + this.$cookies.get("token"),
          },
        };
        axios
          .post(`${apiRoot}/feed/`, this.form, config)
          .then((response) => {
            toastr.success("The feed was successfully added.");
            this.content.unshift({
              id: response.data.id,
              title: this.form.title,
              url: this.form.url,
              last_updated: null,
            });
            this.form.title = "";
            this.form.url = "";
          })
          .catch((error) => {
            console.log(error);
            toastr.error("An error has occured.");
          })
          .then(() => {
            this.submitLoading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.feed-wrapper {
  margin-top: 30px;
  #add-feed {
    width: 100%;
    box-shadow: 0 1px 3px rgb(204, 204, 204);
    padding: 10px;
    background-color: #fff;
    button {
      margin: 0;
      width: 100%;
    }
  }
}
</style>