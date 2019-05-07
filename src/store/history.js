//点击返回按钮时，并不使用原生的history API，原因是需要在news和user两个区域之前切换，并实现预想的返回逻辑，单线的history API无法满足要求
//这里为news和user分别储存独立的历史记录，使用swichAreaBtn切换区域的同时也在两个历史记录中切换，user返回完则跳转到news这条线上，news返回完则处于返回的终点，返回按钮不可用

let history = {
    state: {
        user:[],
        news:[],
        
    },
    // getters:{
    //     history(state){
    //         return state.list
    //     }
    // },
    mutations:{
        // ADD_HEISTORY(state,url){
        //     if(url != '/'){
        //         state.list.push(url)
        //     }
        // },
        // BACK_HEISTORY(state){
        //     state.list.pop()
        // },
        // COMPLETE_HEISTORY(state,arr){
        //     arr.forEach(url => state.list.unshift(url))
        // },

    },
    actions:{
        
    }
}

export default history