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
@import '../assets/css/basis.less';
.go-top{
    // display: none;
    position: fixed;
    bottom:@1;
    right: @1;
    width: @6;
    height: @6;
    background-color: rgba(0,0,0,.4);
    border-radius: 100%;
    transition: opacity .4s;
    -webkit-backdrop-filter: blur(@1/2);
    &:before{
        content:"";
        .go-top-icon;
    }
}

</style>
