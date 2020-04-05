<template>
  <div class="hello">
    <button v-on:click="deleteAll">Alle Bilder löschen</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
  }),
  created() {
  },
  methods: {
    deleteAll: function() {
      axios
      .delete("http://localhost:3000/imageList")
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img { max-width: 250px; }

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
