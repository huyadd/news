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
        <div class="article-content"  v-html="articleData.content"></div>
    </article>
</template>


<script>
import Moment from 'moment'
//Moment.locale('zh-cn')

export default {
    props:[
        'articleData',
        'isFavorite',
        'isLogin',
    ],
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

