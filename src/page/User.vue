<template>
  <div class="user">
        <div class="photoWrap">
          <div class="photo" :class="{magnifier: magnifier}">
            <img :src="photo" alt="">
          </div>
        </div>
        <div class="name">{{userName}}</div>
        <div class="introduction">{{introduction}}</div>
        <div class="nav">
          <router-link to="/user/info">修改个人资料</router-link>
          <router-link to="/user/favorites">我的收藏</router-link>
          <router-link to="/user/viewed">最近浏览</router-link>
          <!-- <router-link to="/news">退出登录</router-link> -->
          <a  @click="logout">退出登录</a>
        </div>
  </div>
</template>


<script>
import Vuex from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      headerName: '用户中心',
      //magnifier为放大头像动画，暂时不用
      magnifier:true,
    }
  },
  computed: {
    ...Vuex.mapState({
      photo: state => state.userInfo.photo,
      userName: state => state.userInfo.userName,
      introduction: state => state.userInfo.introduction,
    }),

  },
  methods:{
    logout(){
      this.$store.commit('OPEN_BACKBTN')
      this.$router.replace(this.$store.getters.backUrl)
      this.$store.commit('RESET_USER_INFO')
      this.$store.commit('DEL_TOKEN')
      
    }
  },
  mounted(){
    setTimeout(() => {
      this.magnifier = false
    }, 1500)
  }
}
</script>

<style lang="less"  type="text/less" scoped>

</style>
