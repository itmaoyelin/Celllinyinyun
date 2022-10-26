import { ref } from "vue";

  export let loadingShow=ref(true)      //为true表示打开load
  //是否打开loading
  export const controlLoad=(setload:boolean)=>{
    loadingShow.value=setload
  }