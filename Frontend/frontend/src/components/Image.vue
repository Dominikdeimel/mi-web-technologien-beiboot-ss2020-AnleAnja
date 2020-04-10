<template>
  <img v-bind:src="getUrl()" v-on:click="$emit('open-image')" />
</template>

<script>
export default {
  props: ["img", "size", "square"],
  data: () => ({}),
  created() {},
  methods: {
    getUrl: function() {
      if (this.square) {
        return `http://localhost:3000/image/${this.img}/${this.size}/square`;
      } else {
        return `http://localhost:3000/image/${this.img}/${this.size}`;
      }
    }
  }
};
</script>

<style scoped>
img{
  height: 100%
}
</style>