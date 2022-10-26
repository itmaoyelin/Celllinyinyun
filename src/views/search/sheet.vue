<template>
    <div class="sheet" v-for="item in  nestedProps.sheet" :key="item.id" @click="go(item.id)">
        <img v-lazy="item.coverImgUrl" alt="">
        <div>
            <div class="name" v-html="replaceHandle(item.name,nestedProps.value,'#23AAF2')"></div>
            <div class="nicekName" v-html="replaceHandle(item.creator.nickname,nestedProps.value,'#23AAF2')"></div>
            <div class="title" v-if="item.officialTags">
                <div class="officialTags" v-for="title in item.officialTags">
                    {{title}}
                </div>
            </div>
        </div>


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
        path:"/sheetdetails",
        query:{
            id
        }
    })
}
</script>

<style  scoped>
.title {
    display: flex;
}

.officialTags {
    color: rgb(255, 102, 0);
    font-size: 2vmin;
    padding: 0.1vmin 1vmin;
    background-color: rgba(255, 153, 0, 0.192);
    margin-right: 2vmin;
}

.nicekName {
    font-size: 2vmin;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(153, 156, 156);
}

.sheet {
    display: flex;
    padding: 2vw;
}

.name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 4vmin;
}

.sheet>div {
    margin-left: 2vmin;
    width: calc(100vw - 19vw - 2vmin);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}


img {
    border-radius: 2vmin;
    width: 15vw;
    height: 15vw;
    border: 0.1px solid rgba(151, 151, 151, 0.616);
}
</style>