<template>
  <v-btn text @click="deleteAll">
    <v-icon>{{ mdiDelete }}</v-icon>
  </v-btn>
</template>

<script>
import axios from "axios";
import { mdiDelete } from "@mdi/js";

export default {
  data: () => ({
    mdiDelete: mdiDelete
  }),
  created() {},
  methods: {
    deleteAll: function() {
      const $emit = this.$emit.bind(this);
      axios
        .delete("http://localhost:3000/imageList")
        .then(function(response) {
          $emit("deleteImgs");
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>