<template>
    <!-- 歌曲列表封装 -->
    <div class="modelValue" v-if="modelValue&&modelValue.length!=0">
        <div class="container" v-for="(item, index) in modelValue" :key="index">
            <!-- 用于判断是否是电台页面在使用 -->
            <img v-if="item.image" v-lazy="item.image" alt="" class="images">
            <div class="index" v-else>{{ index + 1 }}</div>

            <div class="central" @click="play(item.id, index, item.name, item.al.picUrl, item.ar[0],item.fee,item.shareId)">
                <div>{{ item.name }}</div>
                <!-- 用于判断是否是电台页面在使用 -->
                <div v-if="item.listenerCount" class="name">
                    <div style="margin-left: 2vmin;">
                        <van-icon name="play-circle-o" />{{item.listenerCount}}
                    </div>
                </div>
                <div class="name" v-else>
                    <span v-if="item.fee==1" class="vip">vip</span>
                    <span>{{ item.ar[0].name }}</span>
                    <span> - {{ item.al.name }}</span>
                </div>
            </div>
            <div class="icon">
                <van-icon color="rgb(95, 95, 95)" v-if="item.mv != 0&&!item.listenerCount"
                    @click="playMv(item.id,item.mv,$event)" name="play-circle-o" />
                <van-icon color="rgb(95, 95, 95)" class="more" name="ellipsis" @click="setShow(index)" />
            </div>
        </div>
        <van-action-sheet v-model:show="show" v-if="modelValue.length!=0">
            <div style="z-index: 10000;" class="songs">
                <div class="names">
                    {{ modelValue[index].name }}
                </div>
                <div class="ops">
                    <div
                        @click="play(modelValue[index].id, index, modelValue[index].name, modelValue[index].al.picUrl, modelValue[index].ar[0],modelValue[index].fee)">
                        <van-icon name="play-circle-o" /> 播放歌曲
                    </div>
                    <div v-if="!modelValue[index].listenerCount">
                        <van-icon name="chat-o" /> 评论
                    </div>
                    <div v-range="{fn:share}">
                        <van-icon name="share-o" /> 分享
                    </div>
                    <div v-range="{fn:deletes}" v-if="route.query.user">
                        <van-icon name="close" /> 删除
                    </div>
                    <div v-range="{fn:deletes}" v-if="!modelValue[index].listenerCount&&!route.query.user">
                        <van-icon name="like-o" /> 喜欢
                    </div>
                </div>
            </div>
        </van-action-sheet>
    </div>
    <div class="modelValue" v-else>
        <h3 style="text-align: center;">
            暂时没有歌曲哦
        </h3>

    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import type { Track } from "../views/Home/ts/sheet/details"
import { useSong } from "@/stores/songPlay.ts"
import networkRequest from '@/network/index.ts'
import { useRoute } from "vue-router"
import { Dialog, Toast } from 'vant';
import { setxy, mvid } from "@/hooks/mvDetails.ts"
import { datas, shareShow } from "@/hooks/share.ts";
import 'vant/es/dialog/style';
import 'vant/es/toast/style';
const route = useRoute()
let data = defineProps<{
    modelValue: Track[],
    id?: number | string,
    type?: number
}>()


//播放歌曲
const storeSong = useSong()
const play = (id: number | string, index: number, name: string, image: string, ar: object, fee: number,djid?:number) => {
    //初始化歌单列表
    storeSong.Initialize(data.modelValue, false || data.id)
    storeSong.setPlaySong(id, index, name, image, ar, fee, data.type || 2,djid)

}
const playMv = (songId: number, mvids: number, e: any) => {
    networkRequest("request2", "/mlog/music/rcmd?songid=" + songId + '&mvid=' + mvids, function (res: any) {
        setxy(e.clientX, e.clientY)
        mvid.value = res.data.data.feeds[0].id
    })

}
let show = ref<boolean>(false)
let index = ref(0)
//点击歌曲跟多操作，弹出功能层
const setShow = (indexs: number) => {
    show.value = true
    index.value = indexs
}
//删除音乐
const deletes = () => {
    if (route.query.user) {
        Dialog.confirm({
            title: data.modelValue[index.value].name,
            message:
                '确定要删除该歌曲吗',
        })
            .then(() => {       //取消喜欢

                networkRequest("request2", "/like?id=" + data.modelValue[index.value].id + '&like=' + false, function (res: any) {
                    show.value = false
                    data.modelValue.splice(index.value, 1)
                    Toast({
                        message: '删除成功',
                        icon: 'close',
                    });
                })
            })
            .catch(() => {
            });
    } else {
        networkRequest("request2", "/like?id=" + data.modelValue[index.value].id + '&like=' + true, function (res: any) {
            show.value = false
            Toast({
                message: '喜欢成功',
                icon: 'like-o',
            });
        })
    }


}
//分享音乐
const share = () => {
    datas.name = data.modelValue[index.value].name
    datas.image = data.modelValue[index.value].al.picUrl
    datas.nickeName = data.modelValue[index.value].ar[0].name
    shareShow.value = true
    show.value = false

    //type==4证明分享的是电台节目
    if (data.type == 4) {
        datas.type = 'djprogram',
            datas.typeTitle = '声音'
        datas.id = data.modelValue[index.value].shareId
    } else {
        datas.type = 'song',
            datas.typeTitle = '单曲'
        datas.id = data.modelValue[index.value].id
    }
}
</script>

<style  scoped>
.ops div {
    margin: 2vmin 0px;
}

.more {
    transform: rotate(90deg);
    margin-left: 3vw;
}

.icon {
    font-size: 5vw;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
    flex: 1;
}

.index {
    font-size: 5vw;
    width: 5vw;
    color: rgb(170, 170, 170);
}

.central {
    flex: 1;
    margin-left: 3vw;
}

.central div:nth-child(1),
.name {
    max-width: 70vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    display: flex;
    align-items: center;
    font-size: 3vw;
    color: rgb(95, 95, 95);
}

.songs {
    width: 96%;
    padding: 2vw 2vw;
    padding-bottom: 40px;

}

.songs .names {
    width: 96%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 6vmin;
    border-bottom: 0.5px solid rgba(194, 194, 194, 0.596);
}

.songs div {
    padding: 2vmin;
    font-size: 5vmin;
    width: 96%;
}

.vip {
    border: 0.2px solid red;
    padding: 0.1vmin 2vmin;
    border-radius: 1vmin;
    color: red;
    margin-right: 2vmin;
    line-height: 3vmin;
    display: block;
}

.images {
    width: 10vmin;
    aspect-ratio: 1/1;
}
</style>