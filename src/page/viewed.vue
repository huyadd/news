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
@import '../assets/css/basis.less';
//从之前统一的列表css中抽取出来的，需要重新简化
//列表
.list{
    min-height: 101%;
    background-color: #fff;
    padding-bottom: @10;
    opacity: 0;
    transition: opacity .4s;
    li.news-list{
        // transition: opacity .5s;
        // opacity: 1;
        .bottom-line(#f5f5f5);
        // animation: fade .5s forwards ;

        
        a{
            display: inline-block;
            width:@46;
            margin-left:@1;
            margin-right: @1;
            h1{
                .table;
                line-height:@3;
                padding-top:@3 / 2;
                padding-bottom:@3 / 2;
                .font-size(30);
                color:#333;
                span{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .img{
                height:@9;
                .img-wrap{
                    width:@1 * 220 / 15;
                    height:@9;
                    &:nth-child(2){
                        margin-left: @1;
                        margin-right: @1;
                    }
                    img{
                        width:100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .info{
                height:@5;
                line-height: @5;
                span{
                    .font-size(22);
                    color:@theme-black;
                    margin-right:@1;
                }
                .favorite{
                    display: none;
                    float: right;
                }
            }
        }
    }
    .news-list.single,.news-list.none{
        a{
            position: relative;
            z-index:3;
            height:@11; 
            h1{
                display: inline-block;
                width:@1 * (46 - 14.666 - 1);
                vertical-align: top;
                padding-top:@1;
                padding-bottom:@1;
            }
            .img{
                float: right;
                margin-top:@1;
                margin-bottom: @1;
            }
            .info{
                display: inline-block;
                position: absolute;
                left:0;
                bottom:0;
                height:@5;
                line-height: @5;
            }
        }
    }
    li.none{
        a{
            h1{
                width:@46;
            }
        }
    }
    li.state{
        height:@6;
        line-height: @6;
        text-align: center;
        .font-size(26);
        color: #ccc;
        // opacity: 1;
        .bottom-line(#f5f5f5);
    }
    li:last-child{
        border-bottom:none;
    }
    li.highlight{
        a{
            h1{
                // color: @theme-black;
                font-weight: bold;
            }
            .info{
                .favorite{
                    display: inline-block;
                }
            }
            
        }
        
    }

}
.list.show{
    opacity: 1;
}
// .list.reloading{
//     opacity: .3;
// }
.list.viewed{
    li{
        height:@7;
        transition:opacity .2s, height .3s .5s;
        .bottom-line(#f5f5f5);
        a{
            width:@40;
            height:@6;
            line-height: @6;
            margin-left: @2;
            margin-right: 0;
            vertical-align: middle;
            
            h1{
                display: block;
                width:@40;
                .font-size(24);
                height:@6;
                line-height: @6;
                padding-top:0;
                padding-bottom: 0;
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 1;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .info{
                height:@3 / 2;
                line-height:@3 / 2;
                span{
                    .font-size(20); 
                    color: #999;
                }
            }
        }
        i{
            margin-left: @1;
            margin-right: @1;
            vertical-align: middle;
        }
    }
    li.listfade-enter-active:not(.show){
        height:@7;
    }
}

.list.viewed,
.list.favorites{
    transition: opacity .4s;
    min-height: calc(100vh - @6 + 5px);
    li.hide{
        opacity: 0;
        height:0;
        border-width: 0;
    }
    li.listfade-enter-active
    {
        opacity: 0;
        height:0;
        border-width: 0;
    }
    
}

.list-empty{
    position: absolute;
    top:0;
    display: block;
    width: @48;
    height: 66vh;
    line-height: 66vh;
    color: #ddd;
    .font-size(28);
    text-align: center;
    opacity: 0;
    animation: fade .3s forwards;
}
.list li.state{
  border-bottom: none;
}
</style>
