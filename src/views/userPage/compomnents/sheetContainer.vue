<template>
<!-- 用户歌单组件封装 -->
    <div class="sheetContainer">
        <img v-lazy="image" alt="">
        <div class="titles">
            <div>
                {{ name }}
            </div>
            <div>
            <slot name="spans"><span></span></slot>{{ nikeName }}
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref,computed } from "vue"
interface Obj {
    image: string,
    name: string,
    nikeName: string,
    imageSize:number,         //用于控制图片大小
    sizeVmin?:number,               //字体大小
    nikeNameSize?:number            //作者字体大小
}
 let data=defineProps<Obj>()
 let imageSize=computed(()=>{
    return data.imageSize+'vmin'
 })
 let sizeVmin=computed(()=>{
    return data.sizeVmin+'vmin'
 })
  let nikeNameSize=computed(()=>{
    return data.nikeNameSize+'vmin'
 })
</script>

<style  scoped>
.sheetContainer{
    display: flex;
    width: 100%;
    align-items: center;
    margin: 2vmin 0px;
}
img{
    border-radius: 10px;
    width: v-bind(imageSize);
    aspect-ratio: 1/1;
}
.titles{
    width: calc(91vw - v-bind(imageSize) - 2vmin);
    margin-left: 2vmin;
}
.titles div:nth-child(1){
    width: 100%;
    margin-bottom: 1vmin;
        white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:v-bind(sizeVmin) ;
}
.titles div:nth-child(2){
    width: 100%;
        white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:v-bind(nikeNameSize) ;
    color: rgb(168, 168, 168);
}
</style>