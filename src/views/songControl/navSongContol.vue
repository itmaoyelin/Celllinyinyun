<template>
    <!-- 固定在页面的歌曲控制栏 -->
    <div class="navaudio flex" >
        <div class="image" @click="goSongDetails">
            <img v-if="storeSong.image == ''" src="@/assets/image/播放懒加载.png" alt="">
            <img v-else v-lazy="storeSong.image" alt="">
        </div>
        <div class="songname">{{ storeSong.name }}<span> - {{ storeSong.ar.name }}</span></div>
        <div class="iconfile flex">
            <van-circle v-model:current-rate="currentRate" layer-color="#c2c2c2" :rate="rate" class="play flex"
                color="#000000">
                <van-icon v-if="playState" name="pause" @click="playState = !playState" />
                <van-icon v-else name="play" @click="playState = !playState" />

            </van-circle>
            <img @click="showList = true" class="icon" src="@/assets/image/ioce/播放列表.png" alt="">
        </div>

    </div>

    <audio ref="audio" :src="'https://music.163.com/song/media/outer/url?id='+storeSong.id+'.mp3'" @timeupdate="timeupdate" @pause="isPause" @ended="ended" @play="isPlay"
        autoplay controls></audio>
        <teleport  to=".teleport">
    <!-- 要播放的歌曲列表 -->
        <van-action-sheet duration="0.2" v-model:show="showList">
            <div class="length"><span>等待播放</span>({{ storeSong.songList.length }})</div>
          <transition-group name="list">
              <div v-for="(item, index) in storeSong.songList" :key="item.id" class="songList flex">
                <img v-show="index == storeSong.index" src="../../assets/image/播放中.png" alt="">
                <span class="vip" v-if="item.fee==1">vip</span>
                <div @click="listPlay(index)" :class="{ songname: true, color: index == storeSong.index }">{{ item.name
                }}<span :class="{ color: index == storeSong.index }"> - {{ item.ar[0].name }}</span></div>
                <van-icon name="cross" v-show="index != storeSong.index" @click="listDelete(index)" />
            </div>
          </transition-group>
        </van-action-sheet>
    </teleport>
</template>

<script lang="ts" setup>
import { ref, watch, computed,onMounted } from "vue"
import { useSong } from "@/stores/songPlay.ts";
import { useRouter } from "vue-router";
import { showList, playState, currentRate, songcurrentTime, songDuratio, setCurrentTime, playIndex ,lyricArr,indexShow} from '@/hooks/parameterPassing.ts';          //歌曲控制

//页面刷新暂停歌曲
onMounted(() => {
    audio.value.pause()
})


const storeSong = useSong()
//当歌曲播放完毕自动切换下一首歌
const ended = () => {
    storeSong.strategy('theNext', playIndex.value)
}

//播放列表逻辑
//播放当前点击的歌曲
const listPlay = (index: number) => {
    storeSong.indexPlaySong(index)
}
//从列表里删除要播放的歌曲
const listDelete = (index: number) => {
    storeSong.deleteSong(index)
}




const audio: any = ref(null)

//当歌曲播放时的功能

const getIndex=(item:number)=>{
    let index=lyricArr.value.length-1
    for(let i=0;i<lyricArr.value.length;i++){
        if(item<lyricArr.value[i].time){
            index=i-1
            break
        }
    }
    return index
}
//目标进度
let rate = ref<number | string>(100)
const timeupdate = () => {
    // 计算当前歌曲进度百分比,改变环形进度条
    if(!audio.value.duration)return
    
    songDuratio.value = audio.value.duration
    songcurrentTime.value = audio.value.currentTime
    currentRate.value = (audio.value.currentTime / audio.value.duration) * 100;
    indexShow.value=getIndex(audio.value.currentTime)

}

//页面跳转
const router = useRouter()
const goSongDetails = () => {
    router.push({
        path: '/songdetails'
    })
}


//控制播放和暂停
const isPlay = () => {
    playState.value = true
}
const isPause = () => {
    playState.value = false
}
let playValue = computed(() => {
    return playState.value
})
watch(playValue, (a) => {      //监听暂停播放变量有无改变，true播放，false暂停
if(storeSong.songUrl=='') return        //当没有歌曲播放时，拒绝暂停或播放
    if (a)
        audio.value.play()
    else
        audio.value.pause()
})


let Time = computed(() => {
    return setCurrentTime.value
})
//手动滑动进度条后，改变当前播放时间
watch(Time, (a, b) => {
    audio.value.currentTime = a
    audio.value.play()
})
</script>

<style  scoped>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
audio {
    display: none;
}

.flex {
    display: flex;
    align-items: center;
}

.songList,.length {
    padding: 5vmin ;

    justify-content: space-between;
}

.navaudio {
    width: calc(100vw - 10vmin);
    padding: 0px 5vmin;
    height: 40px;
    position: relative;
    justify-content: space-between;

    background-color: rgb(249, 252, 255);
}

.image img {
    height: 100%;
    aspect-ratio: 1/1;


}

.icon {
    height: 60%;
    aspect-ratio: 1/1;
}

.image {
    overflow: hidden;
    height: 60%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 7px solid #000;

    transform: translate(0px, -5px);
}

.songname span {
    font-size: 1.5vmin;
    color: rgb(160, 160, 160);
}

.iconfile {
    justify-content: center;
    height: 100%;
}

.songname {
    margin-left: 5px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(61, 61, 61);
    font-size: 3.5vmin;
}

.songListfather {
    width: 90%;
    position: absolute;
    padding: 5% 3% !important;
}

.length {
    font-size: 10px;
    color: rgb(160, 160, 160);
}

.length span:nth-child(1) {
    font-weight: 600;
    font-size: 16px;
    color: #000;
    margin-right: 3px;
}

.songList img {
    height: 15px;
    aspect-ratio: 1/1;
}

.play {
    height: 60%;
    justify-content: center;

}

:deep(.vanOverlay) {
    height: 100vh;
}

.color {
    color: red !important;
}
.vip{
    border: 0.2px solid red;
    padding: 0.1vmin 2vmin;
    border-radius: 1vmin;
    color: red;
    font-size: 3vmin;
    margin-left: 2vmin;
    line-height: 3vmin;
    display: block;
}
</style>