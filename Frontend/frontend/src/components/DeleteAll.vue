<template>
  <v-btn text @click="deleteAll">
    <v-icon>{{ mdiDelete }}</v-icon>
  </v-btn>
</template>

<script>
import axios from "axios";
import { mdiDelete } from "@mdi/js";
import { urlConfig } from "../AppContext";

export default {
  data: () => ({
    mdiDelete: mdiDelete
  }),
  created() {},
  methods: {
    deleteAll: function() {

      const $emit = this.$emit.bind(this);
      const path = urlConfig.getUrl('imageList');
      axios
        .delete(path)
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