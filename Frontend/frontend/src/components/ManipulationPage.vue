<template>
  <div id="app">
    <ImageComponent v-bind:img="img" v-bind:size="size"></ImageComponent>
    <Resize v-on:resize-image="onResizeButtonClicked"/>
    <button v-on:click="$emit('close-image')">Zurück</button>
  </div>
</template>

<script>
import Resize from './Resize.vue';
import Image from './Image.vue';

export default {
  props: ["img"],
  data: () => ({
    size: 800
  }),
  name: 'App',
  components: {
    Resize,
    ImageComponent: Image
  },
  methods: {
    onResizeButtonClicked: function(size){
      this.size = size;
    }
  }
}

</script>

<style>
</style>
