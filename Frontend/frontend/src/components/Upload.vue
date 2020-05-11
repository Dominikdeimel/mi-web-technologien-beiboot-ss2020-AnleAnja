<template>
  <div>
    <label for="fileUpload">
      <v-icon>{{ mdiUpload }}</v-icon>
    </label>
    <input id="fileUpload" name="datei" type="file" size="5000" accept="image/*" ref="imgInput" v-on:change="send"/>
  </div>
</template>

<script>
import axios from 'axios';
import { mdiUpload } from '@mdi/js';
import { urlConfig } from '../AppContext';

export default {
    data: () => ({
        imgs: null,
        size: null,
        mdiUpload: mdiUpload
    }),
    created() {},
    methods: {
    /**
     * @name send#$refs
     * @type {object}
     * @property {HTMLInputElement} imgInput
     */
        send: function() {
            const $emit = this.$emit.bind(this);
            const path = urlConfig.getUrl();
            let file = this.$refs.imgInput.files[0];
            this.$refs.imgInput.value = null;
            axios
                .post(path, file)
                .then(function(response) {
                    $emit('upload');
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