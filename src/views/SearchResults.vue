<template>
  <div id="home">
    <error v-if="error == true" :text="'An error has occured, please try again.'"></error>
    <div class="container">
      <div class="row mt-5">
        <card-content v-for="card in content" :card="card" :key="card.id" />
      </div>
    </div>
    <error v-if="content.length < 1" :text="'No results found.'"></error>
    <loader v-if="loading == true"></loader>
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
      content: [],
      loading: true,
      error: false,
      nextPageUrl: null,
    };
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 100 &&
          this.loading == false && this.nextPageUrl != null
        ) {
          this.fetchArticles(this.nextPageUrl);
        }
      };
    },
    fetchArticles(url) {
      this.loading = true;
      axios
        .get(url)
        .then((response) => {
          this.content = this.content.concat(response.data.results);
          this.nextPageUrl = response.data.next
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.error = true;
        });
    },
  },
  mounted() {
    this.fetchArticles(process.env.VUE_APP_API_ROOT + "/search/?q=" + this.$route.query.q);
    this.scroll();
  },
  watch: {
    '$store.state.search': function (val) {
      this.content = [];
      this.fetchArticles(process.env.VUE_APP_API_ROOT + "/search/?q=" + val);
    },
  }
};
</script>