<template>
    <div class="verification">
      <div></div>
      <a href=""></a>
      <a href="" class="main-button">验证</a>
    </div>
</template>


<script>
import Vuex from 'vuex'
import DisableScroll from '../module/disableScroll'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{

  },
  mounted(){
    DisableScroll(true)
  },
  destroyed() {
    DisableScroll(false)
  },
}
</script>

<style lang="less"  type="text/less" scoped>

</style>
