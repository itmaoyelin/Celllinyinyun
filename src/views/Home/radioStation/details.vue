<template>
    <div style="height: 100vh; width: 100vw;">
    <Loading  v-show="loadingShow"></Loading>
    <img  class="backimage" :src="details?.coverImgUrl" alt="" />
    <div  class="container1">
        <div class="scoll" v-show="!loadingShow">
        <DetailsComponent :id="id" :details="details" v-model="subed" :fn="collection" name="电台">
            <template #layt>
                <div class="layt">
                    <div v-if="details.secondCategory">{{details.secondCategory}}</div>
                    <div v-if="details.category">{{details.category}}</div>
                </div>
            </template>
            <template #operation>
                <div class="operations" >
                    <div v-range="{fn:share}">
                        <van-icon name="share-o" size="5vw" />
                        <div>{{ NumberFormats(details.shareCount) }}</div><span></span>
                    </div>
                    <div v-if="subed"  v-range="{fn:collection}">
                        <van-icon name="passed" size="5vw" />
                        <div>{{NumberFormats(details.subscribedCount)}}</div><span></span>
                    </div>
                    <div v-else v-range="{fn:collection}" style="background-color: red;">
                        <van-icon name="star" size="5vw" color="#fff" />
                        <div>{{NumberFormats(details.subscribedCount)}}</div><span></span>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="title">
                    {{details.desc}}
                </div>
            </template>
        </DetailsComponent>
        <SongTable class="table" :type="4" v-model="arr"></SongTable>
    </div>
</div></div>
</template>

<script lang="ts" setup>
import { onActivated, ref } from "vue"
import networkRequest from '@/network/index.ts'
import { useRoute,useRouter } from "vue-router"
import type { resData } from "../../../types/radioStation/detalis"
import NumberFormats from "@/hooks/NumberFormats.ts"
import { radioSign } from "@/hooks/dataSign.ts"
import { loadingShow } from "@/hooks/controlLoading.ts"   //控制loading
import {datas,shareShow} from "@/hooks/share.ts";
import SongTable from "../../../components/songTable.vue"
import DetailsComponent from "../../../components/detailsComponent.vue"
import Loading from "../../../components/loading.vue"
let route = useRoute()
let id = ref<number|string>('')       //电台id
let arr: any = ref([])              //电台节目列表
let details = ref()                 //电台详情
let subed = ref<boolean>(false)       //用户是否收藏
onActivated(() => {
    requst()
    loadingShow.value=true
})

const requst = () => {
    id.value = route.query.id as string
    //电台详情数据获取
    networkRequest("request", '/dj/detail?rid=' + id.value +'&date='+Date.now(), function (res: any) {
        subed.value = res.data.data.subed
        let obj = {
            coverImgUrl: res.data.data.picUrl,
            detailsName: res.data.data.name,
            avatarUrl: res.data.data.dj.avatarUrl,
            nickname: res.data.data.dj.nickname,
            time: 0,
            desc:res.data.data.desc,
            subscribedCount:res.data.data.subCount,
            shareCount:res.data.data.shareCount,
            commentCount:res.data.data.commentCount,
            secondCategory: res.data.data.secondCategory,
            category: res.data.data.category
        }
        details.value = obj
    })
    //电台节目列表数据获取
    networkRequest("request", '/dj/program?rid=' + id.value+'&date='+Date.now(), function (res: any) {
        let data: resData = res.data
        //格式化数据，方便传入table组件
        arr.value=[]
        console.log(res);
        
        data.programs.splice(0, 20).forEach((element, index) => {
            let obj = {
                id: element.mainTrackId,
                shareId:element.id,
                name: element.name,
                createTime:element.createTime,
                listenerCount: element.listenerCount,
                al: {
                    picUrl: element.coverUrl
                },
                ar: [{
                    name: element.dj.nickname,
                    id: element.dj.userId
                }],
                image:element.coverUrl
            }
            arr.value.push(obj)
        });
        loadingShow.value=false
    })
}
requst()

//收藏取消电台
const collection = () => {
    radioSign.value=true        //通知用户页，用于收藏了电台
    if (subed.value) {
        //取消收藏
        networkRequest('request2', '/dj/sub?rid=' + id.value+'&t=0', function (res: any) {
            subed.value = false           
        })
    } else {
                //收藏电台
        networkRequest('request2', '/dj/sub?rid=' + id.value+'&t=1', function (res: any) {
            subed.value = true
        })
    }


}

//分享电台
const share=()=>{
    datas.name=details.value.detailsName
    datas.image=details.value.coverImgUrl
    datas.type='song',
    datas.typeTitle='djradio'
    datas.nickeName=details.value.nickname
    shareShow.value=true
    datas.id=id.value
}


</script>

<style  scoped>
.layt {
    display: flex;

}

.layt div {
    background-color: rgba(227, 229, 231, 0.452);
    padding: 0.1vmin 2vmin;
    font-size: 2vmin;
    margin-right: 1vmin;
    border-radius: 1vmin;
}
.operations{
    display: flex;
    width: 100vw;
    position: absolute;
    bottom: 0px;
    z-index: 10;
    justify-content: space-evenly;
}
.operations >div{
    margin: 0px 2vmin;
    flex: 1;
    background-color: rgba(200, 200, 201, 0.555);
    padding: 2vmin 5vmin;
    border-radius: 4vmin;
    justify-content: center;
    display: flex;
    font-size: 4vmin;
    align-items: cc;
    color: #fff;
}
.image {
    width: 20vmin;
    aspect-ratio: 1/1;
}

.scoll{
    overflow: scroll;
    height: calc(100vh - 50px);
    width: 100%;
    margin-top: 50px;
}
.container1 {
    width: 100vw;
    position: absolute;
    height: 100vh;
    z-index: 2;
}

.backimage {
    width: 100vw;
    aspect-ratio: 3/2.5;
    overflow: hidden;
    object-fit: contain;
    z-index: 1;
    position: absolute;
    z-index: 1;
    top: 0px;
    background-size: 100%;
    filter: blur(120px);
    overflow: hidden;
}
.title{
    font-size: 3vmin;
    color: #000;
    margin-top: 2vmin;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: rgb(240, 238, 238);
}
.table {
    min-height: 46vh;
    padding: 5px 2vw 40px 2vw;
    margin-top: 15px;
    border-radius: 6vw;
    position: relative;
    /* background-color: aliceblue; */
    background-color: #fff;
    /* height: 100vh; */
}
</style>