<template>
    <v-container>
      <v-card>
      <v-row no-gutters>
        <template v-for="img in imageNames">
          <v-col :key="img">
            <ImageComponent
              v-for="img in imageNames"
              v-bind:key="img"
              size="540"
              v-bind:img="img"
              v-on:open-image="$emit('open-image', img)"
            ></ImageComponent>
          </v-col>
        </template>
      </v-row>
      </v-card>
    </v-container>
</template>

<script>
import Image from "./Image.vue";

export default {
  props: ["imageNames"],
  data: () => ({}),
  methods: {},
  components: {
    ImageComponent: Image
  }
};
</script>

<style scoped>
card {
  padding-top: 50px;
  padding-bottom: 20px;
}
</style>