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
