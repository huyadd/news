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

</style>
