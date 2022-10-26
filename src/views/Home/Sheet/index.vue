<template>
  <!-- 歌单主页 -->
  <Scroll>
    <Loading v-show="loadingShow"></Loading>
    <NavBar v-show="!loadingShow" @nav-click="navClick">
      <template #left>
        <van-icon class="navbar" name="arrow-left" />
      </template>
      <template #rigth>
        <h3 class="h3">
          歌单广场
        </h3>
      </template>
    </NavBar>
    <!-- 上拉加载 -->

    <div style="flex: 1;overflow: scroll; margin-bottom: 40px;">
      <van-list v-show="!loadingShow" v-model:loading="loading" :finished="finished" error-text="请求失败，点击重新加载"
      :finished-text="text" @load="onLoad" loading-text="请稍后">
      <div class="flex" v-if="arr.length != 0">
        <Card  class="image" v-for="item in arr" :id="item.id" :log="false" :image="item.coverImgUrl"
          :title="item.name" :play-count="item.playCount"></Card>
      </div>
    </van-list>
    </div>
  </Scroll>

</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"

import networkRequest from '@/network/index.ts'
import { useRouter } from "vue-router"
import type { RootObject } from '../ts/sheet/index'
import { controlLoad, loadingShow } from "@/hooks/controlLoading.ts"   //控制loading

import Card from '@/components/card.vue'
import NavBar from '@/components/navBar.vue'
import Scroll from '../../../components/scroll.vue'
import Loading from '../../../components/loading.vue'

//上拉加载
const loading = ref<boolean>(false); //  下拉加载中？
const finished = ref<boolean>(false);

const text = ref<string>('拼命加载中！');
const router = useRouter()

//上拉刷新
const onLoad = () => {
  if (sum == 6) {
    finished.value = true
    text.value = '没有数据啦！'
    return
  }

  setTimeout(() => {
    request()
  }, 1000)
}



//数据
let arr = reactive<RootObject[]>([])
let sum = -1
onMounted(() => { request() })
// 获取歌单

//请求数据
const request = () => {


  let encodeStr = encodeURIComponent('全部');
  sum++
  let url = '/top/playlist?limit=15&cat=' + encodeStr + '&offset' + sum + '*15'
  networkRequest('request', url, function (res: any) {
    arr.push(...res.data.playlists)
    loading.value = false
    controlLoad()
  })
}

//页面跳转
const navClick = () => {
  router.push({
    path: '/home'
  })
}
const goDetail = (id: number) => {
  router.push({
    path: '/sheetdetails',
    query: {
      id
    }
  })
}
</script>

<style  scoped>
h3 {
  flex: 1;
  text-align: center;
  margin: 2vmin 0px;
}

.sheet {
  width: 100%;
  padding-bottom: 50px;
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.image {
  width: 30vmin;
  margin: 2vmin 0px;

}
</style>