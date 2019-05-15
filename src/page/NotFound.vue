<template>
  <div class="notfound"><span>页面不存在</span></div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      headerName: '页面不存在',
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/basis.less';
.notfound{
    height:100vh - @7;
    // background-color: #ebebeb;
    .font-size(33);
    color:#999;
    margin: auto;
    text-align:center;
    span{
        position: relative;
        top:40%;
    }
}

</style>
