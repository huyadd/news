import GetQuery from './getQuery.js'
import GetPath from './getPath.js'

export default (url, key) => {
    let queryObj = GetQuery(url)
    delete queryObj[key]

    let _path = GetPath(url)
    let _query = Object.keys(queryObj).map(key => `${key}=${queryObj[key]}`).join('&')
    
    return _query ? _path + '?' + _query : _path
}