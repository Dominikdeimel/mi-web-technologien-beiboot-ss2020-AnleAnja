<template>
  <div class="hello">
    <input name="datei" type="file" size="5000" accept="image/*" ref="imgInput" />
    <button v-on:click="send">Senden</button>
    <img v-for="img in imgs" v-bind:src="'http://localhost:3000/image/' + img" :key="img">
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    imgs: null
  }),
  created() {

    this.allImgs();
    
  },
  methods: {
    send: function() {
      axios
      .post("http://localhost:3000/", this.$refs.imgInput.files[0])
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    allImgs: function() {
      let _this = this;
      axios
      .get("http://localhost:3000/imagelist")
      .then(function(response){
        _this.imgs = response.data;
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
