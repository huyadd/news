//*区域（area）在这里指新闻（news）和个人中心（user）这两个区块

//输出一个数组
//第一个值为区域间变换，1为从news到user，-1从user到news，0为同区域内的页面跳转。路由过渡动效需要依此为依据决定运动方向
//第二个值为跳转页面的深度，0为首页，1为第一级子页面，以此类推..

import AreaList from './areaConfig'

let filter = path => path.split('/').filter(x => x)
let area = (areaName, areaList) => areaList.indexOf(areaName)
let transform = (path, filter, area, areaList) => [area(filter(path)[0], areaList), filter(path).length - 1]

export default (to, from='/') => {
    let _to = transform(to, filter, area, AreaList)
    
    let _from = from == '/' ? [0, 0] : transform(from, filter, area, AreaList)
    
    return [_to[0] - _from[0], _to[1]]
}