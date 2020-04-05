<template>
  <div id="mainPage">
    <Upload />
    <ImageList v-on:open-image="$emit('open-image', $event)" />
    <DeleteAll />
  </div>
</template>

<script>
import Upload from './Upload.vue';
import ImageList from './ImageList.vue';
import DeleteAll from './DeleteAll';

export default {
  data: () => ({
    img: null
  }),
  name: 'App',
  components: {
    Upload,
    ImageList,
    DeleteAll
  },
  methods: {
  }
}

</script>

<style>
</style>
