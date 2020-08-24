<template>
  <div id="home">
    <div class="container">
      <div class="row mt-5">
        <card-content v-for="card in content" :card="card" :key="card.id" />
      </div>
    </div>
  </div>
</template>

<script>
import CardContent from "@/components/CardContent.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    CardContent,
  },
  data: function () {
    return {
      content: null,
    };
  },
  mounted() {
    axios
      .get("http://172.20.191.165:8081/content/")
      .then(response => (
        this.content = response.data
      ))
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
