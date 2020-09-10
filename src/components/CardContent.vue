<template>
  <div class="card" @click="$router.push('/content/' + card.id)">
    <h2>{{ card.title }}</h2>
    <p>{{ card.content }}</p>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  name: "CardContent",
  props: {
    card: Object,
  },
};
</script>

<style scoped lang="scss">
.card {
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  width: 46%;
  margin: 1%;
  padding: 20px 30px;
  position: relative;
  cursor: pointer;
  h2 {
    margin-bottom: 15px;
    position: relative;
    z-index: 10;
  }
  p {
    max-height: 200px;
    overflow: hidden;
    min-height: 80px;
  }
  .cover {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-size: auto 200%;
    background-position: bottom;
    background-image: url("../assets/white_fade.png");
  }
  span {
    color: rgb(139, 139, 139);
  }
}
</style>
