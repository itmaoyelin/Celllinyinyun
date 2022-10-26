import { getlocalStorage } from '@/hooks/operationLocalStorage.ts'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',    //发现首页
    name: 'home',
    component: () => import('@/views/Home/index/index.vue'),
    meta: {
      index: 0
    },
  },
  {
    path: '/sheet', //歌单主页
    name: 'sheet',
    meta: {
      index: 1
    },
    component: () => import('@/views/Home/Sheet/index.vue'),
  },
  {
    path: '/sheetdetails',    //歌单详情页
    name: 'sheetDetails',
    meta: {
      index: 2,
      noKeepAlive: true     //组件不保存状态
    },
    component: () => import('@/views/Home/Sheet/details.vue'),
  },
  {
    path: '/rankinglist',   //排行榜主页
    name: 'rankinglist',
    meta: {
      index: 1
    },
    component: () => import('@/views/Home/rankingList/index.vue')
  },
  {
    path: '/rankingListDetails',    //排行榜的详情页面
    name: 'rankingListDetails',
    meta: {
      index: 2
    },
    component: () => import('@/views/Home/rankingList/detailsContent.vue')
  },
  {
    path: '/concerned',      //关注主页
    name: 'concerned',
    meta: {
      index: 0
    },
    component: () => import('@/views/concerned/index.vue'),
    beforeEnter: (to, form, next) => {
      //查看用户是否登录
      if (getlocalStorage('cookie')) {
        next()
      }
      else {
        next({
          path: '/sign'
        })
      }

    }
  },
  {
    path: '/radiostation',      //电台页
    name: 'radiostation',
    meta: {
      index: 1
    },
    component: () => import('@/views/Home/radioStation/index.vue')
  },
  {
    path: '/radidetalis',    //电台详情页
    name: 'radidetalis',
    meta: {
      index: 2
    },
    component: () => import('@/views/Home/radioStation/details.vue')
  },
  {
    path: '/search',    //搜索页
    name: 'search',
    meta: {
      index: 1
    },
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/singer',    //歌手页
    name: 'singer',
    meta: {
      index: 1
    },
    component: () => import('@/views/Home/singer/index.vue')
  },
  {
    path: '/singerdetails',    //歌手详情页
    name: 'singerDetails',
    meta: {
      index: 2
    },
    component: () => import('@/views/Home/singer/details.vue')
  },

  {
    path: '/songdetails', //  歌曲详情页面
    name: 'songdetails',

    component: () => import('@/views/songControl/index.vue'),
    meta: {
      index: 10,
    },

  },
  {
    path: '/comment',    //歌手详情页
    name: 'comment',
    meta: {
      index: 3
    },
    component: () => import('@/views/comment/index.vue')
  },
  {
    path: '/userpage', //  歌曲详情页面
    name: 'userpage',
    component: () => import('../views/userPage/index.vue'),
    meta: {
      index: 0,
    },
    beforeEnter: (to, form, next) => {
      //查看用户是否登录
      if (getlocalStorage('cookie')) {
        next()
      }
      else {
        next({
          path: '/sign'
        })
      }

    }

  },
  {
    path: '/sign',    //歌手详情页
    name: 'sign',
    meta: {
      index: 5
    },
    component: () => import('@/views/Sign/index.vue')
  },
  ]
})

router.beforeEach((to, from, next) => {

  next()
})

router.afterEach(() => {

})

router.beforeEach((to, from, next) => {

  next()






});

export default router
