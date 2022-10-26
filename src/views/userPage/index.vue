<template>
    <!-- 用户详情页面 -->
    <div class="page">
        <NavBar>
        </NavBar>
        <div class="container">
            <div class="details back" v-if="useDetail">
                <img v-lazy="useDetail.profile.avatarUrl" alt="">
                <div class="name">
                    {{ useDetail.profile.nickname }}
                </div>
                <div class="signature">
                    {{ useDetail.profile.signature }}
                </div>
                <div class="more">
                    <div>关注 {{ useDetail.profile.newFollows }}</div>
                    <div>粉丝 {{ useDetail.profile.followeds }}</div>
                    <div>Lv. {{ useDetail.level }}</div>
                </div>

            </div>
            <div class="function back">
                <div @click="golately">
                    <img src="@/assets/image/ioce/播放.png" alt="" srcset="">
                    <span>最近播放</span>
                </div>
                <div @click="goSheet(likeSheet[0]?.id)">
                    <img src="../../assets/image/ioce/爱心.png" alt="" srcset=""> <span>我的喜欢</span>
                </div>
                <div @click="goComment()">
                    <img src="@/assets/image/ioce/评论.png" alt="" srcset="">
                    <span>我的评论</span>
                </div>

            </div>
            <van-tabs v-model:active="active" background="#E7E7E7" :offset-top="49" scrollspy sticky>
                <!-- 用户收藏的歌单 -->
                <van-tab title="收藏歌单">
                    <div class="back">
                        <div v-if="sheetList.length == 0" class="sheet">暂无收藏的歌单</div>
                        <div style="width: 100%;" v-else v-for="item in sheetList">
                            <SheetContainer @click="goSheet(item.id)" :image="item.coverImgUrl" :name="item.name"
                                :nike-name="item.creator.nickname" :image-size="15" :sizeVmin="4" :nike-name-size="2">
                                <template #spans>
                                    <span>{{ item.trackCount + '首，by ' }}</span>
                                </template>
                            </SheetContainer>
                        </div>
                    </div>
                </van-tab>
                <!-- 用户收藏的视频 -->
                <van-tab title="收藏视频">
                    <div class="back">
                        <div class="sheet" v-if="mv.length == 0">暂无收藏的视频</div>
                        <div class="mvdelet" v-else v-for="item in mv" @click="playMv(item.vid, $event)"
                            :key="item.vid">
                            <img class="mvImg" v-lazy="item.coverUrl" alt="">
                            <div class="name">
                                <div class="mvName">
                                    {{ item.title }}
                                </div>
                                <div class="userName">
                                    {{ item.creator[0].userName }}
                                </div>
                            </div>

                        </div>
                    </div>
                </van-tab>
                <!-- 用户收藏的电台 -->
                <van-tab title="收藏电台">
                    <div class="back    ">
                        <div v-if="djSublist.length == 0" class="sheet">暂无收藏的电台</div>
                        <div v-else style="width: 100%;" v-for="item in djSublist" :key="item.id">
                            <SheetContainer @click="goRadidetalis(item.id)" :image="item.intervenePicUrl" :name="item.name"
                                :nike-name="item.dj.nickname" :image-size="20" :sizeVmin="4" :nike-name-size="2">
                            </SheetContainer>

                        </div>
                    </div>
                </van-tab>
                <!-- 用户喜欢的歌手 -->
                <van-tab title="喜欢的歌手">
                    <div class="back mb">
                        <div class="sheet" v-if="sublist.length == 0">暂无喜欢的歌手</div>
                        <div class="sublist" @click="gosinger(item.id)" v-else v-for="item in sublist" :key="item.id">
                            <img class="imga" v-lazy="item.img1v1Url" alt="">
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <van-icon name="ellipsis" size="4vmin" class="mores" />
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script lang="ts">
// export default {
//     name: "userPage",
// };
</script>
<script lang="ts" setup>
import { reactive, ref, provide, onActivated } from "vue"
import { useRouter } from "vue-router"
import networkRequest from '@/network/index.ts'
import type { singers, mvs, djSublists, SheetList, useDetails } from "../../types/userPage/index"
import { getlocalStorage } from "@/hooks/operationLocalStorage.ts";
import { setxy, mvid } from "@/hooks/mvDetails.ts"
import { singerSign, sheetSign, radioSign, mvSign } from "../../hooks/dataSign"
import SheetContainer from "./compomnents/sheetContainer.vue"
import NavBar from "../../components/navBar.vue"
import latelyVue from "./lately.vue";
import usecommentVue from "./usecomment.vue";
//数据请求
let active = ref(0)
//用户数据
let sublist = ref<singers[]>([])//喜欢的歌手
let mv = ref<mvs[]>([])
let djSublist = ref<djSublists[]>([])
let sheetList = ref<SheetList[]>([])           //用户收藏歌单
let likeSheet = ref<SheetList[]>([])
let useDetail = ref<useDetails>()
//获取用户信息
let use = reactive(getlocalStorage('use'))
//添加数据
const setData = (index: number, res: any) => {
    let objData: any = {
        '0'() {
            //歌手数据
            sublist.value = res.data.data
        },
        '1'() {
            //用户账号数据
            useDetail.value = res.data
        },
        '2'() {
            //mv数据
            mv.value = res.data.data
        },
        '3'() {
            //电台数据
            djSublist.value = res.data.djRadios
        },
        '4'() {
            likeSheet.value = res.data.playlist.splice(0, 1)
            //我收藏的歌单
            sheetList.value = res.data.playlist
        },
    }
    objData[index]()
}
let url = [
    '/artist/sublist',
    '/user/detail?uid=' + use.id,
    '/mv/sublist', 'dj/sublist',
    '/user/playlist?uid=' + use.id
]
let promiseArr: any = []


