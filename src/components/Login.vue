<template>
  <div class=" login">
    <div class="box" :class="{logging: isLogging}">
      <div class="input-group tel">
        <input type="tel" placeholder="请输入手机号" v-model="mobile" @input="inputVerification" @focus="focusMobleVerification" @blur="blurVerification">
        <div class="warn">
          <transition name="message-fade">
            <span v-if="mobileErrMessage">{{mobileErrMessage}}</span>
          </transition>
        </div>
      </div>
      <div class="input-group code">
        <input type="text" placeholder="请输入验证码" v-model="code" @focus="focusCodeVerification">
        <a href="##"  class="timing" v-if="timing">{{ timing }}s可重新发送</a>
        <a href="##" class="send"  @click="sendVerificationCode(60)" v-else>发送验证码</a>
        <div class="warn">
          <transition name="message-fade">
            <span v-if="codeErrMessage">{{codeErrMessage}}</span>
          </transition>
        </div>
      </div>
      <a class="main-button" :class="{logging: isLogging}" @click="loginBeforeEach">登  录</a>
      <!-- <a class="main-button logging" v-else>登  录</a> -->
      <div class="text">未注册手机验证后自动注册</div>
    </div>
    <div class="logging-layer" v-if="isLogging">
      <div class="wait-logging"></div>
    </div>
  </div>
</template>

<script>
import Verification from '../module/verification'
import Timer from '../module/timer'

import SetQuery from '../module/routeParse/setQuery.js'

//手机正则验证，inputReg用于输入过程实时验证，endReg用于输入完成
const inputReg = /^1[3|4|5|8][0-9]\d{0,8}$/;
const endReg = /^1[3|4|5|8][0-9]\d{8}$/;

export default {
  name: 'login',
  data () {
    return {
      mobile:'',
      mobileErrMessage:'',
      code:'',
      codeErrMessage:'',
      timing:'',
    }
  },
  computed: {
    isLogging(){
      return this.$store.getters.processing.logging
    },
    mobileVerification(){
       return Verification(this.mobile)
    },
    codeVerification(){
       return Verification(this.code)
    },
    storeFinishTime(){
      return this.$store.state.storage.finishTime
    }
  },
  methods:{
    focusMobleVerification(){
      this.mobileErrMessage = ''
    },
    inputVerification(){
      this.mobileErrMessage = this.mobileVerification(inputReg, '手机格式不正确', this.mobile.length > 2)
    },
    blurVerification(){
      this.mobileErrMessage
      ? ''
      : this.mobileErrMessage = this.mobileVerification(endReg, '请输入完整的手机号', this.mobile.length)
    },
    focusCodeVerification(){
      this.codeErrMessage = ''
    },
    loginBeforeEach(){
      if(!this.isLogging){
        this.mobileErrMessage
        ? ''
        : this.mobileErrMessage = this.mobileVerification(/\S+/, '没有手机号不能登录')
        ;
        this.codeErrMessage
        ? ''
        : this.codeErrMessage = this.codeVerification(/\S+/, '验证码不能为空')
        //登录
        if(this.mobileErrMessage == '' && this.codeErrMessage == ''){
          this.login({mobile:this.mobile, code: this.code})
        }
      }
    },
    async login(loginData){
      await this.$store.dispatch('login', loginData)
      this.$router.replace(SetQuery.remove(this.$route.fullPath, 'loginBox'))
      this.mobile = this.code = ''

    },
    updateTiming(newTiming){
      this.timing = newTiming
    },
    sendVerificationCode(n=0){
      let currentTime = parseInt(new Date().getTime() / 1000)
      this.$store.commit('CHANGE_FINISHTIME', this.storeFinishTime - currentTime > 0  ? this.storeFinishTime : currentTime + n)
      this.timing = this.storeFinishTime - currentTime
      Timer(this.storeFinishTime, currentTime, this.updateTiming)
    },
  },
  mounted(){
    this.sendVerificationCode()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/basis.less';
.message-fade-enter-active.message-fade-enter{
  transform: translateY(-@4);
  opacity: 0;
}
.message-fade-enter-active{
  transform: translateY(0);
  opacity: 1;
}

.message-fade-leave-active.message-fade-leave{
  transform: translateY(0);
}
.message-fade-leave-active{
  transform: translateY(-@4);
  opacity: 0;
}


</style>
