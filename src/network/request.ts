import axios from 'axios';
import NProgress from 'nprogress'
import { Notify } from 'vant';
import 'vant/es/notify/style';
// 引入nprogress样式文件
import 'nprogress/nprogress.css'
import { getlocalStorage } from '@/hooks/operationLocalStorage.ts';
import Vrouter from "../router"
const router = Vrouter

export function request(config: any) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_HTTP,
    // timeout: 10000,
  })
  NProgress.start()
  NProgress.inc();
  //响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done()
    goSign(res)
    return res
  }, err => {
    Notify({ type: 'danger', message: err.message });
    NProgress.done()
    throw err.message
  })
  return instance(config)
}




//该请求发送前需要登录
export function request2(config: any) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_HTTP,
    // timeout: 10000,
  })

  NProgress.start()
  NProgress.inc();
  //请求拦截
  instance.interceptors.request.use(config => {
    // 展示进度条
    NProgress.start()
    NProgress.inc();
    if (!getlocalStorage('cookie')) {
      Notify({ type: 'danger', message: '请登录' });
      router.push({
        path: '/sign'
      })
      return
    }
    return config
  })
    //响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done()
    goSign(res)
    return res
  }, err => {
    Notify({ type: 'danger', message: err.message });
    console.log(err);
    NProgress.done()
    throw err.message
  })
  return instance(config)
}

const goSign=(res:any)=>{
  if (res.data.code >= 300 && res.data.code < 400) {
    Notify({ type: 'danger', message: '请登录' });
    router.push({
      path: '/sign'
    })
  }
}