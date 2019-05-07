let storage = {
    state: {
        finishTime:0,
        loginBox:false,
    },
    getters:{
        // getLoginBox(state){
        //     return state.loginBox
        // }
    },
    mutations:{
        // CHANGE_FINISHTIME(state, newVal){
        //     state.finishTime = newVal
        // },
        // CHANGE_LOGIN_BOX(state, boole){
        //     state.loginBox = Boolean(boole)
            
        // },
    },
    actions:{
        toggleLoginBox(state){
            state.commit('CHANGE_LOGIN_BOX', !state.state.loginBox)
        },
        clearLoginBox(state){
            state.commit('CHANGE_LOGIN_BOX', false)
        }
    }
    
}

export default storage