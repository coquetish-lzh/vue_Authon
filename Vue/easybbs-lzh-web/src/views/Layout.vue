<template>
  <div>
    <div class="header" v-if="showHeader">
        <div class="header-content" 
        :style="{width:proxy.globalInfo.bodyWidth+'px'}"
        >
        <router-link to="/" class="logo a-link">
          <span v-for="item in logoInfo" :style="{color:item.color}">{{ item.letter}}</span>
        </router-link>
        <div class="menu-panel"></div>
        <div class="userInfo-panel">
          <div class="op-btn">
            <el-button class="op-btn" type="primary" @click="">
            发帖<span class="iconfont icon-add"></span>
          </el-button>
            <el-button class="op-btn" type="primary" @click="">
            搜索<span class="iconfont icon-search"></span>
            </el-button>
          </div>
          
          <el-button-group :style="{'margin-left':'10px'}">
          <el-button type="primary"  @click="loginRegister(1)" plain>登录</el-button>
          <el-button type="primary"  @click="loginRegister(0)" plain>注册</el-button>
          </el-button-group>
          
        </div>
      </div>
    </div>
      
    <div> 
        <router-view />
    </div>
    <!--登录-->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import {ref,reactive,getCurrentInstance,onMounted} from "vue"; 
import {useRouter,useRoute} from "vue-router"
const {proxy} =getCurrentInstance();
const router=useRouter();
const route=useRoute();

const logoInfo=ref([
  {
    letter:'E',
    color:"#3285FF"
  },
  {
    letter:'a',
    color:"#FB3624"
  },
  {
    letter:'s',
    color:"#FFBA02"
  },
  {
    letter:'y',
    color:"#3285FF"
  },
  {
    letter:'b',
    color:"red"
  },
  {
    letter:'b',
    color:"#FD3224"
  },
  {
    letter:'s',
    color:"#FFBA02"
  },
])
//获取滚动条的高度
const showHeader= ref(true);
const getScrollTop=()=>{
  let scrollTop=document.documentElement.scrollTop||window.pageXOffset||document.body.scrollTop
  return scrollTop;
}
const initScroll=()=>{
  let scrollType=0;
  let initScrollTop=getScrollTop()
  window.addEventListener("scroll",()=>{
    let currentScrollTop=getScrollTop()
    if(currentScrollTop>initScrollTop){
      scrollType=1;
    }else{
      scrollType=0;
    }
    initScrollTop=currentScrollTop
    if(scrollType==1&&currentScrollTop>150){
      showHeader.value=false
    }else{
      showHeader.value=true
    }
  })
};

const loginRegisterRef=ref();
const loginRegister= (type)=>{
  loginRegisterRef.value.showPancel(type)
}

onMounted(()=>{
  initScroll();
});
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 60px;
    position: fixed;
    box-shadow: 0 2px 6px #ddd;
    z-index:1000;
    background:#fff;
    .header-content {
      margin: 0px auto;
      align-items: center;
      height: 60px;
      display: flex;
      .logo{
        display: block;
        text-decoration: none;
        margin-right: 5px;
        span{
          font-size: 35px;
        } 
      }
      .menu-panel{
        flex: 1;
      }
      .userInfo-panel{
        width:300px;
        display: flex;
        .op-btn{
          border: 0;
          .iconfont{
            margin-left: 5px;
          }
          .el-button + .el_button{
          margin-left: 5px;
        }
        }
        
      }
    }
}
</style>
