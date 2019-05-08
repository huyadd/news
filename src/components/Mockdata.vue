<script>
//这里只提供调试和演示使用的模拟数据

/*------------------伪数据--------------------*/
import Mock from 'mockjs'
import UserInfo from '../mockdata/userInfo.js'
import NewsList from '../mockdata/newsList.js'
import Article from '../mockdata/article.js'


Mock.mock('/mock/login', function(option){
    return {userInfo: UserInfo, token: 'FCzN3liFUd1SALdx'}
})
Mock.mock('/mock/news/all', function(option){
    return NewsList.slice(option.body * 6, (option.body + 1) * 6)
})
Mock.mock('/mock/news/recommend', function(option){
    return NewsList.slice(9, 19).slice(option.body * 6, (option.body + 1) * 6)
    // return NewsList.slice(19, 29).slice(option.body * 6, (option.body + 1) * 6)
})
Mock.mock('/mock/news/hot', function(option){
    return NewsList.slice(19, 29).slice(option.body * 6, (option.body + 1) * 6)
})
Mock.mock('/mock/news/related', function(option){
    return [1,4,5,6,8,9].map(index => NewsList[index])
})
Mock.mock('/mock/article', function(option){
    return Article[option.body]
})
Mock.mock('/mock/favorites', function(option){
    return JSON.parse(option.body).map(item => NewsList.filter(list => list.id == item)[0])
})
Mock.mock('/mock/favorites/del', function(option){
    return true
})
Mock.mock('/mock/favorites/add', function(option){
    return true
})
Mock.mock('/mock/getlist', function(option){
    console.log(option.body)
    return JSON.parse(option.body).map(item => NewsList.filter(list => list.id == item)[0])
})
Mock.mock('/mock/viewed/del', function(option){
    return true
})
Mock.mock('/mock/viewed/add', function(option){
    return true
})
Mock.setup({
    timeout: '200'
})


/*------------------伪数据---------------------*/
export default {
    name: 'mockdata'
}
</script>