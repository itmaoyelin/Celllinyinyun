<template>
    <div class="singer" v-for="item in nestedProps.singer" :key="item.id" @click="go(item.id)">
        <img v-lazy="item.img1v1Url" alt="">
        <div v-html="replaceHandle(item.name,nestedProps.value,'#23AAF2')"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue" 
import {replaceHandle} from "@/hooks/replaceHandle.ts"
import {useRouter} from "vue-router"
const router=useRouter()
defineProps<{
    nestedProps:any
}>()
const go=(id:number)=>{
router.push({
    path:'/singerdetails',
    query:{
        id
    }
})
}
</script>

<style  scoped>
    .singer{
        display: flex;
        padding: 2vw 2vw;
        align-items: center;
        border-bottom: 0.1px solid rgba(216, 212, 212, 0.623);
    }
    .singer div{
        flex: 1;
        white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2vmin;
    font-size: 4vmin;
    }
img{
    width: 15vw;
    aspect-ratio: 1/1;
    border-radius: 50%;
}
</style>