<template>
    <!-- mv页面 -->
    <transition name="container">
        <div class="container " v-if="mvData" v-show="isShow">
            <div class="navbar">
                <van-icon name="arrow-left" @click="leave" color="#fff" size="6vmin" />
            </div>
            <!-- 视频播放盒子 -->
            <div class="containerVido">
                <div class="video" @click="control">
                    <van-icon name="play" v-show="!play" class="play" size="20vmin" color="#CFCFCF" />
                    <video ref="video" autoplay @ended="ended" :src="mvUrl" class="mv" @timeupdate="timeupdate">
                    </video>
                </div>
                <!-- 评论 -->
                <transition name="comment">
                    <div class="comment" v-if="comment">
                        <Comment :id="id" :type="1"></Comment>
                    </div>
                </transition>
            </div>
            <div class="details" v-show="!comment">
                <div class="artists">
                    <img v-lazy="mvData.artists[0].img1v1Url" alt="">
                    <span>{{ mvData.artists[0].name }}</span>
                </div>
                <div class="name">{{ mvData.name }}</div>
                <!-- 进度条 -->
                <van-slider v-model="currentRate" bar-height="2px" style=" width: 100%;" inactive-color="#5F6368"
                    active-color="#ffff" @drag-start="dragStart" @drag-end="dragEnd">
                    <template #button>
                        <div class="custom-button"></div>
                    </template>
                </van-slider>
            </div>

            <div class="operate " v-show="!comment">
                <div>
                    <van-icon name="chat-o" color="#fff" size="8vmin" @click="setComment(true)" />
                    <div class="sum">
                        {{ mvData.commentCount }}
                    </div>
                </div>
                <div v-range="{fn:share}">
                    <van-icon name="share-o" color="#fff" size="8vmin" />
                    <div class="sum" >
                        {{ mvData.shareCount }}
                    </div>
                </div>
                <div>
                    <van-icon name="passed" v-if='liked' v-range='{ fn: setLinke, id: mvid }' size="8vmin" />
                    <van-icon name="star-o" v-else color="#fff" v-range="{ fn: setLinke, id: mvid }" size="8vmin" />
                    收藏
                </div>
            </div>
        </div>
    
    </transition>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue"
import { XPX, YPX, isShow, setIsShow, mvid } from "@/hooks/mvDetails.ts"
import networkRequest from '@/network/index.ts'
import { useImportant } from "@/stores/index.ts";
import { playState } from '@/hooks/parameterPassing.ts';  //歌曲控制
import { mvSign } from "@/hooks/dataSign.ts"
import {datas,shareShow} from "@/hooks/share.ts";

import Comment from "../../components/comment.vue";
import { Toast } from 'vant';
import 'vant/es/toast/style';

let store = useImportant()


//离开
const leave = () => {
    setIsShow(false)
    comment.value = false
    setPause()
}
//获取mv数据
let mvUrl = ref<string>('')
let mvData = ref()
let liked = ref<boolean>(false)     //是否收藏过该mv
let id = computed(() => {
    return mvid.value
})
//当mvid改变就获取数据
watchEffect(() => {
    //获取播放地址
    if (!mvid.value) return
    networkRequest('request', '/mv/url?id=' + mvid.value + '&r=' + r.value, function (res: any) {
        mvUrl.value = res.data.data.url
    })

    play.value = true
    //获取mv详情
    networkRequest('request', '/mv/detail?mvid=' + mvid.value+'&date='+Date.now(), function (res: any) {
        console.log(res);
        
        mvData.value = res.data.data
        liked.value=res.data.subed
    })
  
})

//根据网络速度获取对应分辨率
const r = computed(() => {
    return store.downlink >= 5 ? 1080 : store.downlink >= 1.2 ? 720 : 480
})



//收藏mv
const setLinke = (id: number | string) => {
    networkRequest('request', '/mv/sub?mvid=' + mvid.value + '&t=' + Number(!liked.value), function (res: any) {
        if (!liked.value) {
            Toast({
                message: '收藏成功',
                icon: 'star-o',
            });
            mvSign.value=true
        }else{
            Toast({
                message: '取消收藏',
                icon: 'close',
            });
            mvSign.value=true
        }

        liked.value = !liked.value
    })
}



