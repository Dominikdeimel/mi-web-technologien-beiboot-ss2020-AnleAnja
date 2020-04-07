<template>
  <div id="app">
    <ImageComponent v-bind:img="img" v-bind:size="size" v-bind:square="square"></ImageComponent>
    <Resize v-on:resize-image="onResizeButtonClicked" v-on:crop-image="onCropClicked"/>
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
    size: 800,
    square: false
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
    onCropClicked: function(){
      this.square = !this.square;
    }
  }
}

</script>

<style>
</style>
