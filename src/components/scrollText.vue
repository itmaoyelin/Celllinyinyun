<template>
    <!-- 文字超过盒子进行滚动，用于navbar标题名 -->
    <div>   
                <!-- 为了减少更新时间这里就直接隐藏盒子 -->
        <marquee  :class="{hidden:!isShow}" ref="marquee" behavior="scroll" width="100%"  scrollamount="5" direction="left"> {{ name }}
        </marquee>
        <div  :class="{hidden:isShow}" ref="songNameDiv" class="songName">
            <span ref="songNameSpan" >{{ name }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed,onMounted,watch,nextTick } from "vue"
let data = defineProps<{
    name: string
}>()

//监听文字是否改变
const getname=computed(()=>{
    return data.name
})
watch(getname,(a)=>{
    isShow.value=false
//当页面更新后再进行判断是否打开滚动
nextTick(()=>{
    setisShow()
})

})
//获取到dom元素
let songNameDiv :any= ref(null)
let songNameSpan: any = ref(null)
//控制是否滚动
let isShow=ref(false)
// onMounted(() => { 
//  setisShow()
// })


const setisShow=()=>{
    //当标题文本溢出便滚动文字
    isShow.value=songNameSpan.value.offsetWidth>= songNameDiv.value.offsetWidth    
}
</script>

<style  scoped>
.songName {
    width: 100%;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;

}
.hidden{
    visibility: hidden;
    position: absolute;
}
</style>