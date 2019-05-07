<template>
  <header >
    <div class="main">
      <a id="back-btn" class="back-icon" :data-disable="disable" @click="goBack"></a>
      <transition :name="transitionName">
        <span class="title title-transition" :key="headerTitle">{{headerTitle}}</span>
      </transition>
      
      <!-- <router-link id="state-btn" to="/user"  class="login-current-icon" @click.native="goSwitchArea"></router-link> -->
      <a id="state-btn" class="login-current-icon" @click="goSwitchArea"></a>
      <!-- <a id="state-btn" :class="loginBox ? 'login-current-icon' : 'login-icon'"  @click="stateClick" v-else ></a> -->
    </div>
    <Login></Login>
  </header>
</template>

<script>
import Router from '../router'
import Vuex from 'vuex'
import Login from './Login'
import DisableScroll from '../module/disableScroll'
import SetQuery from '../module/routeParse/setQuery.js'

export default {
  name: 'header-bar',
  components:{
    Login,
  },
  data () {
    return {
      //login: false,
    }
  },
  computed: {
    isLogin(){
      return this.$store.getters.isLogin
    },
    loginBox(){
      return this.$store.getters.storage.loginBox
    },
    backUrl(){
      return this.$store.getters.backUrl
    },
    loginBoxTransitionName(){
      return this.loginBox ? 'loginUp' : 'loginDown'
    },
    headerTitle(){
      return this.loginBox ? '用户登录' : this.$store.getters.pageInfo.title
    },
    area(){
      return this.$store.getters.pageInfo.area
    },
    showBackBtn(){
      return Boolean(this.backUrl)
    },
    disable(){
      return !(this.showBackBtn || this.loginBox)
    },
    switchAreaUrl(){
      return this.$store.getters.switchAreaUrl
    },
    transitionName(){
        return this.$store.getters.pageInfo.direction
        // return this.isLogin ? this.$store.state.current.direction : this.loginBoxTransitionName
    },
  },
  methods: {
    stateClick(){

      
    },
    //window.history.go(-1);
    showCname(path){
      console.log(this.$store.state)
    },
    goBack(){
      if(this.disable){
        return false
      }else{
        // let history = this.$store.state.history.list
        // let backUrl = history[history.length - 1]
        //console.log(this.$store.state.history.list)
        this.$store.commit('OPEN_BACKBTN')
        if(this.loginBox){
          this.$router.replace(this.$store.getters.pageInfo.path)
        }else{
          this.$router.replace(this.backUrl)
        }
        
        //this.$router.go(-1)
        return false
      }
    },
    goSwitchArea(){
      this.$store.commit('OPEN_SWITCHAREABTN')
      this.$router.push(this.switchAreaUrl)
    },
    
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.$store.state.pageInfo.direction)
    // }, 200);
  },
  watch:{
    $route(to, from){
      // console.log(this.$store.getters.$.isLogin)
    },
    loginBox(){
      if(this.loginBox){
        DisableScroll(true, 'HeaderBar')
      }else{
        DisableScroll(false, 'HeaderBar')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/basis.less';
// .title{
//   transition: transform .6s;
// }
// .fade-enter-active.fade-enter{
//   transform:translateY(@6)
// }
// .fade-enter-active {
//   transform:translateY(0)
// }

// .fade-leave-active.fade-leave{
//   transform:translateY(0)
// }
// .fade-leave-active {
//   transform:translateY(-@6)
// }


</style>
