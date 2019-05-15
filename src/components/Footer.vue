<template>
    <div class="footer">
        <p>vue 移动端新闻站点DEMO</p>
        <p>项目源码：<a href="https://github.com/huyadd/news" target="_blank">github.com/huyadd/news</a></p>
    </div>
</template>


<script>
export default {
}
</script>
<style lang="less"  type="text/less">
@import '../assets/css/basis.less';
.footer{
    padding: @1 0;
    height:@20;
    background-color: #f5f5f5;
    border-top:@1 #e8e8e8 solid;
    p{
      line-height:@3;
      .font-size(24);
      color: #ccc;
      text-align: center;
      a{
        color: #ccc
      }
    }
}
</style>

