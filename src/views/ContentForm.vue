<template>
  <form @submit.prevent="submitForm" novalidate="true" ref="form">
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
              <i v-if="this.scrapeLoading == false" class="fa fa-download"></i>
              <i v-if="this.scrapeLoading == true" class="fa fa-spinner fa-pulse"></i>
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
            ref="date"
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
          <button>
            <span v-if="submitLoading == false">Submit</span>
            <span v-if="submitLoading == true">
              <i class="fa fa-spinner fa-pulse"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import IMask from "imask";
import axios from "axios";
import Pristine from "pristinejs";
import toastr from "toastr";
import autosize from 'autosize';
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  props: {
    form: Object,
    submitLoading: Boolean,
  },
  data: function () {
    return {
      scrapeLoading: false,
      pristine: null,
    };
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true && this.submitLoading == false) {
        this.$parent.submitForm();
      }
    },
    scrapeArticle: function () {
      if (this.scrapeLoading == false) {
        this.scrapeLoading = true;
        var config = {
          headers: {
            Authorization: "Token " + this.$cookies.get("token"),
          },
        };
        axios
          .get(
            `${apiRoot}/scrapearticle/?url=${this.form.url}`,
            config
          )
          .then((response) => {
            this.$set(this.form, "content", response.data.content);
            console.log(this.$refs.content.scrollHeight);
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
    IMask(this.$refs.date, {
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

    this.pristine = new Pristine(
      this.$refs.form,
      { errorClass: "error" },
      true
    );

    autosize(this.$refs.title)
    autosize(this.$refs.content)
  },
  watch: {
    "form.date": function () {
      if (this.form.date == "") {
        this.form.date = null;
      }
    },
    "form.title": function () {
      this.$nextTick(function () {
        autosize.update(this.$refs.title)
      });
    },
    "form.content": function () {
      this.$nextTick(function () {
        autosize.update(this.$refs.content)
      });
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