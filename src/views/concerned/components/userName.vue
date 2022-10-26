<template>
<!-- 用户分享的具体内容 -->
    <div class="nameContainer flex" >
        <div><img class="userImage" v-lazy="image" alt=""></div>
        <div style="width: 82vw;">
            <div class="flex names">
                <div class="userName">{{name}}</div>
                <div class="col">{{strategy[type]()}}</div>
            </div>
            <div class="time col">{{timeFrom(time)}}</div>
            <div class="text" v-if="text">{{text.replace(/#(\S*)#/,'').replace(/htt(\S*)/,'')}}</div>
            <div class="flex biaop" v-if="bottomActivityInfos?.length!=0">
                <div v-for="items in bottomActivityInfos "># {{items.name}}</div>
            </div>
            <div class="image"  v-if="pics?.length!=0">
                <img v-for="items in pics" v-lazy="items.pcSquareUrl">
            </div>
            <slot name="detils"></slot>
            <div class="flex xs">
                <!-- <div>
                    <van-icon name="good-job"    v-range="{fn:good,index:{like:modelValue}}" v-if="modelValue" color="red" />
                    <van-icon name="good-job-o"    v-range="{fn:good,index:{like:modelValue}}" v-else />
                    {{NumberFormats(count)}}
                </div> -->
                <div v-if="userId"><span @click="deletes">删除</span></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import timeFrom  from "@/hooks/timeFormatting.ts"
import networkRequest from '@/network/index.ts'
import NumberFormats from "@/hooks/NumberFormats.ts";


let data=withDefaults(defineProps<{
    type: number,       //当前动态的类型
    time: number,       
    name: string,           //用户名
    image: string           //用户头像
    text: any,                  //动态文案
    bottomActivityInfos:any,        //动态的标签
    pics:any,           //动态图片
    id:number,          //动态id
    index:number,          //当前动态的下标
    userId:boolean      //查看这个动态是不是该用户发的
    // modelValue:any,
    // count:any
}>(), {
    type: 0,
    time: 0,
    name:'',
    bottomActivityInfos:[],
    pics:[]
})

let strategy: any = {
    '18'() {
        return "分享单曲";
    },
    '19'() {
        return "分享专辑";;
    },
    '17'() {
        return "分享声音";
    },
    '22'() {
        return "转发";
    },
    '39'() {
        return "发布mv";
    },
    '35'() {
        return '';
    },
    '24'() {
        return "分享专栏文章";
    },
    '41'() {
        return "分享mv";
    },
    '36'() {
        return "分享歌手";
    },
    '28'() {
        return "分享电台";
    },
    '13'() {
        return "分享歌单";
    },
    '21'() {
        return "分享mv";
    }
}

//删除动态
const emit=defineEmits(['deletes','update:modelValue','update:count'])
const deletes=()=>{
    networkRequest("request2","/event/del?evId="+data.id,function(res:any){
        emit('deletes',data.index)
    })
}

// //给动态点赞
// const good = (commentObj: any) => {
//     networkRequest('request2', `/comment/like?id=${data.id}&t=${Number(!commentObj.like)}&type=${6}`,
//         function (res: any) {
//         emit('update:modelValue',!commentObj.like)
//         console.log(res);
        
//         })

// }
</script>

<style  scoped>
    .image{
        display: flex;
        flex-wrap: wrap;
    }
    .image img{
        min-width: 30%;
        margin: 1vw;
        aspect-ratio: 1/1;
        flex: 1;
        max-width: 50%;
    }
    .xs{
        justify-content: flex-end;
        margin-top: 4vmin;
        font-size: 4vmin;
    }
    .xs span{
        padding: 0.1vw 1vw;
        color: rgba(185, 185, 185, 0.788);
        border: 0.1px solid rgba(185, 185, 185, 0.788);
    }
    .flex{
        display: flex;
    }
.nameContainer{
    padding: 4vw 2vw;
    width: 96vw;
    background-color: #fff;
    margin-bottom: 2vmin;
   border-bottom: 0.1px solid rgba(219, 218, 218, 0.61);
}
.nameContainer .names{
    align-items:center;
    font-size: 4vmin;
}
.userName{
    font-weight: 600;
    margin-right: 2vmin;
}
.col{
    color: rgb(112, 110, 110);
}
.time{
    font-size: 2vmin;
    margin: 1vmin 0px ;
}
   .text{
    font-size: 4vmin;
    width: 100%;
    margin: 2vmin 0px;
   } 
.userImage{
    width: 10vw;
    aspect-ratio: 1/1;
    margin: 0px 2vmin;
    border-radius: 50%;
}
.biaop{
    font-size: 4vmin;
    color: #0CA2DE;
    margin: 2vmin 0;
}
</style>