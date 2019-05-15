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

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
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
</style>