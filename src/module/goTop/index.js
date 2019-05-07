export default (wrapper, speed = 0.75) => {
    let timer = setInterval(() => {
        wrapper.scrollTop = Math.floor(wrapper.scrollTop * speed)
        if(wrapper.scrollTop <= 1){
            wrapper.scrollTop = 1
            clearInterval(timer)
        }
      }, 16)
}