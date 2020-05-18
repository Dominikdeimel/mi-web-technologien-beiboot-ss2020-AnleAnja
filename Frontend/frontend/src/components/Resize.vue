<template>
    <div>
        <v-container style="width:300px">
            <v-row no-gutters>
                <v-col>
                    <v-text-field v-model="widthInput" placeholder="Skalieren" style="width:200px"
                                  outlined></v-text-field>
                </v-col>
                <v-col>
                    <v-btn text @click="scaleArbitrary()" style="margin-top:10px">
                        <v-icon>{{ mdiResize }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn text @click="$emit('resize-image', 'small')">
                        <v-icon>{{ mdiCellphone }}</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn text @click="$emit('resize-image', 'medium')">
                        <v-icon>{{ mdiTablet }}</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn text @click="$emit('resize-image', 'large')">
                        <v-icon>{{ mdiMonitor }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="cropSwitch">
                        <v-switch v-on:change="$emit('crop-image', $event)" :label="'Square'"></v-switch>
                    </div>
                </v-col>
            </v-row>
            <v-row style="width: 400px">
                <v-radio-group row v-model="radioGroup" @change="$emit('change-sharpen-blur', radioGroup.toLowerCase())">
                    <v-radio
                            v-for="title in radioGroupTitles"
                            :key="title"
                            :label="title"
                            :value="title.toLowerCase()"
                    ></v-radio>
                </v-radio-group>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {mdiResize} from '@mdi/js';
import {mdiCellphone} from '@mdi/js';
import {mdiTablet} from '@mdi/js';
import {mdiMonitor} from '@mdi/js';
import {mdiCrop} from '@mdi/js';

export default {
    data: () => ({
        mdiResize: mdiResize,
        mdiCellphone: mdiCellphone,
        mdiTablet: mdiTablet,
        mdiMonitor: mdiMonitor,
        mdiCrop: mdiCrop,
        widthInput: undefined,
        radioGroupTitles: ['None','Sharpen','Blur'],
        radioGroup: 'None'
    }),
    methods: {
        scaleArbitrary() {
            let inputText = this.widthInput;
            let val = parseInt(inputText);
            if (isNaN(val)) {
                alert('Please only put numbers');
            } else {
                this.$emit('resize-image', val);
            }
        }
    }
};
</script>

<style scoped>
    .cropSwitch {
        padding-left: 20px;
    }
</style>