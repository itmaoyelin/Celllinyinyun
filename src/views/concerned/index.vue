<template>
    <NavBar>
       
    </NavBar>
    <!-- 用户的动态主业 -->
  
        <van-list class="indexContainer" v-model:loading="loading"  :finished="finished" finished-text="没有更多了"  @load="onLoad">
            <UserName v-for="item,index in event" v-model="item.info.liked"  v-model:count="item.info.likedCount" :id="item.id" :userId="use.id==item.user.userId" :index="index"
                :key="item.id" :pics="item.pics" :bottom-activity-infos="item.bottomActivityInfos" :type="item.type"
                :time="item.eventTime" :text="JSON.parse(item.json).msg" :name="item.user.nickname"
                :image="item.user.avatarUrl" @deletes="deletes">
                <template #detils>
                    <Content :a="JSON.parse(item.json)" :obj="a(JSON.parse(item.json),item.type)" :type="item.type">
                    </Content>
                </template>
            </UserName>
        </van-list>

  
</template>

<script lang="ts" setup>
import { ref, reactive,onActivated } from "vue"
import networkRequest from '@/network/index.ts'
import type { events } from "../../types/concerned/index"
import UserName from "./components/userName.vue"
import Content from "./components/content.vue"
import { getlocalStorage } from "@/hooks/operationLocalStorage.ts";
import NavBar from "../../components/navBar.vue"
import { Notify } from 'vant'
import 'vant/es/notify/style';
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    request()
};
onActivated(()=>{
    event.value=[]
    lasttime.value=-1.
    request()
})
const loading = ref(false);     //加载中
const finished = ref(false);       //还有无数据
let lasttime = ref<number>(-1)     //用于获取下一页数据
let event = ref<events[]>([])
//删除自己的动态
const deletes = (index: number) => {
    event.value.splice(index, 1)
    Notify({ type: 'success', message: '删除成功' });
}
//获取数据

const request = () => {
    networkRequest('request2', `/event?pagesize=11&lasttime=${lasttime.value}&date=${Date.now()}`, function (res: any) {
        console.log(res);
        lasttime.value = res.data.lasttime
        let arr = [18, 17, 35, 28, 13, 21]
        //将数据筛选出出来，只要对应类型的数据
        let dataArr = res.data.event.filter((el: any) => {
            return arr.includes(el.type)
        })
        event.value.push(...dataArr)
        //当获取的数据小于10时，那么证明数据到底了
        if (res.data.event.length < 11) {
            //证明没有数据了
            finished.value = true
        } else {
            // 加载状态结束
            loading.value = false;
        }

    })
}
//用户信息
let use = reactive(getlocalStorage('use'))

//数据格式化
function a(data: any, type: number) {
    let obj: any = {
        name: '',
        image: '',
        id: 0,
        nicekName: ''
    }
    let strategy: any = {
        '18'() {        //单曲
            obj.name = data.song.name
            obj.image = data.song.album.blurPicUrl || data.song.img80x80
            obj.nicekName = data.song.artists[0].name
            obj.id = data.song.id
        },
        '17'() {        //声音
            obj.name = data.program.name
            obj.image = data.program.coverUrl
            obj.nicekName = data.program.dj.nickname
            obj.id = data.program.id
        },
        '35'() {        //普通动态，非分享
            return "";
        },
        '28'() {        //电台
            obj.name = data.djRadio.name
            obj.image = data.djRadio.picUrl
            obj.nicekName = data.djRadio.dj.nickname
            obj.id = data.djRadio.id
        },
        '13'() {    //歌单
            obj.name = data.playlist.name,
                obj.image = data.playlist.coverImgUrl,
                obj.nicekName = data.playlist.creator.nickname,
                obj.id = data.playlist.id
        },

        '21'() {    //mv
            obj.id = data.mv.id,
                obj.image = data.mv.imgurl16v9
            obj['playCount'] = data.mv.playCount
        }

    }
    strategy[type] ? strategy[type]() : ''
    return obj
}
</script>

<style  scoped>
.indexContainer {
    height: calc(100vh - 140px);
    width: 100vw;
    overflow: scroll;
    position: relative;
    /* background-color: #fff; */
    padding-bottom: 90px;
}
</style>