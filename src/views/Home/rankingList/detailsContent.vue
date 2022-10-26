<template>
  <!-- 排行榜，榜单详情内容 -->


  <img class="image" :src="data?.coverImgUrl" alt="" />
  <div  class="container1">
    <Loading v-show="loadingShow"></Loading>
     <div v-show="!loadingShow" class="scoll">
    <DetailsComponent :id="id"  v-model="scs" v-if="data" @imageLoad="controlLoad" name="排行榜" :details="data"></DetailsComponent>
    <SongTable table v-if="songDate" :id="id" v-model="songDate" class="table"></SongTable>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onActivated } from "vue"

import networkRequest from "@/network/index.ts"
import { useRoute } from "vue-router"
import type { Object } from "../ts/sheet/details"
import type { RootObject } from "../ts/rankingList/details"
import { controlLoad, loadingShow } from "@/hooks/controlLoading.ts"   //控制loading

import DetailsComponent from "@/components/detailsComponent.vue"
import Scroll from "@/components/scroll.vue"
import Loading from "@/components/loading.vue"
const route = useRoute()

// let isShow=ref(true)

//每次进入组件获取详情信息
let data = ref<Object>()
let songDate = ref<RootObject[]>([])
let id = ref<string>('')
  //收藏状态
let scs=ref(false)
onActivated(() => {
  let newID = route.query.id as string
  if (id.value == newID) {    //判断用户是否连续进入同一个歌单
    loadingShow.value = false
    return
  }
  //每次进入先打开loading
  loadingShow.value = true
  id.value = (route.query.id as string)
  let url = '/playlist/detail?id=' + id.value
  networkRequest('request', url, function (res: any) {
    console.log(res.data.playlist.subscribed);
    
    scs.value=res.data.playlist.subscribed
    //格式化，提取出需要的数据。ts类型里面有注释分别介绍了每个属性的作用
    data.value = {
      detailsName: res.data.playlist.name,
      avatarUrl: res.data.playlist.creator.avatarUrl,
      description: res.data.playlist.description,
      coverImgUrl: res.data.playlist.coverImgUrl,
      nickname: res.data.playlist.creator.nickname,
      subscribedCount: res.data.playlist.subscribedCount,
      commentCount: res.data.playlist.commentCount,
      shareCount: res.data.playlist.shareCount,
      time: res.data.playlist.updateTime
    }
    loadingShow.value = false
    songDate.value = res.data.playlist.tracks.slice(0,25)
  })
})

//如果加载完毕则关闭loading
// const imageLoad=(e:any)=>{
//   isShow.value=!e
// }
</script>

<style  scoped>
.container1 {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.scoll {
  margin-top: 50px;
  flex: 1;
  overflow: scroll;

  z-index: 10;
}


.image {
  width: 100vw;
  aspect-ratio: 3/2.5;
  overflow: hidden;
  object-fit: cover;
  z-index: 1;
  position: absolute;
  z-index: 1;
  top: 0px;
  background-size: 100%;
  filter: blur(90px);
  overflow: hidden;
}

.table {

  min-height:46vh;
  padding: 5px 2vw 40px 2vw;
  margin-top: 15px;
  border-radius: 6vw;
  /* background-color: aliceblue; */
  background-color: #fff;
  padding-bottom: 40px;
}
</style>