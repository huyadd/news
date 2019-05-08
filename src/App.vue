<template>
  <div id="app" :class="['page-' + pageName, {'login-box':loginBox}]" >
    <HeaderBar @headerStateClick="stateChange" class="class30"/>
    <div class="class30"></div>
    <transition type="transition"  :name="transitionName">
      <keep-alive>
          <router-view class="content page-transition"  :key="indexKey" :data-kk="indexKey"></router-view>
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
import Mockdata from './components/Mockdata.vue'
import HeaderBar from './components/HeaderBar.vue'
import Login from './components/Login.vue'
import News from './page/News.vue'
import Detail from './page/Detail.vue'
import RouteParse from './module/routeParse'

import removeQuery from './module/routeParse/removeQuery.js'

export default {
  name: 'App',
  components:{
    HeaderBar,
  },
  data(){
    return {
      state:false,
      backUrl: '',
    }
  },
  computed: {
    pageName(){
      return this.$store.getters.pageInfo.name
    },
    loginBox(){
      return this.$store.getters.storage.loginBox
    },
    transitionName(){
      return this.$store.state.pageInfo.direction
    },
    indexKey(){
      return removeQuery(this.$route.fullPath, 'loginBox')
    }
    
  },
  methods: {
    stateChange(){}
  },
  mounted() {
     //补全history记录中的url，使得不从首页，而是从其中某个页面进入站点访问时，仍可以返回上一级和首页
     //这个方法真的是一点可读性都没有。。
    let arr = RouteParse(this.$route.path)

    //let completeUrl
    
    if(arr[0] && arr[1]){
      // alert('xx user')
      this.$store.commit('ADD_HISTORY', {url:'/user', area:'user'})
      this.$store.commit('ADD_HISTORY', {url:'/news', area:'news'})
    }else if(arr[0] || arr[1] || this.loginBox){
      // console.log('xx')
      this.$store.commit('ADD_HISTORY', {url:'/news', area:'news'})
    }

    if(this.$store.getters.storage.token){
      console.log('登录！！！！！！！！！！！！！')
      this.$store.dispatch('login', this.$store.getters.storage.token)
    }

  },
  watch: {
    $route(){
    }
  },
  
}


</script>

<style lang="less"  type="text/css">

/*CSS Reset*/
html {
  font-size: 0;
  margin: 0;
  font-family: 'PingFangSC-Regular', 'STHeiti', 'Microsoft YaHei', Helvetica, Arial;
  -webkit-tap-highlight-color:rgba(0,0,0,.03);
}
div,
form,
acronym,
img,
ul,
ol,
li,
dl,
dt,
dd,
header {
  margin: 0;
  padding: 0;
  border: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0 ;
  font-weight: 100;
}
body {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 0 ;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  overscroll-behavior-y: contain;
  overflow: hidden;
}
a {
  text-decoration: none;
}
*{
    box-sizing: border-box;
}
input{
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}
::placeholder{
  color: #ddd;
}



@import './assets/css/basis.less';
@import './assets/css/layout.less';

</style>
  