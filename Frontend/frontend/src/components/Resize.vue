<template>
  <div class="hello">
    <v-container style="width:300px">
      <v-row no-gutters>
        <v-col>
          <v-text-field ref="widthInput" placeholder="Skalieren" style="width:200px" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-btn text v-on:click="$emit('resize-image', $refs.widthInput.value)" style="margin-top:10px">
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
    <v-btn text v-on:click="$emit('crop-image')">
      <v-icon>{{ mdiCrop }}</v-icon>
    </v-btn>
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
    mdiCrop: mdiCrop
  })
};
</script>

<style scoped>
</style>