<template>
  <div class="card" @click="$router.push('/content/' + card.id)">
    <span>
      <tag-display-card :tags="card.tags" :style="'margin-bottom: 10px;'"></tag-display-card>
      {{ card.date }}
      <span v-if="card.publisher"> &#8226; {{ card.publisher }}</span>
      <span v-if="card.author"> &#8226; By: {{ card.author }}</span>
    </span>
    <h2>{{ card.title }}</h2>
    <p>{{ card.content }}</p>
    <div class="cover"></div>
  </div>
</template>

<script>
import TagDisplayCard from "@/components/TagDisplayCard.vue";

export default {
  name: "CardContent",
  props: {
    card: Object,
  },
  components: {
    TagDisplayCard,
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
@include media-breakpoint-down(sm) {
  .card {
    width: 98%;
    margin: 1%;
  }
}
</style>
