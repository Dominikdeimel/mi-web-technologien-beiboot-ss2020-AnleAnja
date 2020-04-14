<template>
  <div class="listing-container">
    <NoUploads v-if="imageNames.length === 0"></NoUploads>
    <template v-if="imageNames.length > 0">
      <ImageComponent
      v-for="img in imageNames"
      v-bind:key="img"
      size="400"
      v-bind:img="img"
      @open-image="$emit('open-image', img)"
    ></ImageComponent>
    </template>
  </div>
</template>

<script>
import Image from "./Image.vue";
import NoUploads from "./NoUploads.vue";

export default {
  props: ["imageNames"],
  data: () => ({}),
  methods: {},
  components: {
    ImageComponent: Image,
    NoUploads
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
  height: 200px;
}
</style>