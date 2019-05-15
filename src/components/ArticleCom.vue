<template>
  <article :class="{'show': articleData.content}">
        <div class="top">
            <div class="title-wrapper" :class="{'favorite': isFavorite}">
                <h1>
                    <span>{{articleData.title}}</span>
                </h1>
            </div>
        </div>
        <div class="info">
            <a :href="articleData.info.sourceLink" target="_blank">
                <span class="source">{{articleData.info.sourceName}}</span>
            </a>
            <span class="time">{{fromNow(articleData.info.time)}}</span>
            
            <span class="favorites" @click="favoritesBtnClick" :class="{'on': isFavorite}" v-if="isLogin">
                <span>收藏</span>
            </span>
        </div>
        <ArticleContent :content="articleData.content" />
    </article>
</template>


<script>
import Moment from 'moment'
import ArticleContent from './ArticleContent'
//Moment.locale('zh-cn')

export default {
    props:[
        'articleData',
        'isFavorite',
        'isLogin',
    ],
    components:{
        ArticleContent,
    },
    methods:{
        fromNow(time){
            return Moment.unix(time).fromNow()
        },
        favoritesBtnClick(){
            this.$emit('favoritesBtnClick')
        }
    },
}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
article{
      min-height: 100vh;
      .bottom-line(#e8e8e8);
      opacity:0;
      transition: opacity .6s;
      .top{
        position: relative;
        width: @48;
        height:@18;
        img{
            width:100%;
            height: 100%;
            object-fit: cover;
        }
        .title-wrapper{
            padding: calc(@3/2) @2;
            position: absolute;
            bottom:0;
            background-color: rgba(255, 255, 255, 0.7);
            width: @48;
            // -webkit-backdrop-filter: blur(0);
            transition: background-color .6s;
            h1{
                color: #000;
                .font-size(35);            
                font-weight: bold;
                .limit-line(2);
                transition: color .6s;
            }
        }
        .title-wrapper.favorite{
            background-color: rgba(0, 0, 0, 0.6);
            // -webkit-backdrop-filter: blur(calc(@1));
            h1{
                color: #fff;
            }
        }
        // .title-wrapper.glass{
        //     // background-color: rgba(255, 255, 255, 0.5);
        //     -webkit-backdrop-filter: blur(@1);
        // }
        // .title-wrapper.glass.favorite{
        //     background-color: rgba(0, 0, 0, 0.6);
        // }
      }
      .info{
        .font-size(23);
        height:@7;
        line-height:@6;
        color:@theme-black;
        .bottom-line(#f5f5f5);
        padding:0 @2;
        background-color: #fff;
        .time{
            margin-left: @1;
        }
        a{
            color: @theme-black;
        }
        .favorites{
          display: inline-block;
          width: @8;
          height:@3;
          line-height:@3;
          margin: calc(@3 / 2) 0;
          float: right;
          background-color:#fff;; 
          text-align:center;
          color: @theme;
          .font-size(23);
          border: 1px solid #e8e8e8;
          //transform: scale(0.5) translateX(@8);
        }
        .favorites.on{
            color: #fff;
            background-color: @theme;
            border-color: @theme;
            &:before{
                content: '已';
            }
        }
      }
      
    }
    article.show{
        opacity:1;
    }
</style>


