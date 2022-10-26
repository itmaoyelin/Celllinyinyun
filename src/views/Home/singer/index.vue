<template>
  <!-- 歌手主页 -->


  <Scroll>

    <NavBar @nav-click="navClick">
      <template #left>
        <van-icon class="navbar" name="arrow-left" />
      </template>
      <template #rigth>
        <h3 class="h3">
          歌手
        </h3>
      </template>
    </NavBar>

    <!-- 歌手筛选导航栏 -->
    <div v-show="isShow" class="screen top2">
      <div class="flex">
        <div v-for="(item, index) in navArr" @click="setActiv(index, true)" :class="{ color: activ == index }"
          :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="flex">
        <div v-for="(item, index) in navArr2" @click="setActiv(index, false)" :class="{ color: activ2 == index }"
          :key="index">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div v-show="!isShow" class="screen top">
      <div>全部歌手</div>
      <div @click.prevent="setShow">
        <van-icon name="filter-o" />筛选
      </div>
    </div>



    <!-- 歌手展示列表 -->
    <div class="container1">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-if="singerData.length != 0" @touchmove="register" style="width:100vw ;" ref="singer">
          <div class="flex2" v-for="(item, index) in singerData">
            <img v-lazy="item.img1v1Url" @click="godetails(item.id)" />

            <div class="title">
              <span>{{ item.name }}</span><span class="icon" v-if="item.accountId"></span>
            </div>
            <div class="option" v-if="!item.followed" v-range:index.index="{ fn: follow, index }">
              + 关注
            </div>
            <div v-else class="option2" v-range:index.index="{ fn: follow, index }">
              <van-icon name="success" /> 已关注
            </div>
          </div>
        </div>
      </van-list>
    </div>

  </Scroll>

</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import {singerSign} from "../../../hooks/dataSign"
import networkRequest from '@/network/index.ts'
import type { RootObject } from "./type";

import NavBar from "@/components/navBar.vue";
import Scroll from "../../../components/scroll.vue";

const router = useRouter()
//顶部导航栏逻辑
//导航栏数据
const navArr = [
  { name: "华语", area: 7 },
  { name: "欧美", area: 96 },
  { name: "日本", area: 8 },
  { name: "韩国", area: 16 },
  { name: "其他", area: 0 },
]
const navArr2 = [
  { title: '男' },
  { title: '女' },
  { title: '乐队/组合' }
]


//活跃的导航栏
let activ = ref<number>(0)
let activ2 = ref<number>(0)
//改变活跃
const setActiv = (index: number, choie: boolean) => {
  if (activ.value == index && choie)
    return
  if (activ2.value == index && !choie)
    return
  choie ? activ.value = index : activ2.value = index
  //点击导航栏后重新计数
  singerData.splice(0)
  length.value = 0
  finished.value = false
  request()
}

//歌手数据
let singerData = reactive<RootObject[]>([])
//记录数据长度
let length = ref<number>(0)
const request = () => {
  let url = `/artist/list?type=${activ2.value + 1}&area=${navArr[activ.value].area}&initial=-1&limit=10&offset=${length.value * 10}&date=${new Date()}`
  networkRequest('request', url, function (res: any) {
    singerData.push(...res.data.artists)
    length.value++
    loading.value = false //请求成功取消加载
  })
}


//上拉加载更多
const loading = ref(false); //  上拉加载中？
const finished = ref(false);
const onLoad = () => {
  if (length.value == 6) {
    finished.value = true
    return
  }
  request()
}


//筛选导航栏显示隐藏逻辑
let isShow = ref(true)
const register = () => {
  isShow.value = false

}

//显示筛选导航栏
const setShow = () => {
  isShow.value = true
}

//路由跳转
//返回首页
const navClick = () => {
  router.push({
    path: '/home'
  })
}
const godetails = (id: number) => {
  router.push({
    path: '/singerdetails',
    query: {
      id,

    }
  })
}

//关注歌手
const follow = (index: number) => {
 
  if (singerData[index].followed) {
    networkRequest('request2', '/artist/sub?id=' + singerData[index].id + '&t=2', function (res: any) {
      singerData[index].followed = false
      singerSign.value=true    //通知用户页改变数据
    })
  } else {
    networkRequest('request2', '/artist/sub?id=' + singerData[index].id + '&t=1', function (res: any) {
      singerData[index].followed = true
      singerSign.value=true    //通知用户页改变数据
    })
  }
}
</script>

<style  scoped>
.Hot {
  background-color: #f0f0f0;
  padding: 3px 3vmin;
  box-sizing: border-box;
  width: 100%;
  font-size: 2vmin;

}


.screen {
  z-index: 200;
  width: 100vw;
  top: 50px;
}

.top {

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vmin 3vmin;
  font-size: 3vmin;
  overflow: hidden;
  color: rgb(156, 156, 156);
  box-sizing: border-box;
  height: 40px;
}

.flex {
  display: flex;
  justify-content: space-around;
  color: rgb(126, 126, 126);
  font-size: 3.5vmin;
  padding-bottom: 2vmin;
}

.color {
  color: red;
}

img {
  width: 14vmin;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-right: 2vmin;
}

h3 {
  flex: 1;
  text-align: center;
  margin: 2vmin 0px;
}

.flex2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
  padding: 0px 3vmin;
}

.container1 {
  flex: 1;
  overflow: scroll;
  margin-bottom: 40px;
}

.title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;

}

.option {
  padding: 2px 5px;
  width: 60px;
  border: 1px solid red;
  font-size: 16px;
  text-align: center;
  color: red;
  line-height: 20px;
  height: 20px;
  border-radius: 20px;
}

.option2 {
  padding: 2px 5px;
  width: 60px;
  border: 1px solid rgb(145, 145, 145);
  font-size: 1px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: rgb(145, 145, 145);
  border-radius: 20px;
}

.icon {
  background-image: url(@/assets/image/精灵图4.png);
  width: 17px;
  height: 17px;
  background-position: 0 -740px;
  margin-left: 5px;
}

.flex2:nth-child(1) {
  margin-top: 0px;
}
</style>