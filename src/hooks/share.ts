import { reactive, ref } from "vue"
//用于传递分享数据
export let datas=reactive({
    name:'',
    nickeName:'',
    id:0,
    type:'',
    typeTitle:'',
    image:''
})
export let shareShow=ref<boolean>(false)