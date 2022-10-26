<template>
    <div class="song" v-for="item in nestedProps.songList">
        <van-icon name="play-circle-o" @click="play(item.id,-1,item.name,item.al.picUrl,{name:item.ar[0].name},item.fee)" />
        <div v-if="item.fee==1" class="vip">vip</div>
        <div class="name" v-html="replaceHandle(item.name,nestedProps.value,'#23AAF2')"></div> <span> - </span>
        <div class="nickeName" v-html="replaceHandle(item.ar[0].name,nestedProps.value,'#23AAF2')"></div>
    </div>
</template>

<script lang="ts" setup>

import {replaceHandle} from "@/hooks/replaceHandle.ts"
import { useSong } from "@/stores/songPlay.ts"
defineProps<{
    nestedProps: any,
}>()
const storeSong = useSong()
const play = (id: number | string, index: number, name: string, image: string, ar: object, fee: number,djid?:number) => {

    storeSong.setPlaySong(id, index, name, image, ar, fee,  2,djid)

}
</script>

<style  scoped>
.song span {
    margin: 0px 1vmin;
}

.vip {
    border: 0.2px solid red;
    padding: 0.1vmin 1vmin;
    border-radius: 1vmin;
    color: red;
   margin: 0px 1vmin;
    line-height: 3vmin;
    font-size: 2vmin;
    display: block;
    margin-left: 2vmin;
}
.song .nickeName {
    font-size: 3vmin;
    color: rgb(153, 156, 156);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
}

.song .name {
    margin: 0px 2vmin;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 69%;
}

.song {

    display: flex;
    align-items: center;
    font-size: 4.5vmin;
    padding: 1.1vw 0px;
    margin: 1vw 3vw;
    border-bottom: 0.1px solid rgba(216, 212, 212, 0.623);
}
</style>