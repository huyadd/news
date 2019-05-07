import GetPath from './getPath.js'
import GetQuery from './getQuery.js'

//对url的查询参数进行操作，返回一个可供vue路由push、replace以及导航守卫的next方法使用的导航对象,使用next方法时默认添加replace: true属性
//add: 添加特定参数
//remove: 删除特定参数
//clear： 清除所有参数
export default {
    add: (url, query, replace = true) => ({path: GetPath(url), query: Object.assign(GetQuery(url), query), replace: replace}),
    remove: (url, key, replace = true) => {
        let queryObj = GetQuery(url)
        delete queryObj[key]
        return {path: GetPath(url), query:queryObj, replace: replace}
    },
    clear: (url, replace = true) => ({path: GetPath(url), replace: replace})
}