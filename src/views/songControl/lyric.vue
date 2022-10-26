<template>
    <div class="lyric">
        <div class="yd">
            <div v-for="item,index in lyricArr" :style="contped(index)">
                {{item.wors}}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue"
import networkRequest from '@/network/index.ts'
import { indexShow, lyricArr } from '@/hooks/parameterPassing.ts';  //歌曲控制
let data = defineProps<{
    id: number | string
}>()

watchEffect(() => {
    if (data.id)
        networkRequest('request', `/lyric?id=${data.id}`, function (res: any) {
            lyricArr.value = handle(res.data.lrc.lyric.split('\n'));
        })
})
const contped = (index: number) => {
    return index == indexShow.value ? 'transform: scale(1.2);color:#fff' : ''
}
const lyricmove = () => {
    return indexShow.value > 6 ? indexShow.value - 6 : 0
}
/**
 * 歌词格式化
 */
const handle = (lyric: any) => {
    let final: any = []
    lyric.forEach((element: any) => {
        let arr = element.split(']')
        final.push({
            wors: arr[1],
            time: timeHandle(arr[0].slice(1))
        })
        arr = null
    });

    final.pop()

    return final.filter((n:any)=>{
        return n.wors!=''
    })
}
/**
 * 将时间转为对应的秒
 */
const timeHandle = (time: string) => {
    let container: string[] = time.split(':')
    return +container[0] * 60 + (+container[1])
}




</script>

<style  scoped>
.yd {
    text-align: center;
    position: absolute;
    height: 100%;
    transition: all 0.7s;
    width: 100vw;
    transform: translateY(calc(v-bind(lyricmove()) * 11vw * -1));
}

.yd div {
    margin: 2vw auto;
    width: 80vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    height: 7%;
    transition: all 0.6s;
    font-size: 3.5vmin;
}

.lyric {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 70vh;
    box-shadow: 0px 2vw 10px -12px rgb(80, 80, 80) inset, 0px -2vw 10px -12px rgb(80, 80, 80) inset;
    margin-top: 3vw;
    position: absolute;
    z-index: 10000;
}
</style>