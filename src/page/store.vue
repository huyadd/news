<template>
  <div class="news">
    <transition name="fade">
        <div class="show" @click="tos">{{msg}}</div>
    </transition>
        
  </div>
</template>


<script>
import Vuex from 'vuex'
import Axios from 'axios'

import UserInfo from '../mockdata/userInfo.js'


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  computed: {
    // msg: function(){
    //   return  this.cparagraph()
    // }
  },
  methods:{
    tos(){
      Axios({
        method: "get",
        url: "/mock/login",
        data: {id:2}
      })
      .then(response => {
         console.log(response)
      })
    }
  }
}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
.show{
  .font-size(60);
  color:#999;
  margin-top:@20;
  text-align:center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
