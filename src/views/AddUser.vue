<template>
  <div id="content">
    <h1 class="mb-2">Add User</h1>
    <user-form :form="form" :submitLoading="submitLoading"></user-form>
  </div>
</template>

<script>
import UserForm from "@/views/UserForm.vue";
import axios from "axios";
import toastr from "toastr";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

export default {
  name: "AddUser",
  components: {
    UserForm,
  },
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
      submitLoading: false,
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
        .post(`${apiRoot}/user/`, this.form, config)
        .then(() => {
          toastr.success("The user was successfully created.");
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