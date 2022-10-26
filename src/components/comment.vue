<template>
    <loading v-show="loadingShow"></loading>
    <div v-show="!loadingShow" class="commenttex">
        <van-list v-model:loading="loading" :finished="finished" error-text="请求失败，点击重新加载" :finished-text="text"
            @load="onLoad" loading-text="请稍后">
            <div v-for="(item, index) in comments" :key="index" class="comment">
                <div class="flex">
                    <img class="avatarUrl" v-lazy="item.user.avatarUrl" alt="">
                    <div class="user">
                        <div>{{ item.user.nickname }}</div>
                        <span>{{ time(item.time) }}</span>
                    </div>
                    <!-- 点赞 -->
                    <div class="good">
                        <div v-if="item.likedCount != 0">{{ item.likedCount }}</div>
                        <van-icon name="good-job" v-if="item.liked"
                            v-range="{ fn: good, index: { id: item.commentId, index ,like:item.liked,comments} }"
                            color="red" size="4vmin" />
                        <van-icon name="good-job-o" v-else
                            v-range="{ fn: good, index: { id: item.commentId, index,like:item.liked,comments } }"
                            size="4vmin" />

                    </div>
                </div>
                <div class="content" @click.stop="setInput({commentId:item.commentId,nickname:item.user.nickname})"> {{
                item.content }}</div>
                <div class="more" @click.stop="setShow(item.commentId)" v-if="item.showFloorComment.showReplyCount">{{
                item.showFloorComment.replyCount
                }}条回复
                    <van-icon name="arrow" color="#4B4BFF" size="2vmin" />
                </div>
                <div class="content ca" style=""></div>
            </div>
        </van-list>
        <!-- 全部回复列表 -->
        <van-action-sheet title="回复" v-model:show="show" bc duration="0.2" @open="open">
            <div class="commentBep">
                <loading v-show="reqlyLoad"></loading>
                <div v-show="!reqlyLoad">
                    <div v-for="(item, index) in parentComment" :key="index" class="comment">
                        <div class="flex">
                            <img class="avatarUrl" v-lazy="item.user.avatarUrl" alt="">
                            <div class="user">
                                <div>{{ item.user.nickname }}</div>
                                <span>{{ time(item.time) }}</span>
                            </div>
                            <!-- 点赞 -->
                            <div class="good">
                                <div v-if="item.likedCount != 0">{{ item.likedCount }}</div>
                                <van-icon name="good-job" v-if="item.liked"
                                    v-range="{ fn: good, index: { id: item.commentId, index ,like:item.liked,comments:parentComment} }"
                                    color="red" size="4vmin" />
                                <van-icon name="good-job-o" v-else
                                    v-range="{ fn: good, index: { id: item.commentId, index,like:item.liked,comments:parentComment } }"
                                    size="4vmin" />
                            </div>
                        </div>
                        <div class="content"
                            @click.stop="setInput({commentId:item.commentId,nickname:item.user.nickname})">
                            {{ item.content }}</div>
                        <!-- 回复的人 -->
                        <div class="beReplied" v-if="item.beReplied[0].beRepliedCommentId != commentId">
                            @{{ item.beReplied[0].user.nickname }}:
                            <span>{{ item.beReplied[0].content }}</span>
                        </div>

                    </div>
                </div>
            </div>

        </van-action-sheet>

    </div>
    <div class="pls">
        <input ref="inputDom" type="text" @blur="restore" name="" v-model="inputText" :placeholder="inputPlaceholder">
        <div v-range="{fn:toComment}">{{buttonText}}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from "vue"
import type { parentComments } from "../types/comment/parentComment"
import type { Comment } from "../types/comment/index"
import networkRequest from '@/network/index.ts'
import { controlLoad, loadingShow } from "@/hooks/controlLoading.ts"   //控制loading
import { Notify,Toast } from 'vant'
import 'vant/es/notify/style';
import 'vant/es/toast/style';
import Loading from './loading.vue'

interface comment {
    id: number | string
    type: string | number,
}
let data = defineProps<comment>()



//给予评论
interface reply{
    nickname:string,
    commentId:string|number
}
let inputDom=ref<HTMLElement>()     //获取inputdom
let inputPlaceholder=ref<string>('你的评论就是全场')        //评论提示
let inputText=ref<string>('')       //评论内容
let replyId=ref<string|number>('')      //回复评论的id
let buttonText=ref<string>('发送')
//回复评论时
const setInput=(obj:reply)=>{
        inputDom.value?.focus()
        inputPlaceholder.value='回复：'+obj.nickname
        replyId.value=obj.commentId
        buttonText.value='回复'
    }
    
    //发送评论
const toComment=()=>{
    //判断评论是不是回复评论
    let url,t
    if(replyId.value!=''){
        url=`&commentId=${replyId.value}`
        t=2
    }else{
        url=''
        t=1
    }
    //打开轻提示
    Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0,
            });
    inputDom.value?.blur()
    //发送评论请求
    networkRequest("request2",`/comment?t=${t}&type=${data.type}&id=${data.id+url}&content=${inputText.value}`).then((res:any)=>{
      setTimeout(()=>{
        sum=0
        //当评论后重新请求数据刷新页面
        requset(true).then(()=>{
            Toast.clear();      //关闭加载中
            inputText.value=''
            restore()
        if(res.data.code==200){
                // 成功通知
        Notify({ type: 'success', message: '评论成功' });
        }else if(res.data.code==250){
            Notify({ type: 'danger', message: res.data.data.dialog.subtitle }); //发送过于频繁
            return
        }else{
            Notify({ type: 'warning',message: '评论失败' });
            return
        }
             })  
        },1000)
    })
}
//表单失去焦点时，数据回到初始值
const restore=()=>{
if(inputText.value!='')
    return
inputPlaceholder.value='你的评论就是全场'
replyId.value=''
buttonText.value='发送'
}




