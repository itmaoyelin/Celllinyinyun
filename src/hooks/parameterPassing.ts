//歌曲导航的参数及方法设置，实现隔代组件传参，控制
import { ref } from "vue";

//歌曲列表展开设置
export let showList=ref<boolean>(false)

//歌曲总时长
export let songDuratio=ref<number>(0)
//当前播放时间
export let songcurrentTime=ref<number>(0)
//拖动进度条后的获得时间，歌曲监听变化该值变化来设置当前播放时间
export let setCurrentTime=ref<number>()

//控制歌曲暂停及播放
//两个组件的暂停播放同时依赖
export let playState = ref<boolean>(false)

//播放顺序：0循环1随机2重复
export let playIndex = ref<number>(0)

 //设置当前进度
export let currentRate = ref<number>(10)

//歌词列表
export let lyricArr=ref<{time:number,wors:string}[]>([])

export let indexShow=ref<number>(0)