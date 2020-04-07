<template>
  <div class="image">
    <img v-bind:src="getUrl()" v-on:click="$emit('open-image')"/>
  </div>
</template>

<script>
export default {
  props: ["img", "size", "square"],
  data: () => ({}),
  created() {},
  methods: {
    getUrl: function() {
      if(this.square){
        return `http://localhost:3000/image/${this.img}/${this.size}/square`;
      }
      else{
        return `http://localhost:3000/image/${this.img}/${this.size}`;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
