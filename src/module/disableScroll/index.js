//禁止滚动，用于阻止ios橡皮筋效果

const eventPreventDefault = e => {
    console.log("can't touch")
    return e.preventDefault()
}

export default function(boole, msg='未知'){
    console.log('执行了！')
    console.log(boole)
    console.log("来自：" + msg)
    document.body[(boole ? 'add' : 'remove') + 'EventListener']('touchmove', eventPreventDefault, {passive: false})
}