<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <loader v-if="loading == true"></loader>
      <error v-if="error == true" :text="errorText"></error>
      <div v-if="content != null" class="col-12" id="content">
        <h1>{{ content.title }}</h1>
        <div class="divider"></div>
        <p v-for="line in content.content.split('\n')" :key="line">{{ line }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

export default {
  name: "ViewContent",
  components: {
    Loader,
    Error,
  },
  props: {
    id: String,
  },
  data: function () {
    return {
      content: null,
      loading: true,
      error: false,
      errorText: 'An error has occured, please try again.',
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API_ROOT + "/content/" + this.id + "/")
      .then((response) => {
        this.content = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        if (error.response.status == 404) {
          this.errorText = 'This article does not exist.'
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
  padding: 50px 80px;
  h1 {
    font-size: 25px;
  }
  .divider {
    width: 100px;
    height: 5px;
    border-radius: 5px;
    margin: 30px 0;
    background-color: rgb(170, 164, 138);
  }
  p {
    font-size: 20px;
    margin-bottom: 15px;
  }
}
</style>