import { createApp, toRaw, Directive, DirectiveBinding,nextTick } from 'vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import { Lazyload } from 'vant';
import { setlocalStorage, getlocalStorage } from "./hooks/operationLocalStorage"
import monitoring from "./hooks/coverMonitoring"
import 'default-passive-events'
import App from '@/App.vue'
import router from './router'
import image from "@/assets/image/14.png"


// let router=useRouter()
//pinia插件封装
const piniaPlugin = (coontx: PiniaPluginContext) => {
  const { store } = coontx    //coontx是传进来的pinia，将里面的store结构出来
  //每次初始化去本地获取仓库值
  let data = getlocalStorage(store.$id)
  //$subscribe当pinia里面的值发生变化会调用该api
  store.$subscribe(() => {
    //将仓库进行存储
    // if(store.$id=='useSongList')
    setlocalStorage(store.$id, toRaw(store.$state))
  })
  return data

}

const app = createApp(App);
// 仅在浏览器内编译时才会工作
// 如果使用了构建工具，请看下面的配置示例
// app.config.compilerOptions.isCustomElement = (tag) => tag.includes('marquee')

const range: Directive = {
  //挂载时触发
  //el是绑定自定义事件的dom。di是传过来的东西
  mounted(el: HTMLElement, di: DirectiveBinding) {
      el.ontouchstart = function () {
      //当用户没有登录时，那么就会跳转到登录页。否则执行传过来的方法
      if (!getlocalStorage('cookie')) {
        router.push({
          path: '/sign'
        })
        return
      }else
      di.value.fn(di.value.index)
      
    }
  },
}
//挂载自定义指令
app.directive('range', range)

let store = createPinia()
store.use(piniaPlugin)  //挂载pinia插件
app.use(store);
app.use(router);
app.use(Lazyload, {
  loading: image,
  lazyComponent: true,
});

app.mount('#app')
