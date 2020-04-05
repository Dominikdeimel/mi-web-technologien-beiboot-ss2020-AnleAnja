<template>
  <div class="hello">
    <ImageComponent v-bind:img="img" size="800"></ImageComponent>
    <button v-on:click="$emit('close-image')">Zurück</button>
  </div>
</template>

<script>
import Image from './Image.vue';

export default {
  props: ["img", "size"],
  data: () => ({}),
  created() {},
  methods: {},
  components: {
    ImageComponent: Image
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 250px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
