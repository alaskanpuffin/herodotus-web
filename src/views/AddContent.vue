<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Add Content</h1>

          <loader v-if="loading == true"></loader>
          <error v-if="error == true" :text="errorText"></error>

          <content-form
            :form="form"
            :submitLoading="submitLoading"
            v-if="loading == false"
          ></content-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentForm from "@/views/ContentForm.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import axios from "axios";
import toastr from "toastr";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  name: "AddContent",
  props: {
    id: String,
  },
  components: {
    ContentForm,
    Loader,
    Error,
  },
  data: function () {
    return {
      form: {
        content_type: "article",
        title: "",
        content: "",
        url: "",
        author: "",
        date: null,
        richtext: false,
      },
      content: null,
      loading: false,
      submitLoading: false,
      error: false,
      errorText: "An error has occured, please try again.",
    };
  },
  methods: {
    submitForm: function () {
      this.submitLoading = true;
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .post(
          `${apiRoot}/content/`,
          this.form,
          config
        )
        .then(() => {
          toastr.success("The article was successfully added.");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          toastr.error("An error has occured.");
        })
        .then(() => {
          this.submitLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 10px inherit;
}
</style>