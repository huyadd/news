import News from '@/page/News'
import Detail from '@/page/Detail'
import User from '@/page/User'
import UserInfo from '@/page/UserInfo'
import Viewed from '@/page/viewed'
import Favorites from '@/page/Favorites'
import Verification from '@/page/Verification'

export default [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'news',
      title: '首页',
      component: News,
    },
    {
      path: '/news/detail',
      name: 'detailMain',
      title: '新闻详情',
      component: Detail,
      query:{
          t:Date.now(),
      }
    },
    {
      path: '/news/detail/:id',
      name: 'detail',
      title: '新闻详情',
      component: Detail,
      query:{
          t:Date.now(),
      }
    },
    {
      path: '/user',
      name: 'user',
      title: '个人中心',
      component: User,
      disableScroll:true,
    },
    {
      path: '/user/info',
      name: 'user-info',
      title: '个人资料',
      component: UserInfo,
      disableScroll:true,
    },
    {
      path: '/user/info/verification',
      name: 'verification',
      title: '身份验证',
      component: Verification
    },
    {
      path: '/user/viewed',
      name: 'viewed',
      title: '最近浏览',
      component: Viewed
    },
    {
      path: '/user/favorites',
      name: 'favorites',
      title: '我的收藏',
      component: Favorites,
    },
    {
      path: '*',
      name: 'notfound',
      title: '404',
      component: ({template:`<div class="notfound"><span>页面不存在</span></div>`})
    },
  ]