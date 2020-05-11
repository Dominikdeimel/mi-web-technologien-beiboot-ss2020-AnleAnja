<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-for="color of colors" :key="color" class="palette">
                    <div style="text-align: center"> {{color}}</div>
                    <div class="color-display" :style="'background-color: ' + color"></div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import { urlConfig } from '../AppContext';

export default {
    props: ['img'],
    data: () => ({
        colors: []
    }),
    created() {
        this.getColors();
    },
    methods: {
        getColors: function () {
            const path = urlConfig.getUrl(`colors/${this.img}`);
            axios
                .get(path)
                .then(function (response) {
                    this.colors = response.data;
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
    .palette {
        padding: 5px;
    }

    .color-display {
        padding: 20px;
        text-align: center;
    }
</style>