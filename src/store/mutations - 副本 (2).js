import GetArea from '../module/routeParse/getArea.js'
import GetPath from '../module/routeParse/getPath.js'
import ClearUrl from '../module/routeParse/clearUrl.js'

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
        userInfo.userName = newInfo.userName
        userInfo.introduction = newInfo.introduction
        userInfo.uid = newInfo.uid || userInfo.uid
        userInfo.tel = newInfo.tel || userInfo.tel
        userInfo.mail = newInfo.mail || userInfo.mail
    },
    CHANGE_PHOTO({userInfo}, url){
        userInfo.photo = url
    },
    CLEAR_INFO({userInfo}){
        userInfo.photo = ""
        userInfo.userName = ""
        userInfo.introduction = ""
        userInfo.uid = ""
        userInfo.tel = ""
        userInfo.mail = ""
    },
    //history
    //历史记录的操作有三种，add、back和swift，其中swift用于区域切换
    ADD_HISTORY(state, {url = state.pageInfo.fromFullpath, area = state.pageInfo.fromArea} = {}){
        //const url = state.current.fromFullpath
        // const area = state.current.fromArea
        // url = ClearUrl(url)
        // const area = GetArea(url)
        // alert('area')
        // alert(area)
        // console.log('开始')
        // console.log("url != '/': " + url != '/')
        // console.log("url != state.pageInfo.fullPath: " + url != state.pageInfo.fullPath)
        // console.log(" _.last(state.history[area]) != url: " + _.last(state.history[area]) != url)
        //为了避免一些误判情况，列表中的新闻链接会加入一个时间参数，这里添加记录时需要判断一下，防止两个相同的链接（参数不同）重复添加
        if(url != '/' && url != state.pageInfo.fullPath && _.last(state.history[area]) != url){
            if(_.last(state.history[area]) == undefined){
                state.history[area].push(url)
                console.log('直接记录')
                console.log(area + ' push ' + url +  ' from ADD_HISTORY ')

            }else{
                let historyPath = GetPath(_.last(state.history[area]))
                let urlPath = GetPath(url)
                console.log('historyPath: '+historyPath)
                console.log('urlPath: '+urlPath)
                if(historyPath == urlPath){
                    state.history[area].pop()
                    console.log('删除记录')
                    console.log(area + ' pop ' + url +  ' from ADD_HISTORY ')
                }else{
                    state.history[area].push(url)
                    console.log('添加记录')
                    console.log(area + ' push ' + url +  ' from ADD_HISTORY ')
                    console.log(historyPath)
                    console.log(urlPath)
                }
            }
            console.log(state.history.news)
        }
        
    },
    BACK_HISTORY(state){
        const area = GetArea(state.pageInfo.path)
        state.history[area].pop()
        console.log(area + ' pop ' + ' from BACK_HISTORY ')
    },
    SWITCH_HISTORY(state){
        const fromUrl = state.pageInfo.fromFullpath
        const fromArea = state.pageInfo.fromArea
        const currentArea = state.pageInfo.area
        
        if(fromUrl != '/' && _.last(state.history[fromArea]) != fromUrl){
            //state.history[fromArea].push(fromUrl)
            console.log('Switch!!!!')
            this.commit('ADD_HISTORY', {fromUrl, fromArea})
        }

        state.history[currentArea].pop()
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
    OFF_BACKBTN({processing}){
        processing.backing = false
    },
    OFF_SWITCHAREABTN({processing}){
        processing.switching = false
    },
    RESET_BTN({processing}){
        processing.backing = false
        processing.switching = false
        processing.logging = false
    },
    //storage
    CHANGE_FINISHTIME({storage}, newVal){
        storage.finishTime = newVal
    },
    CHANGE_LOGIN_BOX({storage}, boole){
        storage.loginBox = boole
    },
    //userHistory
    ADD_USER_FAVORITES({userInfo}, newVal){
        userInfo.userFavorites.push(newVal)
    },
    DEL_USER_FAVORITES({userInfo}, newVal){
        userInfo.userFavorites.splice(userInfo.userFavorites.indexOf(newVal), 1)
        console.log('%！')
        console.log(userInfo.userFavorites)
    }
}