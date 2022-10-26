<template>

  <div ref="singerDetails" class="singerDetails">
    <div class="navbar " :class="{ showback: !nameShow }">
      <div></div>
      <van-icon @click="goOn" name="arrow-left" :color="!nameShow ? '#000' : '#fff'" size="7vmin" />
      <div v-show="!nameShow" style="font-size: 5vmin;">{{ data?.data.artist.name }}</div>
    </div>
    <img :src="data?.data.artist.cover" alt="" class="backImage">
    <div class="mos" ref="portrait"></div>
    <div class="container1">

      <div class="details width flex">

        <transition name="operation">
          <img v-show="imgShow" v-lazy="data?.data.artist.cover + '?param=50y50'" alt="" class="detailsImage">
        </transition>
        <transition name="operation">
          <div class="name" v-show="nameShow">{{ data?.data.artist.name }}</div>
        </transition>
        <div class="detailsContainer" v-if="data">

          <div class="fans" v-if="fansDate">{{ NumberFormats(fansDate.data.fansCnt) + ' 粉丝' }}</div>
          <div class="fans"  v-if="data">{{ data.data?.identify?.imageDesc }}</div>
          <div></div>
        </div>
      </div>
      <van-tabs background="#EBEBEB" v-model:active="active" @click-tab="clickTab"
        style="z-index: 100  ; position: sticky; top: 49px;" :sticky="true">
        <van-tab title="热门作品"></van-tab>
        <van-tab title="艺人介绍"></van-tab>
        <van-tab title="所有专辑"></van-tab>
        <van-tab title="相关MV"></van-tab>
      </van-tabs>
      <div class="loading" v-show="loadingShow">
        <loading></loading>
      </div>
      <keep-alive>
        <component  :is="assembly[active]" v-model="song.hotSongs" :introduce="introduce" :hotAlbums="proprietary?.hotAlbums"
          :mvs="mv?.mvs" :class="{ width: active == 0 }"></component>
      </keep-alive>


    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onActivated, onUpdated, shallowRef, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router";
import networkRequest from '@/network/index.ts'
import NumberFormats from "@/hooks/NumberFormats.ts"
import { loadingShow, controlLoad } from "../../../hooks/controlLoading"
import monitoring from "@/hooks/coverMonitoring.ts"

import Introduce from "./components/introduce.vue"
import SongTable from "../../../components/songTable.vue"
import Mv from "./components/mv.vue"
import TheAlbum from "./components/theAlbum.vue"


const assembly = ([
  SongTable,
  Introduce,
  TheAlbum,
  Mv
])

const route = useRoute()
let id = ref<string | number>(-1)
onActivated(() => {
  //判断是否重复进入
  if ((route.query.id as string) == id.value) {
    return
  }
  active.value = 0
  id.value = route.query.id as string
  //将上一个歌手的数据清空
  introduce.value = null
  mv.value = null
  proprietary.value = null
  // 重新获取数据
  strategy(true)
})
//监听头像和名字是否进入到导航栏里
let portrait = ref(null)
let imgShow = ref(true)
let nameShow = ref(true)
onActivated(() => {
 
  monitoring(portrait.value, function (e: any) {
    
    nextTick(()=>{
      console.log(e[0].isIntersecting);
      nameShow.value = e[0].isIntersecting
    imgShow.value = e[0].isIntersecting
})
   
  }, 0.4)
  // monitoring(portrait.value, function (e: any) {
    
  // }, 0.2)

})



//点击tab切换栏时触发
let active = ref(0)
const singerDetails = ref()
const clickTab = () => {
  //点击tab自动滚动到顶部
  singerDetails.value.scrollTop = 0
  //发送网络请求
  strategy(false, active.value)
}


//网络请求策略
const strategy = (define: boolean, index: number | string = -1) => {
  if (index === 0) return    //开始就获取过热门歌曲的值，后续点击tab就不再获取
  let obj: any = {
    '1'() {
      introduce.value ? '' : request('/artist/desc?id=', introduce)
    },
    '2'() {
      proprietary.value ? '' : request('/artist/album?id=', proprietary)
    },
    '3'() {
      mv.value ? '' : request('/artist/mv?id=', mv)
    },
    'define'() {     //打开页面时调用，获取页面初始数据
      request('/artist/detail?id=', data)
      request('/artists?id=', song)
      request('/artist/follow/count?id=', fansDate)
    }
  }
  //判断是否通过点击tab进入的。define为假则是通过tab进入的
  define ? obj['define']() : obj[index]()

}
const request = (url: string, item: any) => {
  //打开loading
  controlLoad(true)
  networkRequest('request', url + id.value, function (res: any) {
    item.value = res.data
    controlLoad(false)
  })
}
//详情信息
let data = ref()
//获取粉丝数量
let fansDate = ref()
//歌手介绍
let introduce = ref()
//歌手热门歌曲
let song = ref({hotSongs:[]})
//歌手mv
let mv = ref()
//专辑
let proprietary = ref()



const router = useRouter()
const goOn = () => {
  router.go(-1)
}
</script>

<style  scoped>
.showback {
  animation: showback 0s ease-in 1 forwards;
}

@keyframes showback {
  0% {}

  100% {
    background-color: #fff;
    color: black;
  }
}

.operation-enter-active {
  animation: mov 0.2s ease-in;
}

.operation-leave-active {
  animation: mov 0.2s linear reverse;
}

@keyframes mov {
  0% {
    opacity: 0;

  }

  /* 50%{
         transform: scale(1.5);
    } */
  100% {
    overflow: hidden;
  }
}

.mos {
  position: absolute;
  width: 100vw;
  top: 0px;
  height: 66vmin;
}

.singerDetails {
  scroll-behavior: smooth;
  height: calc(100vh - 40px);
  overflow: scroll;
  position: relative;
}

.loading {
  width: 100vmin;
  height: 30vh;
  position: relative;

}

.width {
  width: 91vw;
  padding: 1vw 2vw;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
}

.name {
  font-weight: 600;
  height: 8vmin;
  font-size: 6vmin;
  position: absolute;
  top: 10vmin;
  margin-bottom: 5px;
}

.fans {
  color: rgb(138, 138, 138);
  font-size: 4vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detailsContainer {
  transform: translate(0px, -20px);
}

.navbar {
  width: 98vw;
  height: 50px;
  padding-left: 2vmin;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 10;
}

.container1 {
  margin-top: 66vw;
  width: 100vw;
  position: relative;
  background-color: rgb(231, 231, 231);
  min-height: 67vh;

}

.backImage {
  width: 100vw;
  position: absolute;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.details {
  transform: translate(0px, -13px);
  margin-top: 100px;
  padding-top: 23vmin;
  justify-content: center;
}

.details div {
  width: 90vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.detailsImage {
  width: 15vmin;
  position: absolute;
  top: 0px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  transform: translate(0px, -50%);
  display: block;

  margin: 0px auto;
}
</style>