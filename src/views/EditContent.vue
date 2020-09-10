<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="content">
          <h1>Edit Content</h1>

          <loader v-if="loading == true"></loader>
          <error v-if="error == true" :text="errorText"></error>

          <content-form
            :form="form"
            :submitLoading="submitLoading"
            v-if="loading == false && error == false"
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
      loading: true,
      submitLoading: false,
      error: false,
      errorText: "An error has occured, please try again.",
    };
  },
  mounted() {
    axios
      .get(`${apiRoot}/content/${this.id}/`)
      .then((response) => {
        this.form = response.data;
        console.log(response.data);
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
  methods: {
    submitForm: function () {
      this.submitLoading = true;
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .put(
          `${apiRoot}/content/${this.form.id}/`,
          this.form,
          config
        )
        .then(() => {
          toastr.success("The article was successfully updated.");
          this.$router.push("/content/" + this.form.id);
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