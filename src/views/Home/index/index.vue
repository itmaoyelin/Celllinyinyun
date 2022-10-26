<template>
    <div class="index">
        <!-- 首页头部导航 -->
        <NavBar>

        </NavBar>
        <Loading v-if='loadingShow'></Loading>
        <!-- 内容区 -->

        <div style="overflow: scroll; flex: 1; margin-bottom: 90px;">
            <van-pull-refresh v-show="!loadingShow" v-model="loading" @refresh="onRefresh">
                <!-- 轮播图 -->
                <div class="floor">
                    <Swiper v-if="swiperArr?.length != 0" :loop="true" :delay="1000" :autoplay="true"
                        :slidesPerView="1">
                        <SwiperSlide v-for="item in swiperArr">
                            <div class="swiperItem">
                                <div v-if="item.song == undefined" class="advertisement">广告</div>
                                <img :src="item.imageUrl" alt="" @load="loadImage" />
                            </div>
                        </SwiperSlide>

                    </Swiper>
                    <!-- 小图标 -->
                    <ContentLcon></ContentLcon>
                </div>
                <!-- 歌单推荐 -->
                <div class="floor">
                    <Bar @bar-click="barSheet">
                        <template #left>
                            推荐歌单
                        </template>
                        <template #rigth>
                            更多
                            <van-icon name="arrow" />
                        </template>
                    </Bar>
                    <RecommendSheet :recommendSheet="recommendSheet"></RecommendSheet>
                </div>

                <!-- 推荐的歌曲 -->
                <div class="floor">
                    <RecommendSong :recommendSong="recommendSong"></RecommendSong>
                </div>

                <!-- mv推荐 -->
                <div class="floor">
                    <lazy-component>
                        <Bar>
                            <template #left>
                                推荐视频
                            </template>
                            <template #rigth>
                                更多
                                <van-icon name="arrow" />
                            </template>
                        </Bar>
                    </lazy-component>
                    <Mv :mvData="mvData"></Mv>
                </div>

            </van-pull-refresh>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
//轮播图依赖
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, EffectFade } from 'swiper'       //swiper自动轮播插件
import 'swiper/css';
import { useRouter } from 'vue-router'
import { loadingShow, controlLoad } from '../../../hooks/controlLoading.ts'
import type { Sheet, Songs, swipers } from '../../../types/home/index'      //类型限制
import networkRequest from '@/network/index.ts'

import Bar from "@/components/bar.vue";
import ContentLcon from './contentLcon.vue';
import RecommendSheet from './recommendSheet.vue'
import RecommendSong from './recommendSong.vue'
import Mv from './mv.vue'
import NavBar from '@/components/navBar.vue'
import Loading from '../../../components/loading.vue'
SwiperCore.use([Autoplay, EffectFade])      //使用插件


const loadings = ref(true);
onMounted(() => {
    controlLoad(false)
})

//跳转页面
const router = useRouter()
let barSheet = () => {
    router.push({
        path: '/sheet',
    })
}

//当加载完毕关闭loading动画
let a = false
let loading = ref(false)
//歌单图片加载完后再请求第二部分数据
const loadImage = () => {
    if (a) return
    homeData2()
    a = true
}

//顶部轮播图数据
let swiperArr = ref<swipers[]>([])
//歌单轮播图数据
let recommendSheet = ref<Sheet[]>([])
//歌曲推荐数据
let recommendSong = ref<Array<Songs[]>>([])
//mv推荐数据
let mvData: any = ref('')
//主页数据请求




//请求数据
const homeData = async () => {
    let datas: any = +new Date()
    networkRequest('request', '/banner?datas' + datas).then((res: any) => {
        swiperArr.value = res.data.banners   //轮播图数据
        return networkRequest('request', '/personalized/newsong')
    }).then((res: any) => {
        let arr = []
        arr.push([...res.data.result.splice(0, 3)])
        arr.push([...res.data.result.splice(0, 3)])
        arr.push([...res.data.result.splice(0, 3)])
        recommendSong.value = arr   //歌曲数据
        loading.value = false;
    })
}
//获取第二部分数据
const homeData2 = () => {
    let datas: any = +new Date()
    networkRequest('request', '/personalized?limit=10&datas=' + datas).then((res: any) => {
        recommendSheet.value = res.data.result.slice(0, 5)
        controlLoad(false)
        return networkRequest('request', '/mv/all?order=最热&limit=10&datas=' + datas)
    }).then((res: any) => {
        mvData.value = res.data.data     //mv数据
        loading.value = false;

    })
}
homeData()
//上拉刷新时
const onRefresh = async () => {
    homeData()
    homeData2()
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

.floor {
    background-color: #fff;
    width: 100vw;
    box-sizing: border-box;
    padding: 3vw;
    margin-top: 10px;
}

/* .home {
    padding: 0px 2vw;
} */

/* 顶部轮播图 */
.advertisement {
    border: 1px solid #fff;
    padding: 1vw 2vw;

    bottom: 5px;
    position: absolute;
    color: #fff;
    text-align: center;
    right: 5px;
    font-size: 2vw;
}

.swiperItem {
    width: 100%;

}

.swiperItem img {
    width: 100%;
    border-radius: 10px;
}

.ac {
    width: 100px;
    height: 200px;
    background-color: red;
}

.loading {
    position: absolute;
    top: 50%;
    width: 100vw;
    height: 100vh;
    font-size: 200px;
}

/* 轮播图 */
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.index {
    width: 100vw;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
}
</style>