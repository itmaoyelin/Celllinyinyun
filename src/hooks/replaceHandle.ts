//匹配对应字符改变颜色
import { ref } from "vue"
export const replaceHandle = (parentStr: string, searchText: string,color:string) => {
    let res = new RegExp("(" + searchText + ")", 'ig');
    parentStr = parentStr.replace(res, `<span style='color:${color};'>` + searchText + "</span>");
    return parentStr;
}
export let show=ref<boolean>(false)