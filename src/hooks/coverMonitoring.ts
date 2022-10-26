//监听元素是否重叠
//参数dome：要监听的盒子，fn回调函数，threshold子盒子进入率。root父盒子
 const monitoring = (dome: HTMLElement, fn: IntersectionObserverCallback, threshold: number = 0,root=null) => {
    let obj = new IntersectionObserver(fn, {        //监视元素的重叠        第一个参数是回调，满足threshold会执行，会给回调传一个事件对象。第二个参数是配置项
        root,               //所监听对象的具体祖先元素。如果未传入值或值为null，则默认使用顶级文档的视窗(一般为html)。
        threshold                               //  0-1    监视盒子对于root盒子的最小覆盖率
    })
    //监视哪个dom元素
    obj.observe(dome)
}
export default monitoring