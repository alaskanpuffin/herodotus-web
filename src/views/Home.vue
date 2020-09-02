<template>
  <div id="home">
    <loader v-if="loading == true"></loader>
    <error v-if="error == true" :text="'An error has occured, please try again.'"></error>
    <div class="container">
      <div class="row mt-5">
        <card-content v-for="card in content" :card="card" :key="card.id" />
      </div>
    </div>
  </div>
</template>

<script>
import CardContent from "@/components/CardContent.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    CardContent,
    Loader,
    Error,
  },
  data: function () {
    return {
      content: null,
      loading: true,
      error: false,
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API_ROOT + "/content/")
      .then(response => {
        this.content = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.error = true;
      });
  },
};
</script>