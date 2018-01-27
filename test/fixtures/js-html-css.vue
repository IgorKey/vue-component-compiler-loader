<style>
    .red {
        color: #f00;
    }
</style>

<template>
    <h1 class="red">{{msg}}</h1>
</template>

<script>
    export default {
        name: "js-html-css.vue",
        data: function () {
            return {
                msg: "Hello world!"
            }
        }
    }
</script>

<style scoped>

</style>