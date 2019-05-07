<template>
  <div class="news">
    <div class="scroll-wrapper" ref="wrapper">
      <div class="list-empty" v-if="show && list.length == 0">还没有历史记录</div>
      <div ref="list">
          <transition-group class="list viewed" :class="{'show': show}"  name="listfade" tag="ul">
            <li class="news-list" v-for="(item, index) in list" :class="{'hide': hide.indexOf(item.id) != -1}"  :key="item.id">
              <router-link :to="{path: '/news/detail/' + item.id}" @click.native.capture="openSwitch">
                <h1>{{item.title}}</h1>
                <!-- <div class="info">
                  <span>今天</span>
                  <span>10:29</span>
                </div> -->
              </router-link>
              <i class="del-icon" @click="delEvent(item.id)"></i>
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
import SmoothScroll from '../module/smoothScroll'
import DisableScroll from '../module/disableScroll'
export default {
  name: 'viewed',
  data () {
    return {
      headerName: '最近浏览',
      list:[],
      listData:[],//??
      hide:[], //hide用于待删除状态，点击删除后，UI需要实时响应，通过hide来暂时隐藏删除的列表，等服务器响应后才会真正删除
      scrollTop: 1,
      show:false,
    }
  },
  computed: {
    viewed(){
      return this.$store.getters.userInfo.viewed
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods:{
    async init(){
      await this.loadData().then(res => {this.show = true})
      this.$refs.wrapper.scrollTop = 1
      SmoothScroll(this.$refs.wrapper, this.$refs.list, () =>{
        this.scrollTop = this.$refs.wrapper.scrollTop
      })
    },
    loadData(){
      return Axios({method: "get", url: "/mock/getlist", data: this.viewed})
      .then(res => {this.list = res.data})
      
    },
    //??
    showData(){
      this.list = this.listData
      this.show = true;
    },
    delEvent(id){
      this.hide.push(id)
      this.$store.dispatch('del_viewed', id)      
    },
    openSwitch(){
      this.$store.commit('OPEN_SWITCHAREABTN')
      // this.$store.getters.processing.switching = true
    }
  },
  activated(){
    this.$refs.wrapper.scrollTop = this.scrollTop
  },
  deactivated(){
    this.hide = []
  },
  watch:{
    viewed:{
      handler(){
        this.loadData()
      }
    },
    deep: true,
    list(){
      if(this.list.length){
        DisableScroll(false)
      }else{
         DisableScroll(true)
      }
    }
  },
}
</script>

<style lang="less"  type="text/less" scoped>
.list li.state{
  border-bottom: none;
}
</style>
