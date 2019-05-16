<template>
  <div class="news" ref="content">
        <Nav @changeNewsType="changeNewsType"></Nav>
        <div class="news-wrap">
          <div class="list-box" :class="[newsType]">
            <NewsList :listState="all" :newsType="newsType" class="scroll-wrapper all" key="all" @loadData="loadListData('all', all.page + 1)"  @linkClick="openMove" v-show="newsType == 'all' || !$store.getters.processing.backing"/>
            <NewsList :listState="recommend"  :newsType="newsType" class="scroll-wrapper recommend" key="recommend"  @loadData="loadListData('recommend', recommend.page + 1)"  @linkClick="openMove"  v-show="newsType == 'recommend' || !$store.getters.processing.backing"/>
            <NewsList :listState="hot"  :newsType="newsType" class="scroll-wrapper hot" key="hot"  @loadData="loadListData('hot', hot.page + 1)"  @linkClick="openMove"  v-show="newsType == 'hot' || !$store.getters.processing.backing"/>
            <!-- 上面backing时不显示，是为了解决个别浏览器在这个动画时出现细微抖动的问题,在NewsList内会监听newsType发生变化时，才会显示并scrollTop到原来的位置，虽然是小问题，涉及到的改动比较多 -->
          </div>
        </div>
  </div>
</template>


<script>
import Nav from '../components/Nav'
import NewsList from '../components/NewsList'
//import DisableScroll from '../module/disableScroll'
import Axios from 'axios'

export default {
  name: 'HelloWorld',
  components:{
    Nav,
    NewsList
  },
  data () {
    return {
      newsType:'all',
      all:{
        listName: 'all',
        data:[],
        loading: false,
        page:0,
        complete: false,
      },
      recommend:{
        listName: 'recommend',
        data:[],
        loading: false,
        page:0,
        complete: false,
      },
      hot:{
        listName: 'hot',
        data:[],
        loading: false,
        page:0,
        complete: false,
      },
    }
  },
  methods: {
    //newsType 新闻类型（综合、推荐、热门）
    //page为0时重载列表，非0时在原列表基础上新增数据
    loadListData(newsType, page){
      this[newsType].loading = true
      this[newsType].page = page

      return Axios({method: "get", url: "/mock/news/" + newsType, data: page})
      .then(res => {
        if(res.data.length < 6){
          this[newsType].complete = true
        }
        this[newsType].data = this[newsType].data.concat(res.data)
        this[newsType].loading = false
      })
    },
    changeNewsType(newsType){
      this.newsType = newsType

    },
    openMove(){
      this.$store.commit('OPEN_MOVING')
    }
  },
  mounted(){
    ['all', 'recommend', 'hot'].forEach(item => {
      this.loadListData(item, 0)
    })
  },
  watch:{
    
  }
  
}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
//新闻列表
.news{   
    overflow:hidden;
    .title{
        height: @6;
        line-height:@6;
        padding-left: @1;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        span{
            line-height:@6;
            .font-size(30);
            font-weight:bold;
            color:@theme-black;
        }
    } 
    .page-loading{
        padding-top:33vh;
    }
    
    .news-wrap{
        height: calc(100vh - @12);
        margin-top: 12.5vw;
        overflow-x: hidden;
        // -webkit-transform-style:flat;
        .list-box{
            width: @48 * 3;
            height: calc(100vh - @12);
            // transform: translateX(-@24);
            transition: transform .4s;
            will-change: transform;
            // -webkit-transform-style:flat;
            .scroll-wrapper{
                position: absolute;
                top:0;
                display: inline-block;
                width: @48;
                height: calc(100vh - @12);
            }
            .scroll-wrapper.all{
                left: 0;
            }
            .scroll-wrapper.recommend{
                left: @48;
            }
            .scroll-wrapper.hot{
                left: @96;
            }
        }
        .list-box.all{
            transform: translateX(0);
        }
        .list-box.recommend{
            transform: translateX(-@48);
        }
        .list-box.hot{
            transform: translateX(-@96);
        }
    }
}

.news.login{
    margin-top:@54;
    nav{
        top:@54;
    }
}
</style>
