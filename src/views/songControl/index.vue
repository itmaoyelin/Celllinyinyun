<template>
    <!-- 歌曲详情页面 -->
    <div style="width:100%;height:100%;">
        <img v-if="storeSong.image == ''" class="songimg" src="@/assets/image/播放懒加载.png" alt="">
        <img v-else class="songimg" :src="storeSong.image" alt="">
        <div class="container">
            <div class="flex nvbar">
                <van-icon name="arrow-down" @click="goRouter" size="7vw" color="#fff" />
                <div class="flex middle">
                    <scroll-text class="name" :name="storeSong.name"></scroll-text>
                    <div class=" arname flex">
                        <div class="title">{{ storeSong.ar.name }}</div>
                        <van-icon v-if="storeSong.songUrl!=''" color="rgb(136, 136, 136)" size="2.7vw" name="arrow" />
                    </div>
                </div>
                <van-icon v-range="{fn:share}" name="share-o" size="7vw" color="#fff" />
            </div>
            <lyric @click.stop="lyricShow=false" :id="storeSong.id" v-show="lyricShow"></lyric>

            <div class="big" @click.stop="lyricShow=true" v-show="!lyricShow">
                <img v-if="storeSong.image == ''" class="image" :class="{ suspended: true }"
                    src="@/assets/image/播放懒加载.png" alt="">
                <img v-else class="image" :class="{ suspended: !playState }" :src="storeSong.image" alt="">
                <div class="plate" :class="{ suspended: !playState }"></div>
                <img src="../../assets/image/唱臂.png" class="arm"
                    :class="{ armAnimationstop:!playState, armAnimation: playState,}" />
            </div>

            <div class="bottom">
                <!-- 评论收藏 -->
                <div class="operation" v-if="storeSong.type!=4&&!lyricShow" >
                    <!-- type为4那么证明播放的是电台，电台没有评论 ，和收藏-->
                    <div class="titles">
                        <van-icon size="5vmin" @click="goComment" name="comment-o" />
                        <div>评论</div>
                    </div>
                    <div class="titles" v-range="{fn:likeSong}">
                        <van-icon size="5vmin" name="like-o" />
                        <div>喜欢</div>
                    </div>

                </div>
                <!-- 进度条 -->
                <div class="flex progress">
                    <span>{{ formatting(songcurrentTime) }}</span>
                    <van-slider @click="songClick" v-model="currentRate" bar-height="2px" style=" width: 80%;"
                        inactive-color="#5F6368" active-color="#ffff" @drag-start="dragStart" @drag-end="dragEnd">
                        <template #button>
                            <div class="custom-button"></div>
                        </template>
                    </van-slider>
                    <span>{{ formatting(songDuratio) }}</span>
                </div>
                <!-- 控制按键 -->
                <div class="control flex">
                    <div class="orderbutton">
                        <img @click="orderButton" v-show="playIndex == 0" src="../../assets/image/循环.png" alt="">
                        <img @click="orderButton" v-show="playIndex == 1" src="../../assets/image/随机.png" alt="">
                        <img @click="orderButton" v-show="playIndex == 2" src="../../assets/image/重复当前.png" alt="">
                    </div>
                    <img class="controlbutton" @click="songSwitch('onA')" src="../../assets/image/上一首.png" alt="" />
                    <div>
                        <van-icon @click="playState = !playState" v-show="playState" name="pause-circle-o" size="14vw"
                            color="#fff" />
                        <van-icon @click="playState = !playState" v-show="!playState" name="play-circle-o" size="14vw"
                            color="#fff" />
                    </div>
                    <img @click="songSwitch('theNext')" class="controlbutton" src="../../assets/image/下一首.png" alt="" />
                    <img @click="showList = true" class="controlbutton" src="../../assets/image/ioce/24gf-playlist2.png"
                        alt="" />
                </div>
            </div>
        </div>


    </div>

</template>

<script name="songcontrol" lang="ts" setup >
import { ref, computed } from "vue"
import { useSong } from "@/stores/songPlay.ts";
import { showList, currentRate, playState, songcurrentTime, songDuratio, setCurrentTime, playIndex } from '@/hooks/parameterPassing.ts';  //歌曲控制
import { useRouter } from "vue-router";
import networkRequest from '@/network/index.ts'
import { datas, shareShow } from "@/hooks/share.ts";
import { Toast } from 'vant';
import 'vant/es/toast/style';
import ScrollText from "../../components/scrollText.vue";
import Lyric from "./lyric.vue";

const storeSong = useSong()

let lyricShow=ref<boolean>(false)
//时间格式化，去掉小数点。将纯数字转为时间
const formatting = computed(() => {
    return function (date: number) {
        let time: number = Math.floor(date)
        let m: number | string = Math.floor(time / 60);
        let s: number | string = Math.floor(time - m * 60);
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
    }
})


