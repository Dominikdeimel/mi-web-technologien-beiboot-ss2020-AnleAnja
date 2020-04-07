<template>
  <div id="mainPage">
    <Upload v-on:upload="loadImageNames()" />
    <ImageList v-bind:imageNames="imageNames" v-on:open-image="$emit('open-image', $event)" />
    <DeleteAll v-on:deleteImgs="loadImageNames()"/>
  </div>
</template>

<script>
import Upload from './Upload.vue';
import ImageList from './ImageList.vue';
import DeleteAll from './DeleteAll';
import axios from "axios";

export default {
  data: () => ({
    imageNames: null
  }),
  created: function(){
    this.loadImageNames();
  },
  name: 'App',
  components: {
    Upload,
    ImageList,
    DeleteAll
  },
  methods: {
    loadImageNames: function() {
      axios
        .get("http://localhost:3000/imageList")
        .then((res) => this.imageNames = res.data)
    }
  }
}

</script>

<style>
</style>
