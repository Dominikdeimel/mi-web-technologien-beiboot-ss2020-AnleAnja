<template>
  <v-container>
    <v-app-bar app color="light-green darken-3" dark>
      <Upload v-on:upload="loadImageNames()"/>
      <v-spacer></v-spacer>
      <DeleteAll v-on:deleteImgs="loadImageNames()"/>
    </v-app-bar>
    <div align="left">
      <ImageList v-bind:imageNames="imageNames" v-on:open-image="$emit('open-image', $event)" />
    </div>
  </v-container>
</template>

<script>
import Upload from "./Upload.vue";
import ImageList from "./ImageList.vue";
import DeleteAll from "./DeleteAll";
import axios from "axios";

export default {
  data: () => ({
    imageNames: null,
    files: null,
    deleteAllImgs: false
  }),
  created() {
    this.loadImageNames();
  },
  name: "App",
  components: {
    Upload,
    ImageList,
    DeleteAll
  },
  methods: {
    loadImageNames() {
      axios
        .get("http://localhost:3000/imageList")
        .then(res => this.imageNames = res.data);
    }
  }
};
</script>