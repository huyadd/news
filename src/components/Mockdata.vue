<script>
//模拟后台返回数据的接口

import Mock from 'mockjs'
import UserInfo from '../mockdata/userInfo.js'
import NewsList from '../mockdata/newsList.js'
import Article from '../mockdata/article.js'
import Store from '../store/index.js'

//登录
Mock.mock('/mock/login', function(option){
    let _userInfo = Object.assign(UserInfo, {
        userName: Store.getters._mock_userName,
        introduction: Store.getters._mock_introduction,
        viewed: Store.getters._mock_viewed,
        userFavorites: Store.getters._mock_userFavorites,
    })
    console.log('sfd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(_userInfo)
    return {userInfo: _userInfo, token: 'FCzN3liFUd1SALdx'}
})
//首页列表-综合
Mock.mock('/mock/news/all', function(option){
    return NewsList.slice(option.body * 6, (option.body + 1) * 6)
})
//首页列表-推荐
Mock.mock('/mock/news/recommend', function(option){
    return NewsList.slice(9, 19).slice(option.body * 6, (option.body + 1) * 6)
    // return NewsList.slice(19, 29).slice(option.body * 6, (option.body + 1) * 6)
})
//首页列表-热门
Mock.mock('/mock/news/hot', function(option){
    return NewsList.slice(19, 29).slice(option.body * 6, (option.body + 1) * 6)
})
//相关新闻
Mock.mock('/mock/news/related', function(option){
    return [1,4,5,6,8,9].map(index => NewsList[index])
})
//新闻详情
Mock.mock('/mock/article', function(option){
    return Article[option.body]
})
//收藏列表
Mock.mock('/mock/favorites', function(option){
    return JSON.parse(option.body).map(item => NewsList.filter(list => list.id == item)[0])
})
//更改用户信息
Mock.mock('/mock/userinfo', function(option){
    Store.commit('_MOCK_CHANGE_INFO', {userName: Store.getters.userInfo.userName, introduction: Store.getters.userInfo.introduction})
    return true
})
//删除收藏
Mock.mock('/mock/favorites/del', function(option){
    Store.commit('_MOCK_SET_FAVOROTES', Store.getters.userInfo.userFavorites)
    return true
})
//添加收藏
Mock.mock('/mock/favorites/add', function(option){
    Store.commit('_MOCK_SET_FAVOROTES', Store.getters.userInfo.userFavorites)
    return true
})
//根据新闻id返回新闻列表
Mock.mock('/mock/getlist', function(option){
    console.log(option.body)
    return JSON.parse(option.body).map(item => NewsList.filter(list => list.id == item)[0])
})
//删除浏览记录
Mock.mock('/mock/viewed/del', function(option){
    Store.commit('_MOCK_SET_VIEWED', Store.getters.userInfo.viewed)
    return true
})
//添加浏览记录
Mock.mock('/mock/viewed/add', function(option){
    Store.commit('_MOCK_SET_VIEWED', Store.getters.userInfo.viewed)
    return true
})
//模拟请求延迟
Mock.setup({
    timeout: '200'
})


/*------------------伪数据---------------------*/
export default {
    name: 'mockdata'
}
</script>