let currentRate = ref(2)
let video: any = ref(null)
let mvDuratio = ref<number>(0)
let mvcurrentTime = ref<number>(0)
//播放mv
const setPlay = () => {
    video.value.play()
    play.value = true
}
//暂停mv
const setPause = () => {
    video.value.pause()
    play.value = false
}


//拖动进度条触发
const dragStart = () => {
    //暂停视频
    setPause()
}
//鼠标弹起是获取当前滑动的百分比，计算出具体时间并改变歌曲当前播放时间
const dragEnd = () => {
    video.value.currentTime = mvDuratio.value! * (currentRate.value / 100)
    //播放mv
    setPlay()
}

//当mv正在播放时
const timeupdate = () => {
    playState.value = false
    // 计算当前歌曲进度百分比,改变环形进度条
    mvDuratio.value = video.value.duration
    mvcurrentTime.value = video.value.currentTime
    currentRate.value = (video.value.currentTime / video.value.duration) * 100;
}

//当mv播放完毕是
const ended = () => {
    setPause()
}



//是否显示评论模块
let comment = ref(false)
const setComment = (boole: boolean) => {
    comment.value = boole

}



//视频是否播放
let play = ref(true)
//点击视频触发
const control = () => {
    //隐藏评论模块
    if (comment.value) {
        setComment(false)
        return
    }
    if (play.value) {
        setPause()
    } else {
        setPlay()
    }
}

//分享
const share=()=>{
    datas.name=mvData.value.artists[0].name
    datas.image=mvData.value.cover
    datas.type='mv',
    datas.typeTitle='mv'
    datas.nickeName=mvData.value.name
    shareShow.value=true
    datas.id=mvid
}
</script>

<style  scoped>
.sum {
    width: 100%;
    text-align: center;
}

.play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
}

.video {
    flex: 1;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    scroll-behavior: smooth;
}

.operate div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.operate {
    width: 10vmin;
    aspect-ratio: 1/4;
    position: fixed;
    display: flex;
    right: 0px;
    color: #fff;
    font-size: 2vmin;
    bottom: 20px;
    z-index: 1;
    flex-wrap: wrap;
    align-content: space-around;
}



.name {
    margin-left: 5vmin;
    margin-top: 5px;
    width: 80vmin;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.artists span {
    margin-left: 2vmin;
    width: 60vmin;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.artists {
    display: flex;
    align-items: center;
}



.details img {
    width: 10vmin;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid #fff;
}

.comment {
    height: 50vh;
    background-color: #fff;
    width: 100%;
    position: relative;
    border-radius: 2vmin 2vmin 0px 0px;
    transform-origin: 50% 100%;
    display: block;
    z-index: 2;

}

.details {
    margin-top: 50px;
    width: 100vmin;
    color: #fff;
    position: absolute;
    bottom: 20px;
    z-index: 1;
}

video {
    max-width: 100vmin;
    position: absolute;
    height: 100%;
}

.containerVido {
    height: 100vh;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    width: 100vw;
}

.navbar {
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    position: absolute;
    z-index: 10;
}

.container-enter-active {
    animation: mv 1s ease-in-out;

}

.container-leave-active {
    animation: mv 0.5s ease-in reverse;
}

.comment-enter-active {
    animation: move 0.5s ease-in;

}

.comment-leave-active {
    animation: move 0.5s ease-in reverse;
}

@keyframes move {
    0% {
        transform: translate(0px, 50vh);
    }

    100% {
        transform: translate(0px, 0vh);
    }
}

.container {
    /* background-color: red; */
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 999;
    top: 0px;
    transform-origin: v-bind(XPX) v-bind(YPX);
    background-color: #000;
}

/* div:hover{

} */
@keyframes mv {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    20% {
        opacity: 0;
        transform: scale(0.3);
    }

    100% {
        transform: scale(1);
    }
}

.custom-button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
}
</style>