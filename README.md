## 前言

功能没有完全实现，目前实现每日推荐、歌单、排行榜、电台、歌手、切换动画、歌曲控件及播放。该项目适配百分之95的手机屏幕。<br>

目前正在持续更新中。肝代码不易,随手点个Star再走呗

## 简介

当前使用技术：Vue3、Vite、TypeScript、Pinia，VueRouter、Vant、Swiper<br>

基于网易云api开发，模仿网易云移动端。运行该项目前请下载[网易云api](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 使用说明

如果请求无数据，请查看请求地址与接口地址是否一致。目前歌曲只能通过排行榜、歌单、首页推荐歌曲进行播放

该项目仅供学习使用，不作商用

## 感谢

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 安装

````
git clone 仓库地址

npm install
````

## 运行

```
npm run dev
```

## 最新更新

+ 新增关注页面：可以查看关注的好友或歌手动态以及自己分享的动态
+ 新增搜索页面：可搜索单曲、歌单、歌手
+ 新增评论：mv、歌单、单曲评论。回复评论，评论点赞
+ 新增分享：歌单、mv、节目、单曲、声音、日常
+ 新增收藏：可收藏单曲、歌单、电台、歌手
+ 新增歌词展示
+ 解决退出登录无法生效问题

登录需要在有官方注册过的账号

## 后续准备

换肤功能，性能优化，验证码登录
