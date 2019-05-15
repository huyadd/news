<template>
     <div class="article-content"  v-html="content"></div>
</template>


<script>
export default {
     props:[
        'content',
    ],
}
</script>
<style lang="less"  type="text/less">
@import '../assets/css/basis.less';
.article-content{
    padding:@2;
    width: @48;
    overflow-x: hidden;
    background-color: #fff;
    vertical-align: center;
    .img-wrap{
      line-height: 0;
      //max-height:@27;
      overflow: hidden;
      img{
        width:@44;
      }
    }
    p{
      .font-size(28);
      line-height:@3 * 1.1;
      color:#333;
      margin-bottom:@3 * 1.1;
      a{
            color: #333;
            font-weight: bold;
        }
      
    }
    blockquote{
        position: relative;
        width:@44;
        margin: 0;
        padding: @2;
        background-color: #f8f8f8;
        margin-bottom:@3;
        p{
            color: #666;
            margin-bottom:0;
            
        }
    }
    .editor-image-source{
        padding: @1;
        margin-top: -@3 * 1.1;
        margin-bottom: @3;
        background-color: #f5f5f5;
        .font-size(24);
        color: @theme-black;
        p{
            .font-size(24);
            color: @theme-black;
            margin:0;
        }
    }
  }
</style>

