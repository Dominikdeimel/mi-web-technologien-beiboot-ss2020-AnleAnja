<template>
  <div class="hello">
    <button v-on:click="deleteImage">Bild löschen</button>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  props: ["img"],
  data: () => ({
  }),
  methods: {
    deleteImage: function() {
        let img;
      axios
      .delete("http://localhost:3000/imageList/" + img)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};
</script>
<style scoped>
</style>