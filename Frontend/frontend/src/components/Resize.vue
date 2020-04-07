<template>
  <div class="hello">
    <input name="newWidth" type="text" ref="widthInput" />
    <button v-on:click="$emit('resize-image', $refs.widthInput.value)">Skalieren</button>
    <button v-on:click="$emit('resize-image', sizeSmartphone)">Smartphone</button>
    <button v-on:click="$emit('resize-image', sizeTablet)">Tablet</button>
    <button v-on:click="$emit('resize-image', sizeDesktop)">Desktop</button>
    <button v-on:click="$emit('crop-image')">Quadratisches Derivat</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    sizeSmartphone: 200,
    sizeTablet: 300,
    sizeDesktop: 400
  })
};
</script>
<style scoped>
</style>
