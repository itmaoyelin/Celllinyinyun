import { defineStore } from 'pinia'
interface use {
    userId:number   //用户id
    userImage:string    //用户头像
    userName:string   //用户姓名
  // use:any
  downlink: number | string,  //网络下行速度,单位MB/S
  effectiveType: string     //网络状态
  onlinea: boolean,       //是否有网
  connection: any        //网络对象
}
export const useImportant = defineStore({
  id: 'important',
  state: (): use => {
    return {
      userId:0,
      userName:'',
      userImage:'',
      downlink: 0,
      effectiveType: '',
      onlinea: navigator.onLine,
      connection: void 0
    }
  },
  getters: {

  },
  actions: {
    initialization() {

      
      try{
      // 对online网络在线变更监听
      let __this = this
      __this.connection=navigator.connection
      window.addEventListener("online", function () {
        __this.onlinea = window.navigator.onLine
      });

      // 对offline断网变更监听
      window.addEventListener("offline", function () {
        __this.onlinea = window.navigator.onLine
      });

      __this.connection.addEventListener("change", () => {
        // connection.effectiveType返回的是具体的网络状态：4g/3g/2g
        this.effectiveType = this.connection.effectiveType
        this.downlink = this.connection.downlink
      });
    }catch(res){
      console.log(res);
      
    }
    }
  }


})