//1)控制按钮逻辑
//1.1)修改播放顺序      
const orderButton = () => {
    if (playIndex.value == 2) {
        playIndex.value = 0
        return
    }
    playIndex.value++
}
//1.2)播放下一首&上一首
let songSwitch = (methods: string) => {
    storeSong.strategy(methods, playIndex.value)
}

//1.3)拖动进度条改变歌词及歌曲的变化
//拖动进度条触发
const dragStart = () => {
    //暂停歌曲
    playState.value = false
}
//鼠标弹起是获取当前滑动的百分比，计算出具体时间并改变歌曲当前播放时间
const dragEnd = () => {
    console.log(1111);

    setCurrentTime.value = songDuratio.value * (currentRate.value / 100)
}
//鼠标点击进度条歌谱播放
const songClick = () => {
    setCurrentTime.value = songDuratio.value * (currentRate.value / 100)
}

//返回上一个路由
const router = useRouter()
const goRouter = () => {
    router.go(-1)
}
//去到评论页
const goComment = () => {
    router.push({
        path: '/comment',
        query: {
            id: storeSong.id,
            type: 0,
            sum: 0,
            detailsName: storeSong.name,
            image: storeSong.image,
            nickname: storeSong.ar.name
        }
    })
}
//喜欢歌曲
const likeSong = () => {
    networkRequest('request2', `/like?id=${storeSong.id}`).then((res: any) => {
        Toast.success('喜欢成功');
    })

}

//分享音乐
const share = () => {
    datas.name = storeSong.name
    datas.image = storeSong.image
    datas.nickeName = storeSong.ar.name
    shareShow.value = true
    //type==4证明分享的是电台节目
    if (storeSong.type == 4) {
        datas.type = 'djprogram',
            datas.typeTitle = '声音'
        datas.id = storeSong.djId
    } else {
        datas.type = 'song',
            datas.typeTitle = '单曲'
        datas.id = storeSong.id
    }


}
</script>

<style  scoped>
.bottom {
    position: fixed;
    bottom: 0px;
}

.progress {
    justify-content: space-between;
    width: 90vw;
    margin: 0px auto;
}

.progress span {
    width: 5%;
    display: inline-block;
    font-size: 3vw;


}

.control {
    justify-content: space-between;
    /* position: absolute;
    bottom: 0px; */
    width: 88vw;
    padding: 6vw 6vw;
    z-index: 9999;
}

.orderbutton img,
.controlbutton {
    width: 8vw;
    aspect-ratio: 1/1;
}

.custom-button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.nvbar {
    width: 90vw;
    padding: 0px 5vw;
    justify-content: space-between;
}

.middle {
    flex: 1;
    justify-content: center;

}

.name {
    width: 68vw;
    font-size: 5vw;
}

.arname {
    font-size: 4vw;
    color: rgb(124, 116, 116);
    width: 100%;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.songimg {
    position: absolute;
    z-index: 1;
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    filter: blur(271px);
}

.container {
    position: absolute;
    z-index: 20;
    top: 0px;
    width: 100vw;
    height: 100vh;
}

.big {

    width: 70vw;
    aspect-ratio: 1/1;
    margin: 0px auto;
    position: relative;
    margin-top: 20vw;

}

.big .image {
    width: 50vw;
    aspect-ratio: 1/1;
    position: absolute;
    left: 0px;
    top: 0px;
    animation: bigrotating 10s linear infinite forwards;
    z-index: -1;
    margin-left: -25vw;
    margin-top: -25vw;
    left: 50%;
    top: 50%;
    border-radius: 50%;
}


.titles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2vmin;

}

.titles div {
    width: 100%;
    text-align: center;
}

.big .plate {

    background-image: url(../../assets/image/歌碟.png);
    width: 100%;
    height: 100%;
    animation: bigrotating 10s linear infinite forwards;
    background-size: 100%;
}

.big .arm {
    width: 20vw;
    height: 40vw;
    position: absolute;
    background-size: 100%;
    z-index: 10;
    left: 50%;
    margin-top: -20vw;
    object-fit: contain;
    top: 0px;
    transform-origin: 15% 17%;


}

.operation {
    width: 10vmin;
    display: flex;
    font-size: 3vmin;
    flex-wrap: wrap;
    position: fixed;
    right: 2vmin;
    transform: translateY(-150%);
}

.suspended {
    animation-play-state: paused !important;
}

.armAnimationstop {
    animation: armAnimationsto 0.5s linear forwards !important;
}

.stop {
    animation-play-state: paused !important;
}

.armAnimation {
    animation: rotating 0.5s linear forwards;

}

@keyframes armAnimationsto {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-30deg);
    }
}

@keyframes bigrotating {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    0% {
        transform: rotate(-30deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>