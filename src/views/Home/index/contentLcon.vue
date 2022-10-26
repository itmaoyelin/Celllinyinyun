<template>
    <!-- 主页轮播图下小图标 -->
    <Swiper :spaceBetween="20" style="max-height: 70px;" :slidesPerGroup="1" :slidesPerView="4">
        <SwiperSlide>
            <div class="nm" @click="play"><img src="@/assets/image/ioce/日历1.png" alt="" />
            </div>
            <span> 每日推荐</span>
        </SwiperSlide>
        <SwiperSlide @click="goRanking">
            <div class="nm"><img src="@/assets/image/ioce/排行榜.png" alt="" />
            </div>
            <span> 排行榜</span>
        </SwiperSlide>
        <SwiperSlide @click="goSheet">
            <div class="nm"><img src="@/assets/image/ioce/歌单.png" alt="" />
            </div>
            <span> 歌单</span>
        </SwiperSlide>
        <SwiperSlide @click="gorRdioStation">
            <div class="nm"><img src="@/assets/image/ioce/电台.png" alt="" />
            </div>
            <span> 电台</span>
        </SwiperSlide>
        <SwiperSlide @click="goSinger">
            <div class="nm"><img src="@/assets/image/ioce/用户.png" alt="" />
            </div>
            <span> 歌手</span>
        </SwiperSlide>

    </Swiper>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import { useSong } from "@/stores/songPlay.ts"
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import networkRequest from '@/network/index.ts'

const router = useRouter()
let goRanking = () => {
    router.push({
        path: '/rankinglist'
    })
}
let goSheet = () => {
    router.push({
        path: '/sheet'
    })
}
const gorRdioStation = () => {
    router.push({
        path: "/radiostation"
    })
}
const goSinger = () => {
    router.push({
        path: "/singer"
    })
}

//每日推荐歌曲播放
let storeSong = useSong()
const play = () => {
    networkRequest('request', '/recommend/songs', function (res: any) {
        let dataList = res.data.data.dailySongs
        storeSong.Initialize(dataList)
        storeSong.setPlaySong(dataList[0].id, 0, dataList[0].name, dataList[0].al.picUrl, dataList[0].ar)
    })
}

</script>

<style  scoped>
.swiper {
    width: 100vw;

    margin: 10px 0px;
}

.swiper-slide {

    justify-content: center;
    align-items: flex-start;
    display: flex;
    color: #666;
    flex-wrap: wrap;
    font-size: 2vw;
    height: 100%;
}

.swiper-slide>.nm {
    width: 60%;
    max-width: 70px;
    border-radius: 50%;
    background-color: rgba(231, 196, 196, 0.589);
    justify-content: center;
    align-items: center;
    display: flex;
    margin-bottom: -10px;
    aspect-ratio: 1/1;
}

span {
    width: 100%;
    margin-top: 10px;
    text-align: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

img {
    width: 50%;
}
</style>