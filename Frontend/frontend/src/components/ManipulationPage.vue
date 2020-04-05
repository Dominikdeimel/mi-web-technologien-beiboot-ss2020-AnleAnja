<template>
  <div id="app">
    <ImageComponent v-bind:img="img" v-bind:size="size"></ImageComponent>
    <Resize v-on:resize-image="onResizeButtonClicked" v-on:crop-image="onCropButtonClicked"/>
    <button v-on:click="$emit('close-image')">Zurück</button>
    <DeleteImage v-bind:img="img"/>
  </div>
</template>

<script>
import Resize from './Resize.vue';
import Image from './Image.vue';
import DeleteImage from './DeleteImage.vue';

export default {
  props: ["img"],
  data: () => ({
    size: 800
  }),
  name: 'App',
  components: {
    Resize,
    ImageComponent: Image,
    DeleteImage
  },
  methods: {
    onResizeButtonClicked: function(size){
      this.size = size;
    },
    onCropButtonClicked: function(size){
      this.size = size;
    }
  }
}

</script>

<style>
</style>
