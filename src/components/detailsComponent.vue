<template>
    <!-- 导航栏 -->

    <NavBar @nav-click="navClick" style="position: absolute; top: 0 ;">
        <template #left>
            <van-icon class="navbar" name="arrow-left" />
        </template>
        <template #rigth>
            <h3 class="h3">
                <div v-if="!nameIsShow" class="text center">
                    {{ name }}
                </div>
                <div v-else class="text">
                    <!-- <van-notice-bar color="#000" :speed="100" background="#B7CFD3"  :text="name" /> -->
                    <ScrollText style="min-width: 70vw;" :name="name"></ScrollText>

                </div>
                <transition name="">
                    <div class="collection" v-show="operationShow">
                        <div v-if="!modelValue" v-range="{fn:collection}">
                            <van-icon name="star-o" />收藏
                        </div>
                        <div v-else v-range="{fn:collection}">
                            <van-icon name="passed" />取消收藏
                        </div>
                    </div>
                </transition>
            </h3>
        </template>
    </NavBar>
    <!-- 歌单详情页面顶部图片区域 -->
    <div class="detailsComponent" v-if="details">
        <div class="tob">
            <slot name="tob">
                <div class="flex">
                    <img v-lazy="details.coverImgUrl" alt="">
                    <div class="right" ref="detailsDom" >
                        <div>{{ details.detailsName }}</div>
                        <div class="flex2">
                            <img class="toimage" v-if="details.avatarUrl" @load="imageLoad" :src="details.avatarUrl"
                                alt="">
                            <span>{{ details.nickname }}</span>
                        </div>
                        <div class="time title" v-if="details.time">更新时间：{{ datelist }}</div>
                        <slot name="layt">
                            <div class=" moreMore" v-if="details.description">
                                <div class="title">{{ details.description }}</div>
                                <van-icon color="#3D3C3D" size="2.7vw" name="arrow" />
                            </div>
                        </slot>
                    </div>

                </div>
                <slot name="description"></slot>
            </slot>
        </div>
        <div class="ops" ref="operation">
            <slot name="operation">
                <!-- 三个功能按钮 -->
                <div class="operationFather">
                    <transition name="operation">

                        <div class="operation" v-show="!operationShow">
                            <!-- 收藏按钮 -->
                            <div v-if="modelValue" v-range="{fn:collection}">
                                <van-icon name="passed" size="5vw" />
                                <div>{{NumberFormats(details.subscribedCount)}}</div><span></span>
                            </div>
                            <div v-else v-range="{fn:collection}">
                                <van-icon name="star-o" size="5vw" />
                                <div>{{NumberFormats(details.subscribedCount)}}</div><span></span>
                            </div>
                            <!-- 分享 -->
                            <div v-range="{fn:share}">
                                <van-icon name="share-o" size="5vw" />
                                <div>{{ NumberFormats(details.shareCount) }}</div><span></span>
                            </div>
                            <!-- 评论按钮 -->
                            <div>
                                <van-icon @click="goComment" size="5vw" name="chat-o" />
                                <div> {{NumberFormats(details.commentCount)}}</div>
                            </div>
                        </div>

                    </transition>
                </div>
            </slot>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref,  computed, onDeactivated,  onMounted } from "vue"
import NumberFormats from "@/hooks/NumberFormats.ts"
import type { Object } from "../views/Home/ts/sheet/details"
import { controlLoad } from "@/hooks/controlLoading.ts"   //控制loading
import { sheetSign } from "@/hooks/dataSign.ts"
import { useRouter } from "vue-router";
import networkRequest from '@/network/index.ts'
import monitoring from "../hooks/coverMonitoring"
import { datas, shareShow } from "@/hooks/share.ts";
import ScrollText from "./scrollText.vue";

let data = defineProps<{
    details: Object,        //展示所需的数据
    name: string,     //导航栏名字
    modelValue: boolean,
    id: string | number,
    fn?: any              //电台传过来收藏的方法
    //歌单是否收藏
}>()
//收藏歌单
const emit = defineEmits(['update:modelValue'])
const collection = () => {
    if (data.fn) {
        //判断组件是否传递过来收藏方法
        data.fn()
        return
    }
    if (data.modelValue) {

        networkRequest('request2', '/playlist/subscribe?t=2&id=' + data.id, function (res: any) {
            emit('update:modelValue', false)
            sheetSign.value = true
        })
    } else {
        networkRequest('request2', '/playlist/subscribe?t=1&id=' + data.id, function (res: any) {
            emit('update:modelValue', true)
            sheetSign.value = true
        })
    }


}

