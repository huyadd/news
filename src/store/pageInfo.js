let pageInfo = {
    state: {
        name:'news',
        title:'',
        fullPath:'',
        fromFullpath:'',
        path:'',
        fromPath:'',
        area:'',
        fromArea:'',

        direction:'',
    },
    getters:{
        getDirection(state){
            return state.direction
        },
        
    },
    mutations:{
        // CHANGE_CURRENT(state, newVal){
        //     state.path = newVal.path
        //     state.name = newVal.name
        //     state.title = newVal.title
        //     state.area = newVal.area
        // },
        // CHANGE_DIRECTION(state, value){
        //     state.direction = value
        // },
        // CLEAR_DIRECTION(state){
        //     state.direction = ''
        // },
        // CLEAR_BACKBTN(state){
        //     state.backBtn = false
        // },
        // CLEAR_SWITCHAREABTN(state){
        //     state.switchAreaBtn = false
        // }
        
    },
    actions:{
        changeCurrent({commit}, newVal){
            commit('CHANGE_CURRENT', newVal)
        },
        // toggleLoginBox({commit}){
        //     commit('TOGGLE_LOGIN_BOX')
        // }
    }
}

export default pageInfo