<template>
  <div id="content">
    <h1 class="mb-2">Edit User</h1>
    <loader v-if="loading == true"></loader>
    <error v-if="error == true" :text="errorText"></error>
    <user-form :form="form" :submitLoading="submitLoading" v-if="loading == false && error == false"></user-form>
  </div>
</template>

<script>
import UserForm from "@/views/UserForm.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import axios from "axios";
import toastr from "toastr";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  name: "AddUser",
  components: {
    UserForm,
    Loader,
    Error
  },
  props: ['id'],
  data: function () {
    return {
      form: {
        username: "",
        email: "",
        is_staff: false,
        first_name: "",
        last_name: "",
        password: null,
      },
      content: null,
      loading: true,
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
        .put(`${apiRoot}/user/${this.id}/`, this.form, config)
        .then(() => {
          toastr.success("The user was successfully updated.");
          this.$router.push("/settings/users");
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
  mounted() {
    var config = {
      headers: {
        Authorization: "Token " + this.$cookies.get("token"),
      },
    };
    axios
      .get(`${apiRoot}/user/${this.id}/`, config)
      .then((response) => {
        this.form = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        if (error.response.status == 404) {
          this.errorText = "This user does not exist.";
        }
      });
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
}
</style>