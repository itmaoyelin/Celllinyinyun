import { request, request2 } from './request'

//数据请求工厂模式
export default async function (requestType: "request" | "request2", url: string, fun?: Function, method: string = 'GET', data?: any) {
    let undf = void 0
     //当用户没有穿回调时,将返回promise
    if(!fun){
        return Axios[requestType].call(undf, {
            url,
            method,
            params:Date.now(),
        })
    }

    let res
    try {
        res = await Axios[requestType].call(undf, {
            url,
            method,
            dparams:Date.now(),
        })
        fun(res)
        res=null
        return
       
    } catch (err) {
        console.log('err', err);
        return
    }

}

interface Request {
    [kye: string]: Function,
}
let Axios = <Request>{
    request,
    request2
}



function fn<T extends number>(age: T): T {
    return age
}
let a1 = fn(2)