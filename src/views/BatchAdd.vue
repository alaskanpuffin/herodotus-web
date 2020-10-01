<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Batch Add Content</h1>

          <button
            id="process-btn"
            @click="processContent"
            v-if="content.length != 0"
          >
            <span v-if="loading == false"
              ><b>Process Articles</b> <i class="fa fa-check-circle"></i
            ></span>
            <span v-if="loading == true">
              <i class="fa fa-spinner fa-pulse"></i>
            </span>
          </button>

          <div class="feed-wrapper">
            <div id="add-feed">
              <form @submit.prevent="submitForm" novalidate="true" ref="form">
                <div class="row">
                  <div class="col-4 col-sm-6">
                    <input
                      type="text"
                      v-model="form.url"
                      placeholder="Page URL"
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div class="col-4 col-sm-4">
                    <input
                      type="text"
                      v-model="form.title"
                      placeholder="Website Name (optional)"
                      autocomplete="off"
                    />
                  </div>
                  <div class="col-4 col-sm-2">
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
            <batch-add-card
              v-for="(site, index) in content"
              v-on:remove="content.splice(index, 1)"
              :site="site"
              :loading="loading"
              :key="index"
            ></batch-add-card>
          </div>
          <error
            v-if="content.length < 1 && loading == false"
            :text="'The list is empty.'"
          ></error>
          <error v-if="error == true" :text="errorText"></error>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "@/components/Error.vue";
import BatchAddCard from "@/components/BatchAddCard.vue";
import toastr from "toastr";
import Configuration from "@/configuration.js";
import Pristine from "pristinejs";
import axios from "axios";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "Feeds",
  props: {
    id: String,
  },
  components: {
    Error,
    BatchAddCard,
  },
  data: function () {
    return {
      form: {
        title: "",
        url: "",
      },
      content: [],
      loading: false,
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
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true) {
        this.content.unshift({
          url: this.form.url,
          publisher: this.form.title,
          content_type: 'article',
        });
        this.form.url = "";
      }
    },
    processContent: function () {
      if (this.content.length != 0 && this.loading == false) {
        this.loading = true;
        this.content.forEach((item) => {
          var config = {
            headers: {
              Authorization: "Token " + this.$cookies.get("token"),
            },
          };
          axios
            .get(`${apiRoot}/scrapearticle/?url=${item.url}`, config)
            .then((response) => {
              item.content = response.data.content;
              item.title = response.data.title;
              item.date = response.data.date;
              item.author = response.data.author;

              axios
                .post(`${apiRoot}/content/`, item, config)
                .then(() => {
                  toastr.success("The article was successfully added.");
                  this.content.pop();
                })
                .catch((error) => {
                  console.log(error);
                  toastr.error("An error has occured.");
                })
                .then(() => {
                  this.loading = false;
                });
            })
            .catch((error) => {
              this.loading = false;
              console.log(error);
              toastr.error("An error occured scraping the website.");
            });
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
#process-btn {
  width: 200px;
  position: absolute;
  top: 0;
  right: 15px;
  margin: 0;
}
@include media-breakpoint-down(sm) {
  #process-btn {
    position: static;
    width: 100%;
    margin-top: 25px;
  }
}
</style>