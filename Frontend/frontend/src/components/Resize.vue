<template>
  <div>
    <v-container style="width:300px">
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="widthInput" placeholder="Skalieren" style="width:200px" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-btn text v-on:click="scaleArbitrary()" style="margin-top:10px">
            <v-icon>{{ mdiResize }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-btn text v-on:click="$emit('resize-image', sizeSmartphone)">
      <v-icon>{{ mdiCellphone }}</v-icon>
    </v-btn>
    <v-btn text v-on:click="$emit('resize-image', sizeTablet)">
      <v-icon>{{ mdiTablet }}</v-icon>
    </v-btn>
    <v-btn text v-on:click="$emit('resize-image', sizeDesktop)">
      <v-icon>{{ mdiMonitor }}</v-icon>
    </v-btn>
    <v-switch v-on:change="$emit('crop-image', $event)" :label="'Quadrat'"></v-switch>
  </div>
</template>

<script>
import { mdiResize } from "@mdi/js";
import { mdiCellphone } from "@mdi/js";
import { mdiTablet } from "@mdi/js";
import { mdiMonitor } from "@mdi/js";
import { mdiCrop } from "@mdi/js";

export default {
  data: () => ({
    sizeSmartphone: 600,
    sizeTablet: 700,
    sizeDesktop: 800,
    mdiResize: mdiResize,
    mdiCellphone: mdiCellphone,
    mdiTablet: mdiTablet,
    mdiMonitor: mdiMonitor,
    mdiCrop: mdiCrop,
    widthInput: undefined
  }),
  methods: {
    scaleArbitrary() {
      let inputText = this.widthInput;
        let val = parseInt(inputText);
        if(isNaN(val))
        {
          alert("plz only input numbr thx");
        }
        else
        {
        this.$emit("resize-image", val);
        }
      }
    }
};
</script>

<style scoped>
</style>;