<template>
    <div style="padding:10px">
    <img v-bind:src="getUrl()" v-on:click="$emit('open-image')"/>
    </div>
</template>

<script>
    export default {
        props: ['img', 'size', 'square'],
        data: () => ({}),
        created() {
        },
        methods: {
            getUrl: function () {
                let target = new URL(`http://localhost:3000/image/${this.img}`);
                if (this.square) {
                    target.searchParams.append('square', 'true');
                }
                if (this.size) {
                    target.searchParams.append('size', `${this.size}`);
                }
                return target.toString();
            }
        }
    };
</script>

<style scoped>
    img {
        height: 100%
    }
</style>