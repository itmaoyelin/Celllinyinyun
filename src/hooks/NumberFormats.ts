import {computed } from "vue"
//格式化数量
let NumberFormats = computed(() => {
    //柯理化
    return function (playCount: number) {
        return playCount > 10000 ? Math.floor(playCount / 10000) + '万' : playCount
    }
})
export default NumberFormats