<template>
  <div class="news">
    <div class="scroll-wrapper" ref="wrapper">
      <div class="list-empty" v-if="show && list.length == 0">还没有收藏</div>
      <div  ref="list">
        <transition-group class="list favorites" :class="{'show': show}"  name="listfade" tag="ul">
          <li class="news-list" v-for="(item, index) in list" :class="{'hide': hide.indexOf(item.id) != -1}"  :key="item.id">
            <router-link :to="{path: '/news/detail/' + item.id}" @click.native.capture="openSwitch">
                <div class="img">
                  <img :src="item.imgs[0].src" />
                </div>
              <h1>{{item.title}}</h1>
              <div class="info">
                <span>{{item.author}}</span>
              </div>
            </router-link>
            <i class="del-icon" @click="delFavorite(item.id)"></i>
          </li>
          <li class="state" key="state" v-if="list.length > 5">
              <span>没有更多了</span>
          </li>
        </transition-group>
        
      </div>
    </div>
  </div>
</template>


<script>
import Axios from 'axios';
import GetArea from '../module/routeParse/getArea.js'
import SmoothScroll from '../module/smoothScroll'
import DisableScroll from '../module/disableScroll'

export default {
  name: 'HelloWorld',
  data(){
    return {
      headerName: '收藏',
      list:[],
      listData:[],
      hide:[], //hide用于待删除状态，点击删除后，UI需要实时响应，通过hide来暂时隐藏删除的列表，等服务器响应后才会真正删除
      scrollTop: 1,
      show:false,
    }
  },
  computed: {
    favorites(){
      return this.$store.getters.userInfo.userFavorites
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    //this.loadData().then(res => {this.show = true})
    

  },
  activated(){
    console.log('进入了favorites')
    this.$refs.wrapper.scrollTop = this.scrollTop
  },
  deactivated(){
    this.hide = []
  },
  methods:{
    async init(){
      //DisableScroll(true)
      await this.loadData().then(res => {this.show = true})
      this.$refs.wrapper.scrollTop = 1
      SmoothScroll(this.$refs.wrapper, this.$refs.list, () =>{
        this.scrollTop = this.$refs.wrapper.scrollTop
      })
    },
    loadData(){
      console.log('执行了loadData')
      return Axios({method: "get", url: "/mock/favorites", data: this.favorites})
      .then(res => {this.list = res.data})
    },
    showData(){
      this.list = this.listData
      this.show = true;
    },
    async delFavorite(id){
      this.hide.push(id)
      //await new Promise(resolve => setTimeout(resolve(),1000) )
      await this.$store.dispatch('del_favorite', id)
      //this.hide.splice(this.hide.indexOf(id), 1)
      
    },
    openSwitch(){
      this.$store.commit('OPEN_SWITCHAREABTN')
      // this.$store.getters.processing.switching = true
    }
  },
  watch:{
    favorites:{
      handler(){
        this.loadData()
      }
    },
    deep: true,
    // list(){
    //   if(this.list.length){
    //     DisableScroll(false, 'favorites')
    //   }else{
    //      DisableScroll(true, 'favorites')
    //   }
    // }
  },
  // beforeRouteLeave(to, from, next){
  //   if(GetArea(to.path) == 'news'){
  //     this.$store.commit('OPEN_SWITCHAREABTN')
  //   }
  //   next()
  // }
}
</script>

<style lang="less"  type="text/less" scoped>
.list li.state{
  border-bottom: none;
}
</style>
