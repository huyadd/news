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
@import '../assets/css/basis.less';
.user{
    height:100vh;
    // background-color: #f5f5f5;
    overflow: hidden;
    .photoWrap{
        width: @22;
        height: @22;
        margin: 8vh @13 @1 @13;
        .photo{
            border-radius: 100%;
            overflow: hidden;
            padding: @3 /2;
            background-color: @theme;
            img{
                width: @19;
                height: @19;
                border-radius: 100%;
            }
        }
        .photo.magnifier{
            animation: magnifier 1.2s;
        }
        @keyframes magnifier {
            0% {transform: scale(0)}
            50% {transform: scale(0)}
            80% {transform: scale(1.05)}
            100% {transform: scale(1)}
        }
    }
    
    .name{
        height:@5;
        line-height: @5;
        color: @theme-black;
        .font-size(42);
        text-align: center;
    }
    .introduction{
        height:@4;
        line-height: @4;
        color: #ccc;
        .font-size(24);
        text-align: center;
        margin-bottom: @2;
    }
    .nav{
        a{
            display: block;
            height:@4;
            line-height: @4;
            color: @theme;
            .font-size(27);
            text-align: center;
            margin-bottom: @1;
        }
    }
    .main-button{
        position: fixed;
        bottom:0;
        display: block;
        width: @36;
        height:@6;
        line-height: @6;
        color: #fff;
        .font-size(30);
        margin: @6;
    }
}
</style>
