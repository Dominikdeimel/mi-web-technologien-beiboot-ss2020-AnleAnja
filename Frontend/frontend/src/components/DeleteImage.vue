<template>
  <v-btn text v-on:click="deleteImage">
    <v-icon>{{ mdiDelete }}</v-icon>
  </v-btn>
</template>

<script>
import axios from "axios";
import { mdiDelete } from "@mdi/js";

export default {
  props: ["img"],
  data: () => ({
    mdiDelete: mdiDelete
  }),
  methods: {
    deleteImage: function() {
      axios
        .delete("http://localhost:3000/imageList/" + this.img)
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