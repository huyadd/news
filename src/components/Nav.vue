<template>
  <nav class="nav">
    <div class="main">
      <a href="##" :class="{'active': active == 'all'}" @click="changeNewsType('all')">综合</a>
      <a href="##" :class="{'active': active == 'recommend'}"  @click="changeNewsType('recommend')">推荐</a>
      <a href="##" :class="{'active': active == 'hot'}"  @click="changeNewsType('hot')">热门</a>
    </div>
  </nav>
</template>


<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      active: 'all'
    }
  },
  methods:{
    changeNewsType(n){
      if(n == this.active){
        return false
      }
      this.active = n
      this.$emit('changeNewsType', n)
    }
  }
}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
nav{
    position: absolute;
    top:@6;
    left:0;
    z-index:9;
    height:@6;
    .main{
        width: 100vw;
        height:@6;
        background-color:#ebebeb; 
        a{
            .a-button;
            width:@16;
            height:@6;
            line-height:@6;
            .font-size(33);
            color:@theme-black;
            &.active{
                color:@theme;
                background-color:#f5f5f5;
            }
        }
    }
}
</style>
