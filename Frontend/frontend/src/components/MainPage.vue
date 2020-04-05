<template>
  <div id="mainPage">
    <Upload />
    <ImageList v-on:open-image="$emit('open-image', $event)" />
  </div>
</template>

<script>
import Upload from './Upload.vue';
import ImageList from './ImageList.vue';

export default {
  data: () => ({
    img: null
  }),
  name: 'App',
  components: {
    Upload,
    ImageList
  },
  methods: {
  }
}

</script>

<style>
</style>
