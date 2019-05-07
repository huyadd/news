//解决iOS上，在容器内滚动时因-webkit-overflow-scrolling:touch导致有时划动卡住的问题
export default (wrapper, content, callback) => {
    ;['touchend', 'scroll'].forEach(event => wrapper.addEventListener(event, () => {      
        if(wrapper.scrollTop == 0) wrapper.scrollTop ++
        else if(wrapper.scrollTop >= content.clientHeight - wrapper.clientHeight) {
            wrapper.scrollTop = content.clientHeight - wrapper.clientHeight - 1
        }
        if(callback){
            callback()
        }
    }))
}