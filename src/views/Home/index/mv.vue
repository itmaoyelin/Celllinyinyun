<template>
<!-- 首页视频组件 -->
    <Swiper v-if="mvData.length != 0" :loop="false" :spaceBetween="10" :slidesPerView="3.1">
        <SwiperSlide v-for="item in mvData">
            <Card :log="true" @click="playMv(item.id,$event)" :id="item.id" :title="item.name" :image="item.cover"
                :playCount="item.playCount"></Card>
        </SwiperSlide>

    </Swiper>
</template>

<script lang="ts" setup>
import {setxy,mvid} from "@/hooks/mvDetails.ts"
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import Card from '../../../components/card.vue';
//展示数据
defineProps<{
    mvData:any
}>()


const playMv=(id:string,e?:any)=>{
    setxy(e.clientX,e.clientY)
    mvid.value=id
}
</script>

<style  scoped>
.inco{
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 5px;
    padding:0.5vw 1vw;
    background-color: rgba(109, 109, 109, 0.363);
    color: #fff;
   font-size: 1vw;

}
.connt {
    position: relative;
}

.connt>.text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 2vw;
}

.connt>img {
    border-radius: 7px;
    width: 100%;
    aspect-ratio: 1/1;
    background-size: 140%;
    background-color: black;
    background-repeat: no-repeat;
    background-position:  0px 50%;
}
</style>