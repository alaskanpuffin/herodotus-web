<template>
  <div id="login">
    <form>
      <h1>Login</h1>
      <div class="form-group">
        <label for="author">Username</label>
        <input type="text" id="author" v-model="form.username" autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="author">Password</label>
        <input type="password" id="author" v-model="form.password" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

console.log(axios);

export default {
  name: "Login",
  data: function () {
    return {
      form: {
        username: "",
        password: "",
      },
    };
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