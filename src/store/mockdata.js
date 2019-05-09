import _ from 'lodash'
let mockserver = {
    state: {
        userName:'呜哇哇',
        introduction:'一句话介绍，没什么可说的',
        viewed:[],
        userFavorites:[],
        
    },
    getters:{
        _mock_userName(state){
            return state.userName
        },
        _mock_introduction(state){
            return state.introduction
        },
        _mock_viewed(state){
            return state.viewed
        },
        _mock_userFavorites(state){
            return state.userFavorites
        }
    },
    mutations:{
        _MOCK_CHANGE_INFO(state, val){
            state.userName = val.userName
            state.introduction = val.introduction
        },
        _MOCK_SET_VIEWED(state, val){
            state.viewed = val
        },
        _MOCK_SET_FAVOROTES(state, val){
            state.userFavorites = val
        }
    },
    actions:{
        
    }
}

export default mockserver