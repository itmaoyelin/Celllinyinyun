<template>
    <!-- 搜索页面 -->
    <div class="search">
        <NavBar>
            <template #left>
                <van-icon @click="router.go(-1)" name="arrow-left" color="#000" size="6vmin" />
            </template>
            <template #rigth>
                <div style="font-size: 5vmin; font-weight: 600; text-align: center; flex: 1;">
                    搜索
                </div>
            </template>
        </NavBar>
        <div class="title">搜索 “{{value}}” ，找到以下内容</div>
        <van-tabs background="#ffff" v-model:active="active" style="z-index: 100  ; position: sticky; top: 49px;"
            :sticky="true">
            <van-tab title="单曲"></van-tab>
            <van-tab title="歌单"></van-tab>
            <van-tab title="歌手"></van-tab>
        </van-tabs>
        <div class="detlis">
            <keep-alive>
                <component :is="components[active]" :nestedProps='nestedProps()'></component>
            </keep-alive>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onActivated, watch, } from "vue"
import NavBar from "../../components/navBar.vue"
import { useRouter, useRoute } from "vue-router"
import networkRequest from '@/network/index.ts'

import type { songs } from "../../types/search/index"
import type { sheets } from "../../types/search/sheet"
import Song from './song.vue'
import Sheet from "./sheet.vue"
import singer from "./singer.vue"
let router = useRouter()
let route = useRoute()
let value = ref('')
let active = ref<number>(0)
let songList = ref<songs[]>()    //搜索的单曲数据
let sheetList = ref<sheets[]>()   //搜索的歌单数据
let singerLiset = ref()           //搜索歌手列表
let components = [Song, Sheet, singer]
let nestedProps = () => {
    switch (active.value) {
        case 0:
            return {
                songList: songList.value,
                value: value.value
            }
        case 1:
            return {
                sheet: sheetList.value,
                value: value.value
            }
        case 2:
            return {
                singer: singerLiset.value,
                value: value.value
            }
    }

}
onActivated(() => {
    if (value.value == route.query.name)
        return
    active.value = 0
    songList.value = undefined
    sheetList.value = undefined
    singerLiset.value = undefined
    value.value = route.query.name as string
    strategy(0)
})
watch(active, (a) => {
    strategy(a)
})
//数据请求策略
const strategy = (activ: number) => {
    let obj: any = {
        '0'() {

            //单曲数据
            songList.value ? '' : request(1).then((res: any) => {
                songList.value = res.data.result.songs
            })
        },
        '1'() {      //歌单数据
            sheetList.value ? '' : request(1000).then((res: any) => {
                sheetList.value = res.data.result.playlists
            })
        },
        '2'() {
            //歌手数据
            request(100).then((res: any) => {
                singerLiset.value = res.data.result.artists
            })
        },
    }
    obj[activ]()
}
const request = (type: number) => {
    return networkRequest('request', `/cloudsearch?keywords=${value.value}&limit=15&type=${type}`)
}
</script>

<style  scoped>
.detlis {
    flex: 1;
    overflow: scroll;
}

.search {
    width: 100vw;
    display: flex;
    height: calc(100vh - 40px);
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 40px;

}

.title {
    font-size: 3vmin;
    color: rgb(75, 75, 75);
    margin-bottom: 2vmin;
}
</style>