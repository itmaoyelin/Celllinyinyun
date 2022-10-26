<template>
<div class="container">
    <img :src="image" alt="">
    <div class="name">
        <div>{{name}}</div>
        <div class="nickname">by {{nickname}}</div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from "vue" 
defineProps<{
    image:string,
    name:string,
    nickname:string
}>()
</script>

<style  scoped>
.container{
    width: 96vw;
    padding: 2vw;
    background-color: #fff;
    display: flex;
}
img{
    width: 20vmin;
    aspect-ratio: 1/1;
}
.name{
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    font-size: 4vmin;
    margin-left: 2vmin;
    font-weight: 500;
}
.nickname{
   font-size: 2vmin;
   width: calc(100% - 2vmin); 
   color: rgb(128, 128, 128);
}
</style>