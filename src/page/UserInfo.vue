<template>
    <div class="user-info">
      <div class="basis">
        <div class="item photo":class=" {highlight: diffPhoto}">
          <span class="name">头像</span>
          <span class="restore" @click="restore('photo')">撤销</span>         
          <a href="##" class="val">
            <img :src="input.photo" alt="">
            <input type="file" name="" @change="uploadPhoto($event,'photo')">
          </a>
        </div>
        
        <div class="item" :class="[{'active':active == 'userName'}, {highlight: diffUserName}]">
          <span class="name" @click="restore('userName')">昵称</span>
          <span class="restore" @click="restore('userName')">撤销</span>
          <input type="text" ref='userName' v-model="input.userName" @focus="doBar('userName')" @blur="doBar('')" @change="">
        </div>
        <div class="item" :class="[{'active':active == 'introduction'}, {highlight: diffIntroduction}]">
          <span class="name">简介</span>
          <span class="restore" @click="restore('introduction')">撤销</span>
          <input type="text" ref='introduction' v-model="input.introduction"  @focus="doBar('introduction')" @blur="doBar('')">
        </div>
      </div>
      <div class="bind">
        <div class="item">
          <span class="name">UID</span>
          <input type="text" ref='uid' :value="uid" disabled>
        </div>
        <div class="item">
          <span class="name">手机</span>
          <input type="text" ref='tel' :value="tel" disabled>
        </div>
        <div class="item">
          <span class="name">邮箱</span>
          <input type="text" ref='mail' :value="mail" disabled>
        </div>
      </div>
      <!-- <<router-link to="/news" class="main-button">完    成</router-link> -->
    </div>
</template>


<script>
import Vuex from 'vuex'
//import DisableScroll from '../module/disableScroll'
import CursorToEnd from '../module/cursorToEnd'
export default {
  name: 'HelloWorld',
  data () {
    return {
      headerName: '个人资料',
      active:'',
      input:{
        photo:this.$store.state.userInfo.photo,
        userName:this.$store.state.userInfo.userName,
        introduction:this.$store.state.userInfo.introduction,
      }
    }
  },
  computed:{
    ...Vuex.mapState({
      uid: state => state.userInfo.uid,
      photo: state => state.userInfo.photo,
      userName: state => state.userInfo.userName,
      introduction: state => state.userInfo.introduction,
      tel: state => state.userInfo.tel,
      mail: state => state.userInfo.mail
    }),
    diffPhoto(){
      return !(this.input.photo == this.photo)
    },
    diffUserName(){
      return !(this.input.userName == this.userName)
    },
    diffIntroduction(){
      return !(this.input.introduction == this.introduction)
    },
    diffTel(){
      return !(this.input.tel == this.tel)
    },
    diffMail(){
      return !(this.input.mail == this.mail)
    }
  },
  // directives: {
  //   focus: {
  //     inserted: function (el) {
  //       el.focus()
  //     }
  //   }
  // },
  methods:{
    doFocus(){
      this.focus == true ? this.focus = false :  this.focus = true
      console.log(this.focus)
      
    },
    doBar(activeItem){
      this.active = activeItem
      if(activeItem){
        CursorToEnd(this.$refs[activeItem])
      }else{
        // const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // document.body.scrollTop = 0
      }
    },
    diff(name){
      return !this.input[name] == this[name]
    },

    //预览图片
		imgPreview(file, name){
	        //0.前置条件（兼容判断）
	        if (window.FileReader) var reader = new FileReader()
	        else return false

	        //1.是否是图片
	        if (!/^image\//.test(file.type)) {alert("请选择图片！");return;}

	        //2.以DataURL形式读取
	        reader.readAsDataURL(file)
	        
	        //3.在数据层添加图像
	        reader.onload = e => this.input.photo = e.target.result
	    },
		//图片上传
		uploadPhoto(event, name){
			//0.前置条件（点击上传后按Esc取消仍会触发事件，这里要判断上传的文件存不存在）
			if(!event.target.files[0]) return false

			//1.预览图片
			this.imgPreview(event.target.files[0], name)

			//2.上传
			//$.ajax...
			//上传状态切换
	        // this.state[name + 'Uplading'] = true
	        // //上传状态切换-模拟上传延迟
	        // setTimeout(() => {this.state[name + 'Uplading'] = false}, 2500)
		},
    
    restore(name){
      // alert(this[name])
      this.input[name] = this[name]
      // alert(this.value[name])
    }
  },
  beforeRouteLeave(to, from, next){
    this.$store.dispatch('change_info', this.input)
    next()
  }
}
</script>

<style lang="less"  type="text/less" scoped>
@import '../assets/css/basis.less';
.user-info{
    // height:100vh - @5;
    // overflow: hidden;
    > div{
        .item{
            height:@6;
            line-height: @6;
            border-bottom: 1px solid #ddd;
            padding: 0 @2;
            background-color: #f5f5f5;
            .name{
                display: inline-block;
                .font-size(27);
                color: #333;
            }
            .restore{
                display: none;
                .font-size(27);
                color:@theme;
                margin-left: @6;
            }
            // .val{
            //     float: right;
            //     .font-size(2);
            //     color: @theme-black;
            // }
            input{
                display: none;
                float: right;
                display: inline-block;
                height:@6;
                width: @28;
                .font-size(24);
                color: @theme-black;
                text-align: right;
            }
            input:disabled{
                opacity: 1;
                color: #333
            }
        }
        .item.photo{
            height:@12;
            line-height: @12;
            .val{
                position: relative;
                float: right;
                width:@8;
                height: @8;
                overflow: hidden;
                border-radius: 100%;
                margin: @2 0;
                img{
                    width: 100%; 
                    height: 100%; 
                    object-fit:cover; 
                }
                input[type="file"]{
                    position: absolute;
                    left: 0;
                    width:@8;
                    height: @8;
                    overflow: hidden;
                    opacity: 0;
                }
            }
        }
        .item.highlight{
            input{
                color: #4593eb;
                //font-weight: bold;
            }
        }
        .item.active,.item.active.highlight{
            background-color: #fff;
            .restore{
                display: none;
            }
            input{
                color: #666;
            }
        }
        .item.highlight{
            .restore{
                display: inline-block;
            }
        }
        
    }
    > div.basis{
        .bottom-line(#ddd);
    }
    > div.bind{
        border-top:1px solid #ddd;
    }
    .main-button{
        position: fixed;
        bottom:0;
        margin: 0 @6 @6 @6;
    }
    
}
</style>
