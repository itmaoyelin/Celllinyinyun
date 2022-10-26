<template>
    <!-- 电台主页 -->
    <!-- 分类导航 -->

    <div class="radio">
            <NavBar @nav-click="navClick" style="height:50px ; background-color: #fff;">
                <template #left>
                    <van-icon class="navbar" name="arrow-left" />
                </template>
                <template #rigth>
                    <h4 class="h3">
                        电台
                    </h4>
                </template>
            </NavBar>
            <van-tabs v-model:active="active" animated  >
                <van-tab v-for="(item, index) in navArr" :key="index" :title="item.name">
                  
                </van-tab>
            </van-tabs>

            <!-- 电台展示 -->
             <div class="content">
                 <Content v-if="navArr.length != 0" :id="navArr[active].id" :name="navArr[active].name"  ></Content>
             </div>
   
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent } from "vue"
import networkRequest from '@/network/index.ts'
import { useRouter } from "vue-router"
import type {navText} from "./../../../types/radioStation/index"

import NavBar from '../../../components/navBar.vue'
import Scroll from "../../../components/scroll.vue"

const router = useRouter()


const Content = defineAsyncComponent(() => import('./content.vue'))

let active = ref(0) //当前活跃的分类导航
let navArr = ref<navText[]>([]) //电台分类


//获得电台的所有分类
networkRequest('request', '/dj/catelist', function (res: any) {
    navArr.value = res.data.categories
})


const navClick = () => {
    router.push({
        path: '/home'
    })
}
</script>

<style  scoped>
.content{
    flex: 1;
    overflow: scroll;
}
.radio{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
}
:deep(.van-tabs) {
    position: static !important;
    top: 0px;
}

h4 {
    flex: 1;
    text-align: center;
    margin: 2vw 0px;
}
</style>