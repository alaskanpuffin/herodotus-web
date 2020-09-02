<template>
  <div id="error">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
#error {
    width: 100%;
    text-align: center;
    font-size: 25px;
    margin: 50px 0;
}
</style>