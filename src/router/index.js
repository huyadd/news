import Vue from 'vue'
import Router from 'vue-router'
import RouteMap from './routeMap.js'
import DisableScroll from '../module/disableScroll'
import RouteParse from '../module/routeParse'

import GetArea from '../module/routeParse/getArea.js'
import SetQuery from '../module/routeParse/setQuery.js'
import CompareQuery from '../module/routeParse/compareQuery.js'
import getQuery from '../module/routeParse/getQuery.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: RouteMap,
  scrollBehavior: (to, from, savedPosition) => savedPosition ? savedPosition : { x: 0, y: 0 },
})

// router.beforeEach((to, from, next) => {
//   setTimeout(function(){
//     next()
//   }, 3000)
// })

router.beforeEach((to, from, next) => {
  const commit = router.app.$options.store.commit
  const state = router.app.$options.store.getters

  // let isLogin = state.isLogin
  // let hasLoginBox = state.getLoginBox


  //
  const route = RouteMap.filter(item => item.name == to.name)[0] || RouteMap[RouteMap.length - 1]
  console.log('before:'+state.backUrl)
  //给当前状态（store -> pageInfo）添加基础信息
  //这个阶段后pageInfo会更新为要进入页面的页面信息，但还不会影响backUrl，因为history还没有更新，后面history修改后，backUrl才是下一个返回页面的url
  commit('CHANGE_CURRENT', {
    name: route.name, 
    title: route.title, 
    fullPath:to.fullPath, 
    fromFullpath:from.fullPath,
  })
//

  
  //未登录时访问/user
  if(state.isNoLoginToUser){
    if(state.getLoginBox){
      next(SetQuery.remove(from.fullPath, 'loginBox'))
    }else{
      next(SetQuery.add(from.fullPath, {loginBox: true}))
    }
    return false
  }

  
  

  //确定过渡方向，路由跳转时的动画过渡需要符合事先定义的空间逻辑，这里的判断稍微有些麻烦
  //需要区分出手势返回（gestureBack）和按钮返回（buttonBack），手势返回时给出的方向为'',这是为了避免触发过渡动画
  //已登录和未登录状态，上下的过渡动画会有不同（down/up和loginDown/loginUp），他们的方向是相同的，区别是动画速度会有细微差异,因此会先判断是已登录还是未登录
  //之后的判断顺序是先根据历史记录判断这个导航是否是返回操作，然后区分是手势返回还是按钮返回，都不是则空间逻辑确定其他三个方向
  //按钮事件会在store.button中留下记录，这个记录会在后面的afterEach中清除，上面“按钮导致的返回”是根据这个判断的
  
  //*iOS中的手势返回事件是系统级的，无法在浏览器中捕获，这里的手势返回是简单的根据排除法来判断的，会有缺陷
  //*假如页面中点击的链接正好与历史记录的backUrl相同，会被视为是返回，但因为没有back按钮的点击记录，会被判断为手势返回而缺少过渡动画，后期会修复这个问题
  //**因为没法捕获手势返回，这里的判断逻辑做的太复杂了，暂时没有其他理想的方案，另外还没有考虑手势前进这个操作，这仍是会触发过渡动画的，不过这个不是常见操作，后期会修复这个问题
  if(state.isLogin){
    //已登录
    if(state.processing.logging){
      commit('CHANGE_DIRECTION', 'down')
    }else if(state.isGestureBack){
      commit('CHANGE_DIRECTION', '')
    }else if(state.isButtonBack){
      commit(
        'CHANGE_DIRECTION', 
        ['down', 'back', 'up'][RouteParse(to.path, from.path)[0] + 1]
      )
    }else{
      commit(
        'CHANGE_DIRECTION', 
        ['down', 'forward', 'up'][RouteParse(to.path, from.path)[0] + 1]
      )
    }

  }else{
    //未登录
    if(state.isGestureBack){
      console.log('手势返回')
      commit('CHANGE_DIRECTION', '')
    }else if(state.isButtonBack){
      console.log('按钮返回')
      commit(
        'CHANGE_DIRECTION', 
        ['loginDown', 'back', 'loginUp'][CompareQuery(to.fullPath, from.fullPath) + 1]
      )
    }else{
      commit(
        'CHANGE_DIRECTION', 
        ['loginDown', 'forward', 'loginUp'][CompareQuery(to.fullPath, from.fullPath) + 1]
      )
    }
  }


  next()
})


router.afterEach((to, from) => {
  const commit = router.app.$options.store.commit
  const state = router.app.$options.store.getters

  //根据路由表中的disableScroll属性，对当前页面设置禁止滚动特性
  const route = RouteMap.filter(item => item.name == to.name)[0] || RouteMap[RouteMap.length - 1]
  console.log('disableScroll:')
  console.log(route.disableScroll)
  DisableScroll(route.disableScroll, 'router.afterEach')
  //根据查询参数(?loginBox=true)开关登录窗口（loginBox）
  commit('CHANGE_LOGIN_BOX', Boolean(to.query.loginBox))


  // let back = to.fullPath == state.backUrl

  console.log('after:'+state.backUrl)
  

  //处理添加删除历史记录
  //因为loginBox的开关也是基于url参数的，这里的需要判断以避开被history记录

  if(state.isBackLink && !state.processing.switching){
    console.log('back!')
    commit('BACK_HISTORY')
  }else if(state.isNormalRoute && !state.processing.logging && !state.processing.switching){
    console.log(state.isBackLink)
    console.log('ADD!')
    console.log(state.processing.logging)
    commit('ADD_HISTORY')
  }else if(state.isNormalRoute && state.processing.switching){
    console.log('SWITCH!***')
    commit('SWITCH_HISTORY')
  }
  console.log('end:'+state.backUrl)
  //等过渡动画结束后重置方向和back按钮信息，之前有bug现在暂时用一个写死的延迟，晚点再改
  //返回到上一个新闻详情时，是否保持滚动距离需要processing.backing判断
  setTimeout(function(){
    commit('CLEAR_DIRECTION')
    commit('RESET_BTN')
    console.log(0)
    
  }.bind(this), 600)
  

})


export default router
