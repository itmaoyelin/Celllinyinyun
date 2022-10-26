//0代表首页，10代表歌曲详情页(核心)
//策略模式-动画处理
import { ref } from "vue";
//页面切换动画
export let animate = ref<string>('')
export function pageTransferDevice(a: number, b: number) {
    for (let k in pageStrategy) {
        if (pageStrategy[k](a, b))
            return animate.value = pageStrategy[k](a, b)            //返回的是对应的css动画类名
    }
}
let pageStrategy: any = {
    //进入歌曲详情页动画
    'songEnte'(a: number) {
        return a == 10 ? 'songEnte' : ''
    },
    //离开歌曲详情页动画
    'songLeave'(a: number, b: number) {
        return b == 10 ? 'songLeave' : ''
    },
    //前往首页动画
    'goHome'(a: number) {
        return a == 0 ? 'right' : ''
    },
    //是否是在非首页处刷新，如果是则执行该动画
    'isundefined'(a: number, b: number | undefined) {
        return b == undefined ? 'left' : ''
    },
    //进入子级页面和父页面动画
    'compare'(a: number, b: number) {
        return a < b ? 'right' : 'left'
    }

}


//底部歌曲展示栏动画
export let bottomTabbarShow = ref<string>('')
export function navTransferDevice(a: number, b: number) {
    for (let k in navStrategy) {
        if (navStrategy[k](a, b))
            return bottomTabbarShow.value = navStrategy[k](a, b)
    }
}
let navStrategy: any = {
    //直接在歌曲页面进行刷新
    'enterSong'(a: number, b: number | undefined) {
        return a == 10 && b == undefined ? 'nohomeeEter' : ''
    },
    //从首页进入到歌曲详情页
    'homeEnterSong'(a: number, b: number) {
        return b == 0 && a == 10 ? 'nohomeeEter' : ''
    },
    //从非首页进入到歌曲详情页
    'nonHomeEnterSong'(a: number, b: number) {
        return b > 0 && a == 10 ? 'homeeEter' : ''
    },
    //当从歌曲页面来到非首页时 
    'leaveSongGononHome'(a: number, b: number) {
        return b == 10 && a > 0 ? 'songleave' : ''
    },
    //当从歌曲页面来到非首页时 
    'leaveSongGoHome'(a: number, b: number) {
        return b == 10 && a == 0 ? 'homeleavesong' : ''
    },
    //直接在非首页刷新
    'enternonHome'(a: number, b: number) {
        return b == undefined && a > 0 ? 'disappearfalse' : ''
    },
    //子页面进入首页
    'enterHome'(a: number, b: number) {
        return a == 0 ? 'disappeartrue' : ''
    },
    //首页进入子页面
    'leaceHome'(a: number, b: number) {
        return b == 0 && a > b ? 'disappearfalse' : ''
    },

}
//底部导航栏活跃状态
interface Objs {
    [key: string]: any
}
export let activIndex: Objs = {
    '/home'() {
        return 0
    },
    '/userpage'() {
        return 1
    },
    '/concerned'(){
        return 2
    }
}