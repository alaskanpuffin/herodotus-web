<template>
  <div id="app">
    <the-nav-bar></the-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar.vue";

export default {
  name: 'Herodotus',
  components: {
    TheNavBar,
  },
}
</script>

<style lang="scss">
@import "./assets/css/style.scss";
@import '~bootstrap/scss/bootstrap-grid';
@import "~bootstrap/scss/_functions";
@import "~bootstrap/scss/_variables";
@import "~bootstrap/scss/mixins/_breakpoints";

@include media-breakpoint-down(sm) {
#app {
  margin-bottom: 90px;
}
}
</style>
