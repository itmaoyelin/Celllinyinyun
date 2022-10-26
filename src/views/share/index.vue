<template>
    <!-- 分享弹窗 -->
    <transition name="shares">
        <div class="share" v-if="shareShow">
            <div class="nav">
                <div @click="shareShow=false">取消</div>
                <div>分享</div>
                <div  v-range="{fn:share}">发布</div>
            </div>
            <van-cell-group inset>
                <van-field v-model="value" type="textarea" rows="2" :autosize="{ maxHeight: 150}" maxlength="60"
                    show-word-limit autocomplete="off" placeholder="说点什么吧" />
            </van-cell-group>
            <div class="detils">
                <img v-lazy="datas.image" alt="">
                <div class="title">
                    <div class="w ys">
                        <span>{{datas.typeTitle}}</span>
                        {{datas.name}}
                    </div>
                    <div class="w nicek">
                         {{datas.nickeName}}
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { datas, shareShow } from "@/hooks/share.ts";
import networkRequest from '@/network/index.ts'
import { Toast } from 'vant';
import 'vant/es/toast/style';
let value = ref('')
const share=()=>{
    console.log(1);
    
    networkRequest("request2",`/share/resource?type=${datas.type}&id=${datas.id}&msg=${value.value}`,function(res:any){
        Toast.success('分享成功');
        shareShow.value=false
})
}

</script>

<style  scoped>
.shares-leave-active,
.shares-enter-active {
    transition: all ease-in 0.5s;
}

.shares-enter-from,.shares-leave-to {
    transform: translateY(100vh);
}

.shares-enter-to,.shares-leave-from {
    transform: translateY(0);
}

.w {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.nicek {
    margin-left: 1vmin;
    color: #6b6b6b;
    font-size: 3vmin;
}

.title {
    font-size: 4vw;
    margin-left: 2vmin;
    flex: 1;
    max-width: 70vw;
}

img {
    max-height: 10vw;
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

.detils {
    width: 92vw;
    margin: 0px auto;
    position: relative;
    padding: 2vw;
    border-radius: 2vw;
    align-items: center;
    background-color: #EFEEEE;
    margin-top: 10vh;
    display: flex;
}

.nav {
    display: flex;
    justify-content: space-between;
    width: 96%;
    padding: 2vw 2vw;
    font-size: 4vmin;
}

.nav div:nth-child(2) {
    font-weight: 600;
}

.nav div:nth-child(3) {
    color: #fff;
    border-radius: 2vmin;
    background-color: red;
    padding: 0.5vw 2vw;
    margin: 0px 2vw;
}

.share {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: #fff;
    top: 0px;
    z-index: 1000;
}
</style>