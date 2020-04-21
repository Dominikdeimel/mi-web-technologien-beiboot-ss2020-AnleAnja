<template>
  <v-container>
    <v-app-bar app color="light-green darken-3" dark>
      <Upload v-on:upload="loadImageNames()" />
      <v-spacer></v-spacer>
      <DeleteAll v-on:deleteImgs="loadImageNames()" />
    </v-app-bar>
    <div align="center">
      <ImageList v-if="imageNames !== null"
        v-bind:imageNames="imageNames"
        v-on:open-image="$emit('open-image', $event)" />
      <NoUploads v-if="noImgs"/>
    </div>
  </v-container>
</template>

<script>
import Upload from "./Upload.vue";
import ImageList from "./ImageList.vue";
import DeleteAll from "./DeleteAll";
import axios from "axios";
import NoUploads from "./NoUploads";
import { urlConfig } from "../AppContext";

export default {
  data: () => ({
    imageNames: null,
    files: null,
    deleteAllImgs: false,
    noImgs: null
  }),
  created() {
    this.loadImageNames();
  },
  name: "App",
  components: {
    Upload,
    ImageList,
    DeleteAll,
    NoUploads
  },
  methods: {
    loadImageNames() {

      const path = urlConfig.getUrl('imageList');
      axios
        .get(path)
        .then(res => (this.imageNames = res.data));
    },
  }
};
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 100%;
  }
}
</style>