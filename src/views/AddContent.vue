<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <form @submit.prevent="submitForm" novalidate="true" id="content-form">
            <h1>Add Content</h1>
            <div class="form-wrapper">
              <div class="row">
                <div class="col-6 form-group">
                  <label for="type">Content Type</label>
                  <select id="type" v-model="form.content_type">
                    <option value="article">Article</option>
                    <option value="note">Note</option>
                  </select>
                </div>
              </div>
              <div class="divider"></div>
              <div class="row">
                <div class="col-12 form-group" v-if="form.content_type == 'article'">
                  <label for="url">Original URL</label>
                  <div class="input-wrapper">
                    <input type="text" id="url" v-model="form.url" autocomplete="off" />
                    <a id="scrape-article" v-on:click="scrapeArticle" v-if="form.url != ''">
                      <i class="fa fa-download"></i>
                    </a>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <label for="author">Author</label>
                  <input type="text" id="author" v-model="form.author" autocomplete="off" />
                </div>
                <div class="col-6 form-group">
                  <label for="date">Date</label>
                  <input
                    type="text"
                    id="date"
                    autocomplete="off"
                    name="date"
                    maxlength="10"
                    placeholder="mm/dd/YYYY"
                    v-model="form.date"
                  />
                </div>
              </div>
            </div>
            <div class="form-wrapper article-form-wrapper">
              <div class="form-group">
                <textarea
                  id="title"
                  ref="title"
                  placeholder="Enter title here..."
                  rows="1"
                  v-model="form.title"
                  required
                  maxlength="300"
                ></textarea>
              </div>
              <div class="form-group">
                <textarea
                  id="content"
                  ref="content"
                  placeholder="Enter content here..."
                  rows="5"
                  v-model="form.content"
                  required
                ></textarea>
              </div>
              <div class="row">
                <div class="col-12">
                  <input type="submit" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IMask from "imask";
import axios from "axios";
import Pristine from "pristinejs";
import toastr from "toastr";

export default {
  data: function () {
    return {
      form: {
        content_type: "article",
        title: "",
        content: "",
        url: "",
        author: "",
        date: null,
      },
      pristine: null,
      loading: false,
      scrapeLoading: false,
    };
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true) {
        axios
          .post(process.env.VUE_APP_API_ROOT + "/content/", this.form)
          .then((response) => {
            console.log(response);
            this.form.content = "";
            this.form.title = "";
            this.form.date = "";
            this.form.author = "";
            this.form.url = "";
            toastr.success("The article was successfully added.");
          })
          .catch((error) => {
            console.log(error);
            toastr.error("An error has occured.");
          });
      }
    },
    scrapeArticle: function () {
      if (this.scrapeLoading == false) {
        this.scrapeLoading = true;
        axios
          .get(process.env.HERODOTUS_API_ROOT + "/scrapearticle/?url=" + this.form.url)
          .then((response) => {
            this.form.content = response.data.content;
            this.form.title = response.data.title;
            this.form.date = response.data.date;
            this.form.author = response.data.author;
            this.scrapeLoading = false;
            toastr.success("The website was successfully scraped.");
          })
          .catch((error) => {
            this.scrapeLoading = false;
            console.log(error);
            toastr.error("An error occured scraping the website.");
          });
      }
    },
  },
  mounted() {
    var date_element = document.getElementById("date");
    IMask(date_element, {
      mask: "m/d/Y",
      overwrite: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1000,
          to: 9999,
          maxLength: 4,
        },
      },
    });

    var form = document.getElementById("content-form");

    this.pristine = new Pristine(form, { errorClass: "error" }, true);
  },
  watch: {
    "form.date": function () {
      if (this.form.date == "") {
        this.form.date = null;
      }
    },
    "form.title": function () {
      this.$refs.title.style.height = "auto";
      this.$refs.title.style.height = this.$refs.title.scrollHeight + "px";
    },
    "form.content": function () {
      this.$refs.content.style.height = "auto";
      this.$refs.content.style.height = this.$refs.content.scrollHeight + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 10px inherit;
}
#scrape-article {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border: none;
  border-radius: 0;
  color: #fff;
  background-color: #95958c;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 1px 3px rgb(240, 240, 240);
  cursor: pointer;
  &:focus {
    outline: none;
  }
}
.form-wrapper {
  margin: 25px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  background-color: #fff;
  box-sizing: border-box;
  padding: 40px 60px;
  .divider {
    height: 1px;
    width: 100%;
    margin: 30px 0;
    background-color: rgb(238, 238, 238);
  }
}
.article-form-wrapper {
  transition: 2s;
  textarea {
    border: solid 1px #fff;
    width: 100%;
    resize: none;
    overflow: hidden;
    padding: 5px 15px;
    &:hover {
      border: solid 1px rgb(216, 216, 216);
    }
  }
  #title {
    font-size: 30px;
    font-weight: bold;
  }
  #content {
    font-size: 20px;
  }
}
.form-group.error textarea {
  border-bottom: solid rgb(224, 94, 94) 3px;
}
</style>