import { defineStore } from 'pinia'
import networkRequest from "@/network/index.ts"
import type {RootObject} from"./type"
import { Dialog } from 'vant';
import 'vant/es/dialog/style';
interface Song {
  id: number | string,    //当前播放歌曲的id
  songList: RootObject[] ,     //整个歌曲列表
  fatherId:number|string,    //在哪个歌单播放的该歌曲，那么便收集该歌单的id
  name:string,          //歌曲名称
  ar:Object,            //歌曲作者信息
  index:number,        //在列表里的第几位
  songUrl:string,      //歌曲播放地址
  image:string,        //歌曲图片
  type:number     //用于区分当前播放的是歌曲还是电台，电台没有评论
  djId:number
}
//当前播放的歌曲仓库
export const useSong = defineStore({
  id: 'useSongList',
  state: (): Song => {
    return {
      id: '',
      songList: [],
      fatherId:'',
      name:'当前无歌曲',
      ar:{
        name:'让我们的生活充满音乐'
      },
      index:-1,
      songUrl:'',
      image:'',
      type:2,
      djId:0
    }
  },
  getters: {

  },
  actions: {
    //获取播放列表，及其整个歌单id
    Initialize (songList:RootObject[],fatherId?:number|string) { 
      if(this.fatherId!==fatherId){
        this.songList=songList
        fatherId?this.fatherId=fatherId:this.fatherId=""
      }
    },

    //要播放歌曲的信息
    setPlaySong (id:number|string,index:number,name:string,image:string,ar:object,fee:number=0,type:number=2,djId:number=0)  {
      if(fee==1){
        Dialog.alert({
          message: 'vip歌曲无法播放',
        })
        return
      }
      this.djId=djId
      this.type=type
      this.id=id
      this.index=index
      this.name=name
      this.ar=ar
      this.image=image
      //获取前先清空，避免缓存
      this.songUrl=''
      getsongUrl(id,(res:any)=>{
        this.songUrl=res.data.data[0].url
      })
    },

    //删除等待列表的歌曲
    deleteSong(index:number){
    this.songList.splice(index,1)
    },

    //通过下标播放歌曲列表里面的歌曲
    indexPlaySong(index:number){
      if(index==this.songList.length)index=0  //播放第一首
      if(index==-1)index=this.songList.length-1 //播放最后一首
      let song=this.songList[index]
      let type=song.shareId?4:2
     this.setPlaySong(song.id, index, song.name, song.al.picUrl, song.ar[0],song.fee,type,song.shareId||0)
    },

    //歌曲切换策略
    strategy(methods:string,playIndex:number){
      const useSong=this
      if(useSong.songList.length==0) return
      //判断是否点击了下一首
      let theBoolean=methods=='theNext'
      //当前播放的歌曲在整个歌曲列表里的下标
      let listIndex=this.index
  
      if(useSong.songList.length==0)
      return 
      let logic:any={
              '0'(){      //列表循环播放                
                  theBoolean?useSong.indexPlaySong(listIndex+1):useSong.indexPlaySong(listIndex-1)
              },
               '1'(){     //随机播放
                  let index=Math.floor(Math.random()*useSong.songList.length-1)+1
                  useSong.indexPlaySong(index)
              },
               '2'(){     //重复播放

                useSong.indexPlaySong(listIndex)
              }
     
      }
          logic[playIndex]()
  }
  }
  
})

//获取歌曲播放路径
const getsongUrl = (id: number | string,fn:Function) => {
  
  networkRequest('request', '/check/music?id='+id,function(res:any){
    console.log(res);
    networkRequest('request', '/song/url?id='+id,fn)
  })
 
 
  
}

