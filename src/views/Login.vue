<template>
  <div id="login">
    <form @submit.prevent="submitForm" novalidate="true" ref="form">
      <h1>Login</h1>
      <br />
      <div class="form-group">
        <label for="author">Username</label>
        <input type="text" id="author" v-model="form.username" autocomplete="off" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button>
        <span v-if="loading == false">Submit</span>
        <span v-if="loading == true">
          <i class="fa fa-spinner fa-pulse"></i>
        </span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Pristine from "pristinejs";
import toastr from "toastr";

export default {
  name: "Login",
  data: function () {
    return {
      form: {
        username: "",
        password: "",
      },
      pristine: null,
      loading: false,
    };
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true && this.loading == false) {
        this.loading = true;

        var config = {
          auth: {
            username: this.form.username,
            password: this.form.password,
          },
        };

        axios
          .post(
            process.env.VUE_APP_API_ROOT + "/api/auth/login/",
            this.form,
            config
          )
          .then((response) => {
            console.log(response);
            this.form.username = "";
            this.form.password = "";
            this.$cookies.set("token", response.data.token, -1);
            this.$store.state.userAuthenticated = true;
            this.$router.push("/");
            toastr.success("Login successful!");
          })
          .catch((error) => {
            console.log(error);
            toastr.error("The username or password is incorrect.");
          })
          .then(() => {
            this.loading = false;
          });
      }
    },
  },
  mounted() {
    this.pristine = new Pristine(
      this.$refs.form,
      { errorClass: "error" },
      true
    );
  },
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  width: 600px;
  padding: 40px 60px;
  margin: 50px auto;
}
</style>