<template>
    <v-container>
        <v-app-bar app color="light-green darken-3" dark>
            <v-btn text @click="$emit('close-image')">
                <v-icon>{{ mdiBack }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <DeleteImage v-bind:img="img" v-on:deleteImg="$emit('close-image')"/>
        </v-app-bar>
        <div>
            <v-card class="card" elevation="10">
                <ImageComponent v-bind:img="img" v-bind:size="size" v-bind:square="square" v-bind:sharpen="sharpen" v-bind:blur="blur"></ImageComponent>
                <Resize v-on:resize-image="onResizeButtonClicked" v-on:crop-image="onCropClicked" v-on:change-sharpen-blur="onSharpBlurClicked"/>
                <Palette v-bind:img="img"></Palette>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import Resize from './Resize.vue';
import Image from './Image.vue';
import DeleteImage from './DeleteImage.vue';
import {mdiArrowLeft} from '@mdi/js';
import Palette from './Palette';

export default {
    props: ['img'],
    data: () => ({
        size: 'default',
        square: false,
        mdiBack: mdiArrowLeft,
        sharpen: false,
        blur: false
    }),
    name: 'App',
    components: {
        Palette,
        Resize,
        ImageComponent: Image,
        DeleteImage
    },
    methods: {
        onResizeButtonClicked: function (size) {
            this.size = size;
        },
        onCropClicked: function (state) {
            this.square = state;
        },
        onSharpBlurClicked(event){
            if (event === 'sharpen') {
                this.sharpen = true;
                this.blur = false;
            } else if (event === 'blur') {
                this.sharpen = false;
                this.blur = true;
            } else {
                this.sharpen = false;
                this.blur = false;
            }
        }
    }
};
</script>

<style scoped>
    .card {
        padding: 50px 5px;
    }
</style>