<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Add Content</h1>
          <div class="form-wrapper">
            <div class="row">
              <div class="col-6">
                <label for="type">Content Type</label>
                <select id="type" v-model="form.type">
                  <option value="article">Article</option>
                  <option value="note">Note</option>
                </select>
              </div>
            </div>
            <div class="divider"></div>
            <div class="row">
              <div class="col-12" v-if="form.type == 'article'">
                <label for="url">Original URL</label>
                <input type="text" id="url" />
              </div>
              <div class="col-6">
                <label for="author">Author</label>
                <input type="text" id="author" />
              </div>
              <div class="col-6">
                <label for="date">Date</label>
                <input type="text" id="date" autocomplete="off" />
              </div>
            </div>
          </div>
          <div class="form-wrapper article-form-wrapper">
            <textarea
              id="title"
              ref="title"
              placeholder="Enter title here..."
              rows="1"
              v-model="form.title"
            ></textarea>
            <textarea
              id="content"
              ref="content"
              placeholder="Enter content here..."
              rows="5"
              v-model="form.content"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from "js-datepicker";

export default {
  data: function () {
    return {
      form: {
        type: "article",
        title: "",
        content: "",
      },
    };
  },
  mounted() {
    datepicker("#date", {
      formatter: (input, date) => {
        const value = date.toLocaleDateString();
        input.value = value;
      },
    });
  },
  watch: {
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
  min-height: 500px;
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
    margin-bottom: 20px;
  }
  #content {
    font-size: 20px;
  }
}
</style>