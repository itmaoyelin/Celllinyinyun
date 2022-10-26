<template>
    <div class="navbar">
        <div @click="navClick">
            <slot name="left">
                <van-icon name="wap-nav" size="20" @click="popupShow=true" />
            </slot>
        </div>
        
        <slot name="rigth">
            <van-search style="flex: 1; " v-model="value" @search="go(value)" @focus="show=true" shape="round"
                background="rgba(255, 255, 255, 0)" autocomplete="off" placeholder="请输入搜索关键词" />
            <div class="zz" @click="show=false" v-if="show">
                <div class="detelis">
                    <div @click.stop="go(item.keyword)" v-if="arr&&value" v-for="item in arr" class="keyword">
                        <van-icon name="search" />{{item.keyword}}
                    </div>
                    <div v-if="!arr&&value" class="values" @click.stop="go(value)">
                        搜索 “ {{value}} ”
                    </div>
                </div>
            </div>

        </slot>
        <popup v-model="popupShow"></popup>

    </div>

</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue"
import Popup from "./popup.vue"
import networkRequest from '@/network/index.ts'

import { useRouter } from "vue-router"
let value = ref('')
let show = ref(false)
const router = useRouter()
let popupShow = ref<boolean>(false)   //左侧弹出层
let emit = defineEmits(['nav-click', 'useOut'])
const navClick = () => {
    emit('nav-click')

}
let arr = ref()
//防抖函数
// let debounce = (fn: any, delay: number) => {
//     let time: any = undefined
//     return function a() {
//         if (time) {
//             clearTimeout(time)
//         }
//         time = setTimeout(() => {
//             fn()
//             time = null
//         }, delay)
//     }
// }
// //搜索提示
// const requset = debounce(function () {
//     if(!value.value)
//     return
//     networkRequest('request', `/search/suggest?keywords=${value.value}&type=mobile`, function (res: any) {
//         arr.value = res.data.result.allMatch?.splice(0, 6)
//     })
// }, 1000)
let times: any = null
let requset = (value: any) => {
    if (!value)
        return
    times = setTimeout(() => {
        networkRequest('request', `/search/suggest?keywords=${value}&type=mobile`, function (res: any) {
            arr.value = res.data.result.allMatch?.splice(0, 6)
            times = null
        })
    },600)
}
//监听搜索文本改变
watchEffect((oninvali) => {
    requset(value.value)
    oninvali(() => {
        clearTimeout(times)
    })
})
//跳转到搜索页面
const go = (name: string) => {
    if (!name) {
        return
    }
    router.push({ path: '/search', query: { name } })
}
</script>

<style  scoped>
.zz {
    width: 100vw;
    height: calc(100vh - 50px);
    position: fixed;
    background-color: rgba(0, 0, 0, 0.418);
    bottom: 0px;
    left: 0px;
    z-index: 1000;
}

.detelis {
    position: fixed;

    background-color: #fff;
    z-index: 100;
    width: 100vw;
    left: 0px;
    box-shadow: 0px 0.2px 8px 1px rgba(175, 175, 175, 0.589);
}

.keyword {
    font-size: 2vmin;
    padding: 2vmin;
    border-bottom: 0.1px solid rgba(207, 207, 207, 0.63);
}

.navbar {
    padding: 0px 5px;
    display: flex;
    align-items: center;
    width: 100%;
    z-index: 999;
    height: 50px;
    box-sizing: border-box;

}

.values {
    color: #23AAF2;
    font-size: 3vmin;
    padding: 2vmin;
}
</style>