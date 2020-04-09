<template>
  <div>
    <label for="fileUpload">
      <v-icon>{{ mdiUpload }}</v-icon>
    </label>
    <input id="fileUpload" name="datei" type="file" size="5000" accept="image/*" ref="imgInput" v-on:change="send"/>
  </div>
</template>

<script>
import axios from "axios";
import { mdiUpload } from "@mdi/js";

export default {
  data: () => ({
    imgs: null,
    size: null,
    mdiUpload: mdiUpload
  }),
  created() {},
  methods: {
    send: function() {
      const $emit = this.$emit.bind(this);

      axios
        .post("http://localhost:3000/", this.$refs.imgInput.files[0])
        .then(function(response) {
          $emit("upload");
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>

input[type=file]{
  display:none;
}

</style>