//时间格式化
const datelist = computed(() => {
    let c = (data.details.time) as string;
    let date: Date = new Date(c);
    let month: string | number = "";
    let day: string | number = "";
    //月格式化
    if (date.getMonth() + 1 < 10) {
        month = "0" + (date.getMonth() + 1);
    } else {
        month = date.getMonth() + 1;
    }
    //日格式化
    if (date.getDate() < 10) {
        day = "0" + date.getDate();
    } else {
        day = date.getDate();
    }
    return month + "月" + day + "日";

})



//1.获取到要监听的dom元素
const detailsDom = ref(null)
const operation = ref(null)
//导航栏的内容修改
const name = ref<string>('')
name.value = data.name
let nameIsShow = ref<boolean>(false)
const operationShow = ref<boolean>(false)
//开始的第一次不执行
let Switch = ref(true)
let Switch2 = ref(true)
onDeactivated(() => {
    Switch.value = true
    Switch2.value = true
})

//得到IntersectionObserver对象

onMounted(() => {
        monitoring((detailsDom.value! as HTMLElement), function (e: any) {
            //是否修改导航栏标题名称为歌单名称
            !e[0].isIntersecting ? name.value = data.details.detailsName : name.value = data.name
            nameIsShow.value = !e[0].isIntersecting
        })
       monitoring((operation.value! as HTMLElement), function (e: any) {
            operationShow.value = !e[0].isIntersecting        //展示导航栏收藏按钮
            name.value = name.value + ' '               //为了让navbar重新计算要不要变成滚动
        }, 0.)
  

})



//监听图片加载完毕没有，如果加载完毕可以关闭loading效果
// const emit = defineEmits(['update:modelValue'])
const imageLoad = () => {
    controlLoad(false)
    // //发送事件告诉父组件加载完毕,关闭load
    // emit('update:modelValue', false)
}

//分享
const share = () => {
    datas.name = data.details.detailsName
    datas.image = data.details.coverImgUrl
    datas.type = 'playlist',
        datas.typeTitle = '歌单'
    datas.nickeName = data.details.nickname
    shareShow.value = true
    datas.id = data.id
}

//跳转页面到歌单主页
const router = useRouter()
const navClick = () => {
    router.go(-1)
}
const goComment = () => {
    router.push({
        path: '/comment',
        query: {
            id: data.id,
            type: 2,
            detailsName: data.details.detailsName,
            image: data.details.coverImgUrl,
            nickname: data.details.nickname
        }
    })
}
</script>

<style  scoped>
.operation-enter-active {
    animation: mov 0.5s ease-in;
}

.operation-leave-active {
    animation: mov 0.5s linear reverse;
}

@keyframes mov {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }

    /* 50%{
         transform: scale(1.5);
    } */
    100% {
        opacity: 1;
        transform: scale(1);

    }
}

.collection {
    font-size: 2vw;
    font-weight: 400;
    border-radius: 40px;
    background-color: rgba(228, 228, 228, 0.493);
    padding: 4px 6px;
    margin-left: 8px;
}

.text {
    flex: 1;
    overflow: hidden;
}

.center {

    text-align: center;
}

h3 {
    flex: 1;

    margin: 2vw 5vw;
    overflow: hidden;
    /* max-width: 80vw; */
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.operation {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-around;
    z-index: 100;

}

.operation>div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vw;
    position: relative;
    height: 100%;
}

.operation span {
    position: absolute;
    right: 0px;
    height: 60%;
    width: 1%;
    background-color: rgb(160, 160, 160);
}



.toimage {
    width: 12%;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.flex>img {
    width: 32vw;
    border-radius: 10px;
    aspect-ratio: 1/1;
}

.detailsComponent {
    position: relative;
    width: 100vw;
    z-index: 2;
    aspect-ratio: 3/1.9;
    perspective: 400px;
    /* overflow: hidden; */
}

.tob {
    position: absolute;
    z-index: 2;
    top: 0px;

    color: #fff;
    width: 100vw;
    padding: 5vw;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.operationFather {
    width: 70%;
    aspect-ratio: 7/1;
    position: absolute;
    left: 50%;
    display: flex;
    justify-content: space-around;
    margin-left: -35%;
    z-index: 100;
}

.ops {
    width: 100vw;
    position: absolute;
    bottom: 10px;
    aspect-ratio: 10/1;
}

.flex {
    display: flex;

}

.flex2 {
    display: flex;
    width: 100%;
    align-items: center;
}

.flex2 span {
    margin-left: 5px;
    font-size: 2.7vw;
    display: inline-block;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(54, 54, 54, 0.719);
}

.right {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    font-size: 4.5vw;
    max-width: 52vw;
    flex-direction: column;
    margin-left: 10px;
    justify-content: space-evenly;
}

.title {
    font-size: 2.7vw;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(54, 54, 54, 0.719);
}

.moreMore {
    width: 100%;
    display: flex;
    align-items: center;
}
</style>