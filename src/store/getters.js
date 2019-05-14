import GetArea from '../module/routeParse/getArea.js'
import ClearUrl from '../module/routeParse/clearUrl.js'
import GetQuery from '../module/routeParse/getQuery.js'

export default {
    pageInfo: state => state.pageInfo,
    userInfo: state => state.userInfo,
    history: state => state.history,
    processing: state => state.processing,
    storage: state => state.storage,

    getLoginBox(state){
        return state.storage.loginBox
    },
    //是否登录
    isLogin(state){
        return state.userInfo.userName ? true : false
    },
    //是否在未登录时访问/user
    isNoLoginToUser(state, getters){
        return (!getters.isLogin) && GetArea(state.pageInfo.path) == 'user' 
    },
    //返回链接
    backUrl(state){
        // return state.pageInfo.area == 'user' && state.history.user.length > 0
        // ? _.last(state.history.user)
        // : _.last(state.history.news)
        // console.log(state.pageInfo.area == 'user')
        // console.log(state.history.user.length)
        // setInterval(() => {console.log(state.history.user.length)}, 5000)
        if(state.pageInfo.area == 'user' && state.history.user.length > 0){
            return _.last(state.history.user)
        }else{
            return _.last(state.history.news)
        }
    },
    //导航的链接是否是返回链接（历史记录中的上一条）
    isBackLink(state, getters){
        return state.pageInfo.fullPath == getters.backUrl && (!state.processing.switching)
    },
    //返回类型是否是手势返回,先确认导航的链接是返回链接，并排除掉backing和switching导致的返回，注：这个判断不是绝对准确的
    isGestureBack(state, getters){
        return getters.isBackLink && (!state.processing.backing) && (!state.processing.switching) && (!state.processing.moving)
    },
    //返回类型是否是按钮返回
    isButtonBack(state, getters){
        return getters.isBackLink && (state.processing.backing || state.processing.switching || state.processing.moving)
    },
    //是否是正常跳转的路由,用于排除loginBox切换产生的路由跳转
    isNormalRoute(state){
        return !(GetQuery(state.pageInfo.fullPath).loginBox) && !(GetQuery(state.pageInfo.fromFullpath).loginBox)
    },
    //区域切换按钮（头部右边的按钮）对应的url
    switchAreaUrl(state) {
        if(state.pageInfo.area == 'news'){
            return _.last(state.history.user) || '/user'
        }else{
            return _.last(state.history.news) || '/news'
        }
    }
    
}