<template>
  <div class="detail" ref="content">
    <div class="cover" ref="cover" :class="{'show': article.cover}">
      <img :src="article.cover" />
    </div>
    <div class="scroll-wrapper" ref='wrapper'>
      <div ref="detailContent">
        <div ref="article">
          <ArticleCom 
            :articleData="article" 
            :isFavorite="isFavorite" 
            :isLogin="isLogin"
            @favoritesBtnClick="favorite"
          />
        </div>
        <div class="news"  ref='snews'>
          <div class="title">
            <span>相关新闻</span>
          </div>
          <List :listState="list" @linkClick="openMove" />
          <div class="footer">
            <p>vue 移动端新闻站点DEMO</p>
            <p>项目源码：<a href="https://github.com/huyadd/news" target="_blank">github.com/huyadd/news</a></p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <GoTopButton @goTop="goTop" v-if="scrollTop >= articleHeight" />
    </transition>
    
  </div>
</template>


<script>
import ArticleCom from '../components/ArticleCom'
import List from '../components/List'
import GoTopButton from '../components/GoTopButton'
import GoTop from '../module/gotop'
import SmoothScroll from '../module/smoothScroll'
import Axios from 'axios'

export default {
  name: 'Detail',
  components:{
    ArticleCom,
    List,
    GoTopButton,
  },
  data () {
    return {
      article: {
        cover: '',
        title:'',
        info:{
          time:'',
          sourceName:''
        },
        content:''
      },
      list:{
        data:[],
        loading: false,
        complete: true,
      },
      scrollTop: 1,
      articleHeight:999,
      // isFavorite: false
    }
  },
  computed: {
    newsId(){
      return this.$route.params.id
    },
    favorites(){
      return this.$store.getters.userInfo.userFavorites
    },
    isFavorite(){
      return this.favorites.indexOf(this.newsId) != -1
    },
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  methods:{
    async init(){
      this.$refs.wrapper.scrollTop = 1
      await Axios({method: "get", url: "/mock/article", data: this.newsId})
      .then(res => this.article = res.data)
      await Axios({method: "get", url: "/mock/news/related"})
      .then(res => this.list.data = res.data)

      SmoothScroll(this.$refs.wrapper, this.$refs.detailContent, () => {
        this.scrollTop = this.$refs.wrapper.scrollTop
        if(this.scrollTop < 0){
          this.$refs.cover.style.height = 'calc(37.5vw - 1px + '+ Math.abs(this.scrollTop) +'px)'
        }
      })
      this.articleHeight = this.$refs.article.clientHeight - this.$refs.wrapper.clientHeight
      //document.body.addEventListener('dblclick', function(){alert(1)})

      // setInterval(()=> {
      //   console.log(this.favorites)
      // }, 1000)
    },
    goTop(){
      GoTop(this.$refs.wrapper)
    },
    favorite(){
      if(this.isFavorite){
        this.$store.dispatch('del_favorite', this.newsId)
        //.then(res => {this.isFavorite = this.favorites.indexOf(this.newsId) != -1})
      }else{
        this.$store.dispatch('add_favorite', this.newsId)
        //.then(res => {this.isFavorite = this.favorites.indexOf(this.newsId) != -1})
      }
      
    },
    openMove(){
      this.$store.commit('OPEN_MOVING')
    }
  },
  mounted(){
    // this.isFavorite = this.favorites.indexOf(this.newsId) != -1
    this.$nextTick(() => {
      this.init()
    })

    // setInterval(() => {
    //   console.log(this.isFavorite)
    // },1000)
  },
  //通过返回进入页面时，让滚动条保持在原来的位置
  activated(){
    // this.isFavorite = this.favorites.indexOf(this.newsId) != -1
    //这里只有通过右上角返回按钮返回上一条新闻时，滚动条才会保持，手势返回则不能，后面可能修改完善
    if(this.$store.getters.processing.backing){
      this.$refs.wrapper.scrollTop = this.scrollTop
    }else{
      this.$refs.wrapper.scrollTop = this.scrollTop = 1
    }
  },
  //离开时添加浏览记录
  beforeRouteLeave(to, from , next){
    if(this.isLogin){
      this.$store.dispatch('add_viewed', this.newsId)
    }
    next()
  }
  // deactivated(){
  //   this.scrollTop = this.$refs.wrapper.scrollTop
  // },


}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
@import '../assets/css/layout.less';



</style>
