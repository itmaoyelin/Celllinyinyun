<template>
    <div v-show="loadingShow" style="height: 70vh; width: 100vw; position: absolute;">
        <Loading ></Loading>
    </div>
    <div v-show="!loadingShow">
        <!-- 电台展示组件 -->
        <h3 v-if="goodRadio?.length != 0">优秀电台</h3>
        <div class="flex" v-if="goodRadio.length != 0">
            <div class="title" v-for="(item, index) in goodRadio" :key="item.id" @click="goDetalis(item.id)" >
                <img v-lazy="item.picUrl" alt="">
                <div class="name">{{ item.name }}</div>
                <div class="name">{{ item.rcmdtext }}</div>
            </div>
        </div>
        <h3 v-if="rankingRadio?.length != 0">电台排行榜</h3>
        <div class="flex">
            <div class="title" v-for="(item, index) in rankingRadio" :key="item.id"  @click="goDetalis(item.id)">
                <img v-lazy="item.picUrl" alt="">
                <div class="name">{{ item.name }}</div>
                <div class="name">{{ item.rcmdtext }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import networkRequest from '@/network/index.ts'
import { loadingShow, controlLoad } from "@/hooks/controlLoading.ts"
import type { RootObject } from "../ts/radioStation/content"
import { useRouter } from "vue-router"
import Loading from "../../../components/loading.vue"
const data = defineProps<{
    id: number,
    name: string
}>()
let goodRadio = ref<Array<RootObject>>([]) //获得的展示数据
let rankingRadio = ref<Array<RootObject>>([])

function getAxios() {
    controlLoad(true)
    //请求当前电台分类的数据
    const goodRadioAxios = () => {
        networkRequest('request', '/dj/recommend/type?type=' + data.id, function (res: any) {
            goodRadio.value = res.data.djRadios.splice(0, 9)
            controlLoad(false)
        })
    }
    const rankingRadioAxios = () => {

        networkRequest('request', '/dj/radio/hot?cateId=' + data.id, function (res: any) {
            rankingRadio.value = res.data.djRadios.splice(0, 9)
            controlLoad(false)
        })
    }
    goodRadioAxios()
    rankingRadioAxios()
    return
}
getAxios()

//用户点击不同分类时，发送数据请求
watch(data, () => getAxios())

const router = useRouter()
const goDetalis=(id:number)=>{
router.push({
    path:"/radidetalis",
    query:{
        id
    }
})
}
</script>

<style  scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
}

.title {
    width: 31vw;
    aspect-ratio: 1/1;
    border-radius: 10px;
    padding: 0px 1vw;
    margin: 2vmin 0px;
}

img {
    width: 100%;
}

.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>