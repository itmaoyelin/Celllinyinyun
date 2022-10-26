<template>
    <!-- 排行榜主业 -->
    <Scroll>
        <NavBar @nav-click="navClick">
            <template #left>
                <van-icon class="navbar" name="arrow-left" />
            </template>
            <template #rigth>
                <h4 class="h3">
                    排行榜
                </h4>
            </template>
        </NavBar>
       <div class="container1">
         <div  v-if="arr1.length != 0" @click="goDetails(item.id)" class="king" v-for="item in arr1" :key="item.id">
            <div class="tite">
                <div>{{ item.name }}</div>
                <div>{{ item.updateFrequency }}</div>
            </div>
            <div class="songList">
                <img v-lazy="item.coverImgUrl" alt="">
                <div>
                    <div v-for="(list, index) in item.tracks" class="list">
                        <span>{{ index + 1 }}</span>
                        <span>{{ list.first }}</span>
                        <span>{{ "- " + list.second }}</span>
                    </div>
                </div>
            </div>
        </div>

        <h5>全球媒体榜</h5>
        <div class="flex" v-if="arr2.length != 0">
            <img v-for="item in arr2" v-lazy="item.coverImgUrl" alt="" @click="goDetails(item.id)">
        </div>
       </div>
  
</Scroll>

</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import networkRequest from "@/network/index.ts"
import {controlLoad} from "@/hooks/controlLoading.ts"   //控制loading

import type { RootObject } from "../ts/rankingList/index"
import NavBar from '@/components/navBar.vue'
import Scroll from '../../../components/scroll.vue'


let arr1 = ref<RootObject[]>([])
let arr2 = ref<RootObject[]>([])
controlLoad(true)
networkRequest('request', '/toplist/detail', function (res: any) {
    arr1.value = res.data.list.splice(0, 4)
    arr2.value = res.data.list.splice(4, 27)
controlLoad(false)
})




// })
//返回首页
const router = useRouter()
const navClick = () => {
    router.push({
        path: '/home'
    })
}
//去到详情页
const goDetails = (id: number) => {
    router.push({
        path: '/rankingListDetails',
        query: {
            id
        }
    })
}
</script>

<style  scoped>
.container1{
    flex: 1;
    margin-bottom: 40px;
    overflow: scroll;
    width: 100vw;
}
.list {
    font-size: 3.6vw;
}

.list span:nth-child(1),
.list span:nth-child(2) {
    margin-right: 3vw;
    font-weight: 700;
}

.list span:nth-child(3) {
    color: #b9b9b9;
}

.songList {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.songList div {
    flex: 1;
    white-space: nowrap;
    margin: 5px 0px 5px 2vw;
    overflow: hidden;
    text-overflow: ellipsis;
}

h4 {
    flex: 1;
    text-align: center;
    margin: 2vw 0px;
}

img {
    margin: 2vw 0px;
    width: 28vw;
    border-radius: 10px;
}

h5 {
    margin: 2vw;
}

.flex {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.image {
    width: 12vw;
    aspect-ratio: 1/1;
}

.king {
    width: 100%;
    background-color: #ffff;
    border-radius: 10px;
    padding: 3vw;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-top: 5px;
}

.tite {
    display: flex;
    justify-content: space-between;
}

.tite div:nth-child(2) {
    font-size: 2vw;
    color: #b9b9b9;
}

.tite div:nth-child(1) {
    font-size: 5vw;

}
</style>