<template>
  <div class="news">
        <div class="list-empty" v-if="show && list.length == 0">还没有收藏</div>
        <ul class="list favorites" :class="{'show': show}" >
          <li class="news-list" :class="{'pending': pending.indexOf(item.id) != -1}"  v-for="(item, index) in list">
            <router-link :to="'/news/detail/' + item.id">
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
        </ul>
  </div>
</template>


<script>
import Axios from 'axios';

export default {
  name: 'HelloWorld',
  data(){
    return {
      headerName: '收藏',
      list:[],
      listData:[],
      pending:[],
      show:false
    }
  },
  computed: {
    favorites(){
      return this.$store.getters.userInfo.userFavorites
    }
  },
  mounted() {
    this.loadData().then(res => this.showData())

  },
  activated(){
     this.list = this.listData
  },
  deactivated(){
    this.pending = []
  },
  methods:{
    loadData(){
      return Axios({method: "get", url: "/mock/favorites", data: this.favorites})
      .then(res => {this.listData = res.data})
    },
    showData(){
      this.list = this.listData
      this.show = true;
    },
    async delFavorite(id){
      this.pending.push(id)
      //await new Promise(resolve => setTimeout(resolve(),1000) )
      await this.$store.dispatch('del_favorite', id)
      // this.pending.splice(this.pending.indexOf(id), 1)
      
    }
  },
  watch:{
    favorites:{
      handler(){
        this.loadData()
      }
    },
    deep: true
  }
}
</script>

<style lang="less"  type="text/less" scoped>

</style>
