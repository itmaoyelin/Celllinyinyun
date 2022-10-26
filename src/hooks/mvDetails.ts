//用于控制vm详情页的打开和关闭
import { ref } from "vue" 
//开始出现的地方
export let XPX=ref("296px")
export let YPX=ref("474px")
//mvid
export let mvid=ref<number|string>()
export function setxy(x:string|number,y:string|number){
    XPX.value=x+'px'
    YPX.value=y+'px'
    setIsShow(true)
}
//是否显示mv页面
export let isShow=ref<boolean>(false)
export function setIsShow(boole:boolean){
    isShow.value=boole
}