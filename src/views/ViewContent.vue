<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12" id="content">
        <h1>{{ content.title }}</h1>
        <div class="divider"></div>
        <p v-for="line in content.content.split('\n')" :key="line">{{ line }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: Number,
  },
  data: function () {
    return {
      content: null,
    };
  },
  mounted() {
    axios
      .get("http://172.20.191.165:8081/content/" + this.id + "/")
      .then((response) => (this.content = response.data))
      .catch(function (error) {
        console.log(error);
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