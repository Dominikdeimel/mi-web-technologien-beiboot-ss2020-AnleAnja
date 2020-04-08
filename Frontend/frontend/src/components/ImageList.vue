<template>
  <div class="listing-container">
    <ImageComponent style="padding:10px"
      v-for="img in imageNames"
      v-bind:key="img"
      size="400"
      v-bind:img="img"
      v-on:open-image="$emit('open-image', img)"
    ></ImageComponent>
  </div>
</template>

<script>
import Image from "./Image.vue";

export default {
  props: ["imageNames"],
  data: () => ({}),
  methods: {},
  components: {
    ImageComponent: Image
  }
};
</script>

<style scoped>
.listing-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0;
  left: 0;
}
</style>