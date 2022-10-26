<template>
 <div>
       <!-- 标题 -->
       <Bar @bar-click="barPlay">
        <template #left>
            推荐歌曲
        </template>
        <template #rigth style="border: 0 !important;">
            播放
            <van-icon name="play" />
        </template>
    </Bar>


    <van-loading v-show='recommendSong.length == 0' />
    <!-- 主页歌曲 -->
    <transition name="datas">
        <Swiper v-if="recommendSong.length != 0" loop :slidesPerGroup="1" :slidesPerView="1.1" :slidesOffsetAfter="20"
            :spaceBetween="20">
            <SwiperSlide v-for="(item, index) in recommendSong">
                <div class="resou" v-for="(tite, index2) in item" :key="index" v-if="item.length != 0">
                    <img v-lazy="tite.picUrl" alt="" />
                    <div class="tite">
                        <div class="zu">
                            <div class="flex name">

                                <div class="textNO max">{{ tite.song.name }}</div>
                                <div class="color span textNO">-{{ tite.song.artists[0].name }}</div>
                            </div>
                            <!-- <div class="color textNO" v-if="tite.uiElement.subTitle">{{ tite.uiElement.subTitle.title }}
                        </div> -->
                        </div>
                        <van-icon name="play" @click="play(tite.song.id,
                        index, index, tite.song.name,
                        tite.picUrl,
                        tite.song.artists[0])" />
                    </div>

                </div>
            </SwiperSlide>

        </Swiper>
    </transition>
 </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue";
import { useSong } from "@/stores/songPlay.ts"
import 'swiper/css';

const data = withDefaults(defineProps<{
    recommendSong: any,
}>(),{
    recommendSong:[]
})


const storeSong = useSong()
const play = (id: number | string, index: number, index2: number, name: string, image: string, ar: object) => {
    //当前播放的歌曲
    storeSong.setPlaySong(id, index2, name, image, ar)
}
//点击标题栏播放按钮进行播放
const barPlay = () => {
    play(data.recommendSong[0][0].song.id,
        0, 0,
        data.recommendSong[0][0].song.name,
        data.recommendSong[0][0].picUrl,
        data.recommendSong[0][0].song.artists[0])
}
</script>

<style  scoped>
.datas-enter-active,
.datas-leave-active {
    transition: all ease-in-out 1.5s;
}

.datas-enter-from {
    opacity: 0;
}

.datas-enter-to {
    opacity: 1;
}

.zu {
    flex: 1;
    max-width: 80vw;
    overflow: hidden;
}

.color {
    font-size: 2vw;
    color: rgb(146, 146, 146);
}

.name .span {
    flex: 1;

    padding-left: 2vw;
    box-sizing: border-box;
}

.flex {
    font-size: 4vw;
    align-items: center;
    display: flex;

}

.tite {
    display: flex;
    flex: 1;
    padding-bottom: 10px;
    height: 10vw;
    border-bottom: 0.8px solid rgba(202, 202, 202, 0.548);
    justify-content: space-between;
    align-items: center;
    padding-right: 5vw;
    max-width: 80%;
}

.resou {
    width: 100%;
    display: flex;
    overflow: hidden;
    margin-bottom: 10px;
    align-items: flex-start;

}

img {
    border: 1px solid rgba(197, 197, 197, 0.411);
    border-radius: 7px;
    aspect-ratio: 1 / 1;
    width: 10vw;
    margin-right: 10px;
}

.textNO {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.max {
    max-width: 100%;
}

.name {
    box-sizing: border-box;
    width: 60vw;
}
</style>