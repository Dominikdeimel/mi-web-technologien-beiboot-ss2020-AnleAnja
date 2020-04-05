<template>
  <div class="image-list">
    <ImageComponent
      v-for="img in imgs"
      v-bind:key="img"
      size="300"
      v-bind:img="img"
      v-on:open-image="$emit('open-image', img)"
    ></ImageComponent>
  </div>
</template>

<script>
import axios from "axios";
import Image from "./Image.vue";

export default {
  data: () => ({
    imgs: null
  }),
  created() {
    this.allImgs();
  },
  methods: {
    allImgs: function() {
      let _this = this;
      axios.get("http://localhost:3000/imagelist").then(function(response) {
        _this.imgs = response.data;
      });
    }
  },
  components: {
    ImageComponent: Image
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 250px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
