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
</style>
