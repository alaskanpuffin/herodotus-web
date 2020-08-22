<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Add Content</h1>
          <div class="form-wrapper">
            <input type="text" />
          </div>
          <div class="form-wrapper article-form-wrapper">
            <textarea id="title" ref="title" placeholder="Enter title here..." v-model="form.title"></textarea>
            <textarea id="content" ref="content" placeholder="Enter content here..." v-model="form.content"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        title: "",
        content: "",
      },
    };
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

input[type="text"]:focus,
textarea:focus {
  outline: none;
}
</style>