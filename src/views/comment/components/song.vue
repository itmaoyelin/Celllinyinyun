<template>
<div class="song">
    <div class="image"><img :src="image" alt=""><div class="big"></div></div>
    <div class="name">{{name}}</div>
</div>
</template>

<script lang="ts" setup>
import { ref } from "vue" 
defineProps<{
    image:string,
    name:string
}>()
</script>

<style  scoped>
.name{
    margin-left: 2vmin;
}
.image{
    width: 15vmin;
    position: relative;
    aspect-ratio: 1/1;
}
.song{
    width: 96vw;
    display: flex;
    align-items: center;
    font-size: 4.5vmin;
    background-color: #fff;
    padding: 1vw 2vw;
}
img{
    width: 12vmin;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  
}
.big  {
    background-image: url(/src/assets/image/歌碟.png);
    width: 100%;
    top: 0px;
    height: 100%;
    background-repeat: no-repeat;
   position: absolute;
    background-size: 100%;
}
</style>