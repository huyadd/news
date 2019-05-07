<template>
    <div ref="wrapper">
        <div class="list-first-loading" v-if="listState.loading && listState.page == 0"></div>
        <ul class="list" :class="{'show': listState.data.length}" ref="list">
            <li v-for="(item, index) in listState.data" class="news-list" :class="[{'single':item.imgs.length == 1}, {'none':item.imgs == 0}, {'highlight': favorites.indexOf(item.id) != -1}]">
                <router-link :to="{path: '/news/detail/' + item.id}" @click.native.capture="linkClick">
                    <h1><span>{{item.title}}</span></h1>
                    <div class="img">
                        <div  class="img-wrap" v-for="img in item.imgs">
                            <img :src="img.src"/>
                        </div>
                    </div>
                    <div class="info">
                        <span v-if="item.author">{{item.author}}</span>
                        <span>{{fromNow(item.time)}}</span>
                        <span>{{item.view}}浏览</span>
                        <span class="favorite">已收藏</span>
                    </div>
                </router-link>
            </li>
            <li class="list-loading" v-if="listState.loading && listState.page != 0">
            </li>
            <li class="state"  v-if="listState.complete">
                <span>全部加载完了φ(≧ω≦*)♪</span>
            </li>
        </ul>
    </div>
</template>

<script>
import SmoothScroll from '../module/smoothScroll'
import Moment from 'moment'
Moment.locale('zh-cn')

export default {
    name: 'list',
    props:[
        'listState',
        'newsType',
    ],
    data () {
        return {
            scrollTop: 1
        }
    },
    methods:{
        fromNow(time){
            return Moment.unix(time).fromNow()
        },
        linkClick(){
            this.$emit('linkClick')
        }
    },
    computed:{
        favorites(){
            return this.$store.getters.userInfo.userFavorites
        }
    },
    mounted(){
        this.$nextTick(() => {
            SmoothScroll(this.$refs.wrapper, this.$refs.list, () => {
                let _scroll = this.$refs.wrapper.scrollTop + this.$refs.wrapper.clientHeight
                let _height = this.$refs.list.clientHeight * 0.8
                // alert(this.listState.loading)
                if(_scroll  > _height && !this.listState.loading && !this.listState.complete){
                    // alert(1)
                    this.$emit('loadData')
                }
                this.scrollTop = this.$refs.wrapper.scrollTop
            })
            console.log(this.$refs.wrapper)
        })
    },
    activated(){
        this.$refs.wrapper.scrollTop = this.scrollTop
    },
    deactivated(){
        // this.scrollTop = this.$refs.wrapper.scrollTop
    },
    watch:{
        newsType(){
            this.$refs.wrapper.style.display = 'inline-block'
            this.$refs.wrapper.scrollTop = this.scrollTop
        }
    }
}
</script>