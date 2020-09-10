<template>
  <div id="home">
    <div class="container">
      <div class="row" v-if="loading == false && error == false && content.length >= 1">
        <div class="col-12 mt-4">
          <h1 style="margin: 1%;">Search Results For "{{ $store.state.search }}"</h1>
        </div>
      </div>
      <div v-masonry="searchResultsPage" item-selector=".card" transition-duration="0">
        <card-content v-masonry-tile v-for="card in content" :card="card" :key="card.id" />
      </div>
    </div>
    <error v-if="content.length < 1 && loading == false" :text="'No results found.'"></error>
    <loader v-if="loading == true"></loader>
    <error v-if="error == true" :text="'An error has occured, please try again.'"></error>
  </div>
</template>

<script>
import CardContent from "@/components/CardContent.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import axios from "axios";
import Configuration from '@/configuration.js';

const apiRoot = Configuration.value('apiRoot');

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
    this.scroll();
    this.fetchArticles(`${apiRoot}/search/?q=${this.$store.state.search}`);
  },
  watch: {
    '$store.state.search': function (val) {
      this.content = [];
      this.fetchArticles(`${apiRoot}/search/?q=${val}`);
    },
  }
};
</script>