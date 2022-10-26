<template>
    <!-- 用户分享的具体资源 -->
    <div class="content" v-if="obj.id&&type!=21">
        <div class="image" @click="go">
            <img v-lazy="obj.image" alt="">
            <van-icon v-if="type==17||type==18" name="play" class="xs" />
        </div>
        <div>
            <div class="w ys">
                <span v-if="type==13">歌单</span>
                <span v-else-if="type==28">推荐</span>
                {{obj.name}}
            </div>
            <div class="w">
                <span v-if="type==13||type==28">by </span>
                {{obj.nicekName}}
            </div>
        </div>
    </div>
    <!-- mv -->
    <div class="mv" v-if="type==21" @click="playMV(obj.id,$event)">
        <img v-lazy="obj.image" alt="">
        <span>
            <van-icon name="play" />{{NumberFormats(obj.playCount)}}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { setxy, mvid } from "@/hooks/mvDetails.ts"
import { useSong } from "@/stores/songPlay.ts"
import NumberFormats from "@/hooks/NumberFormats.ts";
import { useRouter } from "vue-router"
let data = withDefaults(defineProps<{
    type: number,       //当前组件的类型，21为歌单具体可以查看index文件下的注释
    obj: any,
    a: any
}>(), {
    type: 0,
    obj: {
        name: '',
        image: '',
        nicekName: '',
        id: 0
    }
})
const playMV = (id: number | string, e: any) => {
    setxy(e.clientX, e.clientY)
    mvid.value = id
}
const router = useRouter()
const go = () => {
    let strategy: any = {
        '18'() {        //单曲
            let ar = {
                name: data.obj.nicekName
            }
            storeSong.setPlaySong(data.obj.id, -1, data.obj.name, data.obj.image, ar, 0)
        },
        '17'() {        //声音
            let ar = {
                name: data.obj.nicekName
            }
            storeSong.setPlaySong(data.obj.id, -1, data.obj.name, data.obj.image, ar, 0, 4)
        },
        '35'() {        //普通动态，非分享
            return "";
        },
        '28'() {        //电台
            router.push({
                path: "/radidetalis",
                query: {
                    id: data.obj.id
                }
            })
        },
        '13'() {    //歌单
            router.push({
                path: "/sheetdetails",
                query: {
                    id: data.obj.id
                }
            })
        }
    }
    strategy[data.type]()

}
let storeSong = useSong()

</script>

<style  scoped>
.mv {
    object-fit: contain;
    position: relative;
}

.mv span {
    bottom: 2vw;
    left: 0px;
    position: absolute;
    color: #fff;
    font-size: 4vmin;
}

.content {
    display: flex;
    align-items: center;
    width: 96%;
    background-color: rgba(236, 235, 235, 0.829);
    padding: 2%;
    border-radius: 2vw;
}

.w {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ys span {
    font-size: 2vmin;
    display: inline-block;
    transform: scale(0.75);
    color: red;
    border: 0.1px solid red;
    padding: 0.2vmin 1vmin;
    margin-left: 0px;
}

.w:nth-child(1) {
    font-size: 4vmin;
}

.w:nth-child(2) {
    font-size: 2vmin;
    color: rgb(141, 140, 140);
}

.content>div {
    margin-left: 2vmin;
    width: calc(100% - 10vw - 2vmin);
}

.content .image {
    width: 10vw;
    height: 10vw;
    position: relative;
}

img {
    width: 100%;
    height: 100%;
}

.xs {
    position: absolute;
    font-size: 7vmin;
    color: rgba(255, 255, 255, 0.856);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}
</style>