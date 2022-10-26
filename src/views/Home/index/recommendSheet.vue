<template>
    <!-- 主页歌单 -->
    <Swiper v-if="recommendSheet.length != 0" :loop="false" :spaceBetween="10" :slidesPerView="3.1">
        <SwiperSlide v-for="item in recommendSheet">
        <!-- 卡片封装 -->
            <Card :log="false" :id="item.id" :title="item.name" :image="item.picUrl"
                :playCount="item?.playCount"></Card>
        </SwiperSlide>

    </Swiper>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import type { Sheet } from '../../../types/home/index'      //类型限制
import Card from '../../../components/card.vue'
let data = defineProps<{
    recommendSheet: Sheet[]
}>()



</script>

<style  scoped>
.inco {
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 5px;
    padding: 0.5vw 1vw;
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
}
</style>