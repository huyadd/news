let newMessage = {
    state: {
        number:0
    },
    mutations:{
        add(state,n){
           state.number += n
        },
        clear(state){
            state.number = 0
        }
    },
    actions:{
        //增加新消息提示
        async addNewMessage(context,n=1){
            let timeout = ms => new Promise((resolve) => {
                setTimeout(resolve, ms);
            })
            await timeout(500)
            context.commit('add',n)
        },
        
        //清除新消息提示
        claerNewMessage(context){
            context.commit('clear')
        }
    }
}

export default newMessage