//获取数据
const request = () => {
    url.forEach(element => {
        promiseArr.push(networkRequest('request2', element))
    })
    Promise.all(promiseArr).then(res => {
        res.forEach((element, index) => {
            setData(index, element)
        });

        //动态添加路由，可以跳转到最近播放和评论页面
        routeradd()
        //将信息传递给导航栏
        Obj.value = {
            name: useDetail.value?.profile.nickname,
            image: useDetail.value?.profile.avatarUrl,
            id: use.id
        }
    })
}
let Obj = ref()
provide('useData', Obj)
//动态添加路由，可以跳转到最近播放和评论页面
const routeradd = () => {
    router.addRoute({
        path: "/lately",
        name: 'lately',
        component: latelyVue,
        meta: {
            index: 1,
        },
    })
    router.addRoute({
        path: "/usecomment",
        name: 'usecomment',
        component: usecommentVue,
        meta: {
            index: 1,
        },
    })
}
request()


//监听用户有没有收藏歌单、电台、mv、歌手和登录操作。并获取对应的数据
onActivated( () => {
    //谁改变了就调用谁对应的接口
    [singerSign, use, mvSign, radioSign, sheetSign].forEach((item, index) => {
        if (item.value) {
            item.value=false    //  开始发送请求就恢复初始值
            networkRequest('request2', url[index]).then((res: any) => {
                setData(index, res)
                
            })
        }
    })
})



//播放mv
const playMv = (id: string, e?: any) => {
    setxy(e.clientX, e.clientY)
    mvid.value = id
}
const router = useRouter()

//跳转到歌单页面
const goSheet = (id: number | string) => {
    router.push({
        path: "/sheetdetails",
        query: {
            id,
            'user': "true"
        }
    })
}
const  goRadidetalis=(id:number|string)=>{
    router.push({
        path: "/radidetalis",
        query: {
            id,
        }
    })
}
const golately = () => {
    router.push({
        path: "/lately",
        query: {
            id: likeSheet.value[0]?.id
        }
    })
}
const goComment = () => {
    router.push({
        path: "/usecomment",
        query: {
            id: use?.id
        }
    })
}
const gosinger = (id: number) => {
    router.push({
        path: '/singerdetails',
        query: {
            id
        }
    })
}

</script>

<style  scoped>
.mb {
    margin-bottom: 90px !important;
}

.djContaier {
    display: flex;
    align-items: center;
    width: 100%;
    height: 20vmin;
    margin: 4vmin;
}

.sheetImge {
    width: 15vmin;
    aspect-ratio: 1/1;
}

.djContaier img {
    width: 20vmin;
    aspect-ratio: 1/1;
}

.djContaier .titles {
    margin-left: 2vmin;
    height: 100%;
    overflow: hidden;
    flex: 1;
    position: relative;

}

.titles div:nth-child(1) {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    top: 0px;
    position: absolute;
    font-size: 4vmin;
}

.titles div:nth-child(2) {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    text-overflow: ellipsis;
    font-size: 2vmin;
    color: rgb(196, 196, 196);
}

.sublist {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 5vmin 0px;
    padding-bottom: 3vmin;
    border-bottom: 0.5px solid rgb(196, 196, 196);
}

.sublist .imga {
    width: 13vmin;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.mvdelet .name {
    flex: 1;
    margin-left: 4vmin;
    height: 20vmin;
    position: relative;
}

.mvdelet .userName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 2vmin;
    color: rgb(187, 187, 187);
}

.mvdelet {
    display: flex;
    align-items: center;
    margin: 4vmin 0px;
}

.mvImg {
    width: 25vmin;
    border-radius: 10px;
}

.mvName {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    overflow: hidden;
    width: 100%;
    font-size: 4vmin;
}

.sublist .name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2vmin;
    font-size: 4vmin;
}


.mores {
    transform: rotate(90deg);
    margin-left: 3vw;
}

.back .sheet {
    width: 100%;
    justify-content: center;
    aspect-ratio: 9/2;
    display: flex;
    align-items: center;
    font-size: 4vmin;
    color: rgb(145, 145, 145);
}

.page {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #E7E7E7;
}

.container {
    flex: 1;

    overflow: scroll;
}

.back {
    width: 91vw;
    padding: 2vw 2vw;
    margin: 4vw auto;
    background-color: #fff;
    position: relative;
    border-radius: 10px;

}

.details {
    margin-top: 9vmin;
}

.details img {
    width: 15vmin;
    position: absolute;
    top: 0px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: block;
    left: 50%;

}

.details .name {
    padding-top: 8vmin;
    text-align: center;
    font-size: 5vmin;
    font-weight: 600;
}

.more {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b4b4b4;
}

.more div {
    padding: 2vmin 2vmin;
}

.function {
    margin-top: 6vmin;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.function div {
    width: 30vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 5vmin;
    margin-bottom: 5vmin;
}

.function span {
    width: 100%;
    text-align: center;
    font-size: 3vmin;
    color: rgb(128, 126, 126);
}

.function img {
    width: 20%;
    aspect-ratio: 1/1;
}

.signature {
    font-style: italic;
    font-size: 3vmin;
    text-align: center;
}
</style>