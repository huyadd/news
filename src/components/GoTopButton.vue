<template>
  <div class="go-top" @click="goTop">

  </div>
</template>


<script>


export default {
    methods:{
        goTop(){
            this.$emit('goTop')
        }
    }
}
</script>

<style lang="less"  type="text/less" scoped>



</style>
