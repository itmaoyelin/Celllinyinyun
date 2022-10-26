<template>
  <div class="app">
    <router-view #default="{ route, Component }">
      <keep-alive :max="7" exclude="comment">
        <component :class="{ [animate]: true }" :is="Component"></component>
      </keep-alive>
    </router-view>


    <div :class="{ bottomTabbar: true, [bottomTabbarShow]: true }">
      <nav-song-contol></nav-song-contol>
      <!-- 底部标签栏 -->
      <van-tabbar v-model="activ">
        <van-tabbar-item icon="wap-home-o" @click="goHome()">发现</van-tabbar-item>
        <!-- <div class="contai">
          <div class="loading">

          </div>
          <span> -->
        <van-tabbar-item icon="user-o" @click="goMypage()">我的</van-tabbar-item>
        <!-- </span>
        </div> -->
        <van-tabbar-item icon="friends-o" @click="router.push('/concerned')">关注</van-tabbar-item>
      </van-tabbar>
    </div>
    <mvindex></mvindex>
    <share></share>
  </div>

</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useImportant } from "./stores/index"

import { animate, pageTransferDevice, bottomTabbarShow, navTransferDevice,activIndex } from './hooks/pageAnimate';
import NavSongContol from "./views/songControl/navSongContol.vue"
import mvindex from "./views/MV/index.vue"
import Share from "./views/share/index.vue"
import { useColorMode } from '@vueuse/core'


let store = useImportant()
store.initialization()
let activ = ref(0)
let route = useRoute()
//监听路由跳转
let routeIndex = computed(() => (route.meta.index as number))
let routePath= computed(() => route.path)
watch(routeIndex, (a: number, b: number) => {
  //a要前往的页面index，b当前页面index
  pageTransferDevice(a, b);
  navTransferDevice(a, b)
  
})
watch(routePath,(a:string)=>{
  activ.value=activIndex[a]?.apply()
})
//路由跳转
let router = useRouter()
const goMypage = () => {
  router.push({
    path: "/userpage"
  })
}
const goHome = () => {
  router.push({
    path: "/home"
  })
}


</script>

<style scoped>
.songEnte {
  transform-origin: left bottom;
  animation: songEnte 0.7s ease 1;
}

.songLeave {
  animation: songLeave 0.7s ease 1;
}

@keyframes songLeave {
  0% {
    transform: translate(0px, -100vh);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes songEnte {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 底部导航栏消失动画 */
/* 底部导航栏特效 */
.disappearfalse {
  animation: disappear 1s ease 1 forwards;
}

.disappeartrue {
  animation: disappeartrue 1s ease 1;
}

@keyframes disappeartrue {
  0% {
    transform: translate(0px, 50px);
  }

  50% {
    transform: translate(0px, 100px);
  }

  100% {
    transform: translate(0px, 00px);
  }
}

@keyframes disappear {
  0% {}

  50% {
    transform: translate(0px, 100px);
  }

  100% {
    transform: translate(0px, 50px);
  }
}

.songleave {
  animation: songleave 1s ease forwards;
}

.homeeEter {
  animation: homeeEter 1s ease forwards;
}

.nohomeeEter {
  animation: nohomeeEter 1s ease forwards;
}

.homeleavesong {
  animation: homeleavesong 1s ease forwards;
}

@keyframes homeleavesong {
  0% {
    transform: translate(0px, 100px);

  }

  100% {
    transform: translate(0px, 0px);

  }
}

@keyframes nohomeeEter {
  0% {
    transform: translate(0px, 0px);

  }

  100% {
    transform: translate(0px, 100px);
  }
}

@keyframes homeeEter {
  0% {
    transform: translate(0px, 50px);

  }

  100% {
    transform: translate(0px, 100px);
  }
}

@keyframes songleave {
  0% {
    transform: translate(0px, 100px);
  }


  100% {
    transform: translate(0px, 50px);
  }

}

/* 页面切换动画 */
.left {
  animation: leftSliding .5s ease 1;
}

.right {

  animation: rightSliding .5s ease-in-out 1;
}

@keyframes rightSliding {
  0% {
    transform: translate(-100%, 0px);
    opacity: 0;
  }

  5% {}

  100% {
    transform: translate(0px, 0px);

    opacity: 1;

  }
}

@keyframes leftSliding {
  0% {
    transform: translate(0%, 0px);
    opacity: 0;
  }

  5% {
    transform: translate(96%, 0px);
    opacity: 1;
  }

  100% {
    transform: translate(0px, 0px);
  }
}

.bottomTabbar {
  height: 90px;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  z-index: 99;
}


/* This changes all the animations globally */
:root {
  --animate-duration: 1s;
  --animate-delay: -1s;
}

.loading {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: dhua 1s linear infinite;
  background-image: linear-gradient(to bottom, #647DEE, #9F98E8 20%, #AFF6CF 60%, #5DE6DE 100%);
}

@keyframes dhua {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }


}

.loading::after {
  content: '';
  background-color: #ffffff;
  position: absolute;
  border-radius: 50%;
  width: 80%;
  aspect-ratio: 1/1;
}

.contai {
  position: relative;
  height: 100%;

  display: flex;
  aspect-ratio: 1/1;
}

.contai span {
  color: rgba(95, 95, 95, 0.877);
  position: absolute;
  margin-top: 5px;
  display: flex;
  font-size: 10px;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: block;
  line-height: 15vw;
  text-align: center;
  top: 0px;
}

:deep(.van-tabbar-item) {
  background-color: rgba(0, 0, 0, 0) !important;
}

.app {

  width: 100vw;
  height: calc(100vh);
  position: relative;
  background-image: linear-gradient(to top, #F5F7FA, #B3CDD1);

  overflow: hidden;
}

.app::-webkit-scrollbar {
  display: none;
}

.btm {
  width: 100%;
  height: 50px;
  background-color: #000;
  box-shadow: 10 0 10px 10px red !important;
  /* position: absolute;
  bottom: 0px; */
}
</style>