<template>
  <div class="hello">
    <input name="newWidth" type="text" ref="widthInput" />
    <button v-on:click="$emit('resize-image', $refs.widthInput.value)">Skalieren</button>
  </div>
</template>

<script>
</script>
<style scoped>
</style>
