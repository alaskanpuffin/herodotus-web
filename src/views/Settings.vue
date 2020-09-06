<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4">
          <the-settings-nav></the-settings-nav>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheSettingsNav from "@/components/TheSettingsNav.vue";

export default {
  name: "Settings",
  components: {
    TheSettingsNav,
  },
};
</script>