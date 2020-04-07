<template>
  <v-app>
    <v-content>
      <MainPage v-if="click===null" v-on:open-image="onImageClicked" />
      <ManipulationPage v-if="click" v-on:close-image="click = null" v-bind:img="click" />
    </v-content>
  </v-app>

</template>

<script>
import MainPage from "./components/MainPage.vue";
import ManipulationPage from "./components/ManipulationPage";

export default {
  data: () => ({
    click: null
  }),
  name: "App",

  components: {
    MainPage,
    ManipulationPage
  },
  methods: {
    onImageClicked: function(img) {
      this.click = img;
    }
  }
};
</script>
