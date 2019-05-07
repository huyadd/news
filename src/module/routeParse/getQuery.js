//输入url,输出查询参数构成的对象,没有查询参数则返回空对象
export default url => {
    let obj = {}, query = []
    if(query = url.match(/[?&]([^=&#]+)=([^&#]*)/g)){
        query.map(str => {
            let _arr = str.slice(1).split('=')
            obj[_arr[0]] = _arr[1]
        })
    }
    return obj
}