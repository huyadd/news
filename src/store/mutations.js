import GetArea from '../module/routeParse/getArea.js'
import GetPath from '../module/routeParse/getPath.js'
import ClearUrl from '../module/routeParse/clearUrl.js'
import getPath from '../module/routeParse/getPath.js';

export default {
    //pageInfo
    CHANGE_CURRENT({pageInfo}, newVal){
        pageInfo.name = newVal.name
        pageInfo.title = newVal.title
        pageInfo.fullPath = ClearUrl(newVal.fullPath)
        pageInfo.fromFullpath = ClearUrl(newVal.fromFullpath)

        pageInfo.path = GetPath(newVal.fullPath)
        pageInfo.fromPath = GetPath(newVal.fromFullpath)
        pageInfo.area = GetArea(pageInfo.path)
        pageInfo.fromArea = GetArea(pageInfo.fromPath)
        
    },
    CHANGE_DIRECTION({pageInfo}, value){
        pageInfo.direction = value
    },
    CLEAR_DIRECTION({pageInfo}){
        pageInfo.direction = ''
    },
    // CLEAR_BACKBTN({current}){
    //     current.backBtn = false
    // },
    // CLEAR_SWITCHAREABTN({current}){
    //     current.switchAreaBtn = false
    // },
    //userInfo
    CHANGE_INFO({userInfo}, newInfo){
        userInfo.photo = newInfo.photo
        userInfo.userName = newInfo.userName || userInfo.userName
        userInfo.introduction = newInfo.introduction || userInfo.introduction
        userInfo.uid = newInfo.uid || userInfo.uid
        userInfo.tel = newInfo.tel || userInfo.tel
        userInfo.mail = newInfo.mail || userInfo.mail
        userInfo.viewed = newInfo.viewed || []
        userInfo.userFavorites = newInfo.userFavorites || []
    },
    CHANGE_PHOTO({userInfo}, url){
        userInfo.photo = url
    },
    RESET_USER_INFO({userInfo}){
        userInfo.uid = ""
        userInfo.photo = ""
        userInfo.userName = ""
        userInfo.introduction = ""
        userInfo.tel = ""
        userInfo.mail = ""
        userInfo.viewed = []
        userInfo.userFavorites = []
    },
    //history
    //历史记录的操作有三种，add、back和swift，其中swift用于区域切换
    //add和back都会执行一次去重
    ADD_HISTORY(state, {url = state.pageInfo.fromFullpath, area = state.pageInfo.fromArea} = {}){

        if(url != '/' && url != state.pageInfo.fullPath && _.last(state.history[area]) != url){
            url = GetPath(url)
            state.history[area] = _.chain(Array.from(state.history[area])).pull(url).push(url).value()
        }
        console.log(area + ' push ' + url +  ' from ADD_HISTORY ')
    },
    BACK_HISTORY(state){
        const area = GetArea(state.pageInfo.path)
        const fromPath = state.pageInfo.fromPath
        //const filterHistory = Array.from(state.history[area]).filter(item => item != fromPath)
        state.history[area] = _.chain(Array.from(state.history[area])).pull(fromPath).dropRight().value()
        // state.history[area].pop()
        
        console.log(area + ' pop ' + ' from BACK_HISTORY ')
    },
    SWITCH_HISTORY(state){
        const fromUrl = state.pageInfo.fromFullpath
        const fromArea = state.pageInfo.fromArea
        const currentPath = state.pageInfo.path
        const currentArea = state.pageInfo.area
        const lastHistory = _.last(state.history[currentArea])
        const lastHistoryPath = lastHistory ? GetPath(lastHistory) : undefined
        
        if(fromUrl != '/' && _.last(state.history[fromArea]) != fromUrl){
            this.commit('ADD_HISTORY', {url:fromUrl, area: fromArea})
        }

        if(currentPath == lastHistoryPath){
            state.history[currentArea].pop()
        }
        
        console.log(state.history.news) 
    },
    // COMPLETE_HISTORY({history}, arr, area){
    //     arr.forEach(url => history.list.unshift(url))
    // },
    //processing
    OPEN_BACKBTN({processing}){
        processing.backing = true
    },
    OPEN_SWITCHAREABTN({processing}){
        processing.switching = true
    },
    OPEN_LOGGING({processing}){
        processing.logging = true
    },
    OPEN_MOVING({processing}){
        processing.moving = true
    },
    OFF_BACKBTN({processing}){
        processing.backing = false
    },
    OFF_SWITCHAREABTN({processing}){
        processing.switching = false
    },
    OFF_MOVING({processing}){
        processing.moving = false
    },
    RESET_BTN({processing}){
        processing.backing = false
        processing.switching = false
        processing.logging = false
        processing.moving = false
    },
    //storage
    CHANGE_FINISHTIME({storage}, newVal){
        storage.finishTime = newVal
    },
    CHANGE_LOGIN_BOX({storage}, boole){
        console.log('执行了CHANGE_LOGIN_BOX： storage.loginBox ='+ boole)
        storage.loginBox = boole
    },
    SET_TOKEN({storage}, newVal){
        storage.token = newVal
    },
    DEL_TOKEN({storage}){
        storage.token = ''
    },
    //userHistory
    ADD_USER_FAVORITES({userInfo}, newVal){
        userInfo.userFavorites.unshift(newVal)
    },
    DEL_USER_FAVORITES({userInfo}, newVal){
        userInfo.userFavorites.splice(userInfo.userFavorites.indexOf(newVal), 1)
        console.log('%！')
        console.log(userInfo.userFavorites)
    },
    //viewed
    ADD_USER_VIEWED({userInfo}, id){
        // console.log('%！!!!!!!')
        // console.log(_.chain(Array.from(userInfo.viewed)).unshift(id).uniq().slice(0, 6))
        userInfo.viewed = _.chain(Array.from(userInfo.viewed)).unshift(id).uniq().slice(0, 6).value()
        // console.log(userInfo.viewed)

    },
    DEL_USER_VIEWED({userInfo}, id){
        userInfo.viewed.splice(userInfo.viewed.indexOf(id), 1)
        console.log(userInfo.viewed)

    },
}