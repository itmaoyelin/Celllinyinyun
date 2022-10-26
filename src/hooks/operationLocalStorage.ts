//用于保存值到localStorage
export const setlocalStorage=(key:string,value:any)=>{
    localStorage.setItem(key,JSON.stringify(value))
  }  
  //获取localStorage的值
export  const getlocalStorage=(key:string)=>{
    return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key) as string):null
  }
  //删除
export const removelocalStorage =(key:string)=>{
  localStorage.removeItem(key);
}