import Axios from 'axios'

// /*------------------伪数据--------------------*/
// import Mock from 'mockjs'
// import UserInfo from '../mockdata/userInfo.js'
// Mock.mock('/mock/login', function(option){
//     return UserInfo
// })
// Mock.setup({
//     timeout: '500'
// })
// /*------------------伪数据---------------------*/

let userInfo = {
    state: {
        uid:'0001',
        photo:'http://pr3kng850.bkt.clouddn.com/static/images/02.jpg',
        userName:'呜哇哇',
        introduction:'一句话介绍，没什么可说的',
        tel:'13533250000',
        mail:'292665539@qq.com',
        viewed:[],
        userFavorites:[],
    },
    actions:{
        login(state, loginData){
            state.commit('OPEN_LOGGING')
            return Axios({method: "get", url: "/mock/login", data: loginData})
            .then(res => state.commit('CHANGE_INFO', res.data))
            .catch(err => alert(err))
        },
        add_favorite(state, id){
            state.commit('ADD_USER_FAVORITES', id)
            return Axios({method: "get", url: "/mock/favorites/add", data: id})
            .catch(err => {
                alert('操作失败')
                console.log(err)
                state.commit('DEL_USER_FAVORITES', id)
            })
        },
        del_favorite(state, id){
            state.commit('DEL_USER_FAVORITES', id)
            return Axios({method: "get", url: "/mock/favorites/del", data: id})
            .catch(err => {
                alert('操作失败')
                console.log(err)
                state.commit('ADD_USER_FAVORITES', id)
            })
        },
        add_viewed(state, id){
            state.commit('ADD_USER_VIEWED', id)
            return Axios({method: "get", url: "/mock/viewed/add", data: id})
            .catch(err => {
                alert('操作失败')
                console.log(err)
                state.commit('DEL_USER_VIEWED', id)
            })
        },
        del_viewed(state, id){
            state.commit('DEL_USER_VIEWED', id)
            return Axios({method: "get", url: "/mock/viewed/del", data: id})
            .catch(err => {
                alert('操作失败')
                console.log(err)
                state.commit('ADD_USER_VIEWED', id)
            })
        }
    }
}

//未处理可能遇到的问题
//lodding过程中back或swich对状态的影响

export default userInfo