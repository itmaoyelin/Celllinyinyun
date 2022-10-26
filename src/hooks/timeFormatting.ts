//时间格式化
import { computed } from "vue";
 let time = computed(() => {
    return function (time: number) {
        let date = new Date(time);
        let date2 = new Date();
        let Y = date.getFullYear()
        let M = date.getMonth() + 1;
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        //获取当前的时间
        let M2 = date2.getMonth() + 1;
        let D1 = date2.getDate();
        //判断是否大于10
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        let f = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        //判读是否是当天
        return M2 == M && D == D1
            ? h + ":" + f
            : Y + "年" + M +
            "月" +
            D +
            "日" +
            " " +
            h +
            ":" + f
            ;
    }
})
export default time