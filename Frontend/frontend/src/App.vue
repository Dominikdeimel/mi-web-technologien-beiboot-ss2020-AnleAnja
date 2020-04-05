<template>
  <div id="app">
    <MainPage v-if="click===null" v-on:open-image="onImageClicked" />
    <ManipulationPage v-if="click" v-on:close-image="click = null" v-bind:img="click"/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue';
import ManipulationPage from './components/ManipulationPage';

export default {
  data: () => ({
    click: null
  }),
  name: 'App',
  components: {
    MainPage,
    ManipulationPage
  },
  methods: {
    onImageClicked: function(img){
      this.click = img
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
