<template>
  <!-- 歌单详情页 -->
<div style="height: 100vh; width: 100vw;">
    <Loading v-show="loadingShow"></Loading>
  <img class="image" :src="details?.coverImgUrl" alt="" />
  <div class="container1">
    
     <div v-show="!loadingShow" class="scoll">
      <DetailsComponent v-model="scs" :id="id" v-if="details" :details="obj"  name="歌单">
      </DetailsComponent>
      <SongTable class="table" v-if="details" :id="id" v-model="songList"></SongTable>
    </div>

  </div>
</div>

</template>

<script lang="ts" setup>
import { ref, onActivated } from "vue"

import type { RootObject, Object } from "../ts/sheet/details"
import { useRoute } from "vue-router";
import networkRequest from '@/network/index.ts'
import { loadingShow } from "@/hooks/controlLoading.ts"   //控制loading

import DetailsComponent from "@/components/detailsComponent.vue"
import SongTable from "../../../components/songTable.vue"

import Loading from "../../../components/loading.vue"

const route = useRoute()


//获取到路由传递过来的歌单id,并请求歌单数据
let id = ref<string>('')
let details = ref<RootObject>()
let obj = ref<Object>()   //传递给子组件展示的数据
onActivated(() => {
  let newID = route.query.id as string
  if (id.value == newID) {    //判断用户是否连续进入同一个歌单
    loadingShow.value = false
    return
  }

  id.value = route.query.id as string
  loadingShow.value = true
  request()
})
let songList=ref()
//收藏状态
let scs=ref(false)
//获取歌单数据
let request = () => {
  let url = '/playlist/detail?id=' + id.value+'&data='+new Date()
  networkRequest('request', url, function (res: any) {
    details.value = res.data.playlist
    songList.value=res.data.playlist.tracks.splice(0,25)
    scs.value=res.data.playlist.subscribed
    //格式化
    obj.value = {
      detailsName: details.value!.name,
      avatarUrl: details.value!.creator.avatarUrl,
      description: details.value!.description,
      coverImgUrl: details.value!.coverImgUrl,
      nickname: details.value!.creator.nickname,
      subscribedCount: details.value!.subscribedCount, //收藏数量
      commentCount: details.value!.commentCount,   //评论数量
      shareCount: details.value!.shareCount,   //分享数量
    }
    loadingShow.value=false
  })
}


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
  position: relative;
  /* background-color: aliceblue; */
  background-color: #fff;
  /* height: 100vh; */
}
</style>