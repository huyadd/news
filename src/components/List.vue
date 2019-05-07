<template>
    <ul class="list" :class="{'show': listState.data.length}">
        <li v-for="(item, index) in listState.data" class="news-list" :class="[{single:item.imgs.length == 1}, {none:item.imgs == 0}]" v-if="($route.path != ('/news/detail/'+item.id))">
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
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
import SmoothScroll from '../module/smoothScroll'
import Moment from 'moment'
Moment.locale('zh-cn')

export default {
    name: 'list',
    props:[
        'listState',
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
    mounted(){
    },
    activated(){
    },
    deactivated(){
    },
    watch:{
        
    }
}
</script>