function timer(finishTime, currentTime, fn){
    let t = setInterval(function(){
        currentTime++
        (finishTime - currentTime >= 0) ? fn(finishTime - currentTime) : clearInterval(t)
    },1000)
}
export default timer