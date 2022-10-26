<template>
    <!-- 用户的历史评论 -->
    <div class="commen">
        <NavBar>
            <template #left>
                <van-icon @click="router.go(-1)" class="navbar" name="arrow-left" />
            </template>
            <template #rigth>
                <div class="navtext">
                    评论
                </div>
            </template>
        </NavBar>
        <div class="container" v-if="comments.length!=0">
            <div class="dtails" v-for="(item,index) in comments" :key="index">
                <div class="source">
                    <img :src="source(item.resourceInfo).coverImgUrl" alt="">
                    <div class="tex">{{source(item.resourceInfo).name}}</div>
                </div>
                <div class="content tex">{{item.content}}</div>
                <div class="time">
                   {{ timeFrom(item.time)}}
                </div>
            </div>
        </div>
        <div v-else class="container fs">
            还没有评论，快去评论吧!
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onActivated,computed } from "vue"
import networkRequest from '@/network/index.ts'
import { useRoute,useRouter } from "vue-router";
import timeFrom from "../../hooks/timeFormatting"
import type { Comment } from "../../types/userPage/comment";
import NavBar from '../../components/navBar.vue'

let route = useRoute()
let router=useRouter()
let comments=ref<Comment[]>([])
onActivated(() => {
    networkRequest('request2', '/user/comment/history?uid=' + route.query.id, function (res: any) {
        comments.value=res.data.data.comments
    })
})
let source=(resourceInfo:any)=>{
   return JSON.parse(resourceInfo)
}

</script>

<style  scoped>
.navtext {
    flex: 1;
    text-align: center;
    margin: 2vmin 0px;
    font-size: 5vmin;
    font-weight: 600;
}
.commen{
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
}
img{
    width: 7vmin;
    aspect-ratio: 1/1;
    border-radius: 1vmin;
}
.container{
    flex: 1;
    margin-bottom: 40px;
    overflow: scroll;
}
.fs{
    font-size: 7vmin;
    font-weight: 6000;
    margin-top: 4vmin;
}
.dtails{
    margin: 0px 2vmin;
    padding: 5vmin 0px;
    display: flex;
    border-bottom: 0.5px solid rgb(182, 182, 182);
    flex-wrap: wrap;
}
.source{
    display: flex;
    width: 100%;
}

.source div{
    margin-left: 2vmin;
    font-size: 2vmin;
    align-self: center;
    flex: 1;
    color: rgb(94, 94, 94);
}
.content{
    font-size: 4vmin;
    margin: 2vmin 0px;
    width: 100%;
}
.time{
    font-size:2vmin ;
    color: rgb(94, 94, 94);
    width: 100%;
}
.tex{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>