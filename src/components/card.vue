<template>

    <!-- 歌单、视频卡片 -->
    <div class="connt"  @click="goRouter(id,log)">
        <img v-if="log" v-lazy="image" alt="">
        <img v-else v-lazy="image" />
        <div class="text">{{ title }}</div>
        <div class="inco">
            <van-icon name="play" color="#ffff" />{{ playCount1(playCount) }}
        </div>
    </div>



</template>

<script lang="ts" setup>
import playCount1 from "@/hooks/NumberFormats.ts"
import { useRouter } from "vue-router"

const router=useRouter()
withDefaults(defineProps<{
    title: string,
    image?: string
    playCount: number,
    id?:number|string
    log: boolean            //视频的为true歌单为false
}>(),{
    title:'',
    playCount:0,
    id:0,
    log:false
})

//跳转到歌单页面&视频页
const goRouter = (id: number|string,log:boolean) => {
if(!log){
    //歌单页
      router.push({
    path: '/sheetdetails',
    query: {
      id
    }
  })
}else{
    //视频页
}
}
</script>

<style  scoped>
.inco {
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 5px;
    padding: 0.5vmin 1vmin;
    background-color: rgba(109, 109, 109, 0.363);
    color: #fff;
    font-size: 1vmin;

}

.connt {
    position: relative;
}

.connt>.text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 2vmin;
}

.connt>img,.imgaa {
    border-radius: 7px;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    background-color: rgba(209, 209, 209, 0.616);
}
</style>