//评论数据
let comments = reactive<Comment[]>([])
//获取最后一个评论的时间戳
let cursorTime = computed(() => {
    return comments.length != 0 ? '&cursor=' + comments[comments.length - 1].time : ''
})
//获取评论数据
const requset = (theSplice:boolean=false) => {
    sum++
 return   networkRequest('request', `/comment/new?type=${data.type}&id=${data.id}&sortType=3${cursorTime.value}&pageSize=20&pageNo=${sum}&date=${Date.now()}`)
    .then((res:any)=>{
        console.log(res);
        
        if(theSplice)           //如果为ture证明用户在评论，所以需要重新获取数据
        comments.splice(0,comments.length)
            comments.push(...res.data.data.comments)
            loading.value = false       //关闭下拉加载
            controlLoad(false)     
        })
}
onMounted(() => {
    controlLoad(true)
    requset()
})

//时间格式化
let time = computed(() => {
    return function (time: number) {
        var date = new Date(time);
        var date2 = new Date();
        var Y = date.getFullYear()
        var M = date.getMonth() + 1;
        var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        //获取当前的时间
        var M2 = date2.getMonth() + 1;
        var D1 = date2.getDate();
        //判断是否大于10
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        var f = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        //判读是否是当天
        return M2 == M && D == D1
            ? h + ":" + f
            : Y + "年" + M +
            "月" +
            D +
            "日" +
            " " +
            h +
            ":" + f
            ;
    }
})

//下拉更新
const loading = ref<boolean>(false); //  下拉加载中？
const finished = ref<boolean>(false);
const text = ref<string>('拼命加载中！');
let sum = 0
//上拉刷新
const onLoad = () => {
    //当获取到的数量小于本预期数量时那么就证明没有评论了
    if (comments.length < (sum - 1) * 20 && sum != 0) {
        console.log(comments.length < sum * 20);
        finished.value = true
        text.value = '我也是有底线的！'
        return
    }

    setTimeout(() => {
        requset()
    }, 1000)
}


//查看评论回复
const show = ref(false);
let commentId = ref<number>(0)

let reqlyLoad = ref<boolean>(true)
//打开全部回复面板
const setShow = (id: number) => {
    reqlyLoad.value = true      //打开load
    commentId.value = id
    show.value = true             //打开全部回复
}
let parentComment = ref<parentComments[]>()
//当打开全部回复时触发的事件
const open = () => {
    networkRequest('request', `/comment/floor?parentCommentId=${commentId.value}&id=${data.id}&type=${data.type}&date=${Date.now()}`,
        function (res: any) {
            parentComment.value = res.data.data.comments
            reqlyLoad.value = false
        })
}

//给评论点赞
const good = (commentObj: any) => {
    networkRequest('request2', `/comment/like?id=${data.id}&cid=${commentObj.id}&t=${Number(!commentObj.like)}&type=${data.type}`,
        function (res: any) {
            console.log(commentObj.comments);
            
                commentObj.like?commentObj.comments[commentObj.index].likedCount--: commentObj.comments[commentObj.index].likedCount++
                commentObj.comments[commentObj.index].liked=!commentObj.comments[commentObj.index].liked
        })

}
</script>

<style  scoped>
.pls {
    position: fixed;
    bottom: 0px;
    width: 96vw;
    background-color: #fff;
    z-index: 9999;
    height: 40px;
    padding: 2vw;
    display: flex;
    align-items: center;
    border-top: 0.2px solid rgb(224, 224, 224);
}

.pls div {
    padding: 5px 20px;
    background-color: #24ACF2;
    margin: 0px 2vmin;
    color: #fff;
    border-radius: 20px;
}

.pls input {
    flex: 1;
    padding-left: 4vmin;
    margin-left: 3vmin;
    font-size: 3vmin;
    border: 0px;
    background-color: #d6d6d69d;
    height: 30px;
    border-radius: 20px;
}

.length {
    margin-bottom: 2vmin;
    font-weight: 600;
}

.commenttex {
    padding: 5vw 5vw;
    width: 90vw;
    background-color: #fff;
    position: absolute;
    top: 0px;
    height: 100%;
    overflow: scroll;
}

.avatarUrl {
    width: 12vmin;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.content {
    margin-left: 14vmin;
}

.comment {
    width: 100%;
    margin-bottom: 4vmin;
}

.user {
    flex: 1;
    height: 12vmin;
    color: rgb(156, 156, 156);
    margin-left: 2vmin;
}

.user div {
    font-size: 4vmin;
}

.user span {
    font-size: 1vmin;
}

.flex {
    align-items: center;
    justify-content: space-between;
    display: flex;
    width: 100%;
}

.ca {
    height: 0.1vw;
    background-color: rgb(219, 219, 219);
    margin-top: 4vw;
}

.more {
    font-size: 2vmin;
    margin-left: 14vmin;
    color: rgb(75, 75, 255);
    margin-top: 2vmin;
}

.beReplied {
    margin-left: 14vmin;
    border-left: 1vmin solid rgb(187, 187, 187);
    padding-left: 2vmin;
    color: rgb(111, 111, 199);
    font-size: 3vmin;
}

.beReplied span {
    color: rgb(156, 156, 156);
}

.good {
    display: flex;
    color: #9C9C9C;
    font-size: 3.5vmin;
}

.commentBep {
    width: 90vw;
    overflow: scroll;
    padding: 5vw;
    min-height: 70vmin;
}
</style>