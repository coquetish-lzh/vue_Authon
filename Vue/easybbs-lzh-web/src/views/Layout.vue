<template>
  <div>
    <div class="header" v-if="showHeader">
        <div class="header-content" 
        :style="{width:proxy.globalInfo.bodyWidth+'px'}"
        >
        <router-link to="/" class="logo a-link">
          <span v-for="item in logoInfo" :style="{color:item.color}">{{ item.letter}}</span>
        </router-link>
        <!--板块信息-->
        <div class="menu-panel">
          <span class="menu-item" to="/">首页</span>
          <template v-for="board in boardList">
          <el-popover
            placement="bottom-start"
            :width="200"
            trigger="hover"
            v-if="board.children.length>0"
          >
            <template #reference>
              <span class="menu-item" @click="boardClickHandler(board)">{{ board.boardName }}</span>
            </template>
              <div class="sub-board-list">
                <span 
                  class="sub-board" 
                  v-for="subBoard in board.children" 
                  key="subBoard.boardId"
                  @click="subClickHandler(subBoard)">{{subBoard.boardName}}</span>
              </div>
          </el-popover>
          <span class="menu-item" v-else @click="boardClickHandler(board)">{{ board.boardName }}</span>
        </template>
        </div>
        <!--头像等登录注册-->
        <div class="userInfo-panel">
          <div class="op-btn">
            <el-button class="op-btn" type="primary" size="default" @click="">
            发帖<span class="iconfont icon-add"></span>
          </el-button>
            <el-button class="op-btn" type="primary" size="default" @click="">
            搜索<span class="iconfont icon-search"></span>
            </el-button>
          </div>
          <template v-if="userInfo.userId">
            <div class="message-info">
            <el-dropdown>
              <el-badge :value="12" class="item">
                <div class="iconfont icon-message"></div>
              </el-badge>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>回复我的</el-dropdown-item>
                  <el-dropdown-item>赞了我的文章</el-dropdown-item>
                  <el-dropdown-item>下载了我的附件</el-dropdown-item>
                  <el-dropdown-item>赞了我的评论</el-dropdown-item>
                  <el-dropdown-item>系统信息</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="user_info">
            <el-dropdown>
              <div><Avatar :userId="userInfo.userId"></Avatar></div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>我的主页</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
          <el-button-group :style="{'margin-left':'10px'}" v-else>
          <el-button type="primary"  @click="loginRegister(1)" plain>登录</el-button>
          <el-button type="primary"  @click="loginRegister(0)" plain>注册</el-button>
          </el-button-group>
          
        </div>
      </div>
    </div>
      
    <div class="body-content"> 
        <router-view />
    </div>
    <!--登录-->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import {ref,reactive,getCurrentInstance,onMounted,watch} from "vue"; 
import {useRouter,useRoute} from "vue-router"
import {useStore} from 'vuex'
const {proxy} =getCurrentInstance();
const router=useRouter();
const route=useRoute();
const store=useStore()

const api={
  getUserInfo:"getUserInfo",
  loadBorder:'/board/loadBoard'
}
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
    if(scrollType==1&&currentScrollTop>100){
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

//获取板块信息
const boardList=ref([])
const loadBorder=async ()=>{
  let result=await proxy.Request({
    url:api.loadBorder
  })
  if(!result) return;
  console.log(result.data)
  boardList.value=result.data
  console.log(boardList.value)
  store.commit("saveBoardList",result.data)
}

loadBorder()


//监听 用户信息
const userInfo=ref({})
watch(() =>store.state.loginUserInfo,
 (newVal, oldVal) => {
    if(newVal!=undefined&&newVal!=null){
      userInfo.value=newVal
    }else{
      userInfo.value={}
    }
    
 }, 
 { immediate: true, deep: true });
onMounted(()=>{
  initScroll();
  getUserInfo();
});

const getUserInfo=async () =>{
  let result=await proxy.Request({
    url:api.getUserInfo
  });
  if(!result){
    return
  }
  store.commit('updateLoginUserInfo',result.data)
}

//监听是否展示登录框
watch(() =>store.state.showLogin, (newVal, oldVal) => {
  if(newVal){
     loginRegister(1)
  }
}, 
{ immediate: true, deep: true });

//板块点击
const boardClickHandler=(board)=>{
  router.push(`/form/${board.boardId}`)
}
//二级板块
const subClickHandler=(subBoard)=>{
  router.push(`/form/${subBoard.pBoardId}/${subBoard.boardId}`)
}
</script>

<style lang="scss">
.header {
    top: 0;
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
        .menu-item{
          margin-left: 40px;
          cursor: pointer;
        }
      }
      .userInfo-panel{
        width:300px;
        display: flex;
        align-items: center;
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
      .message-info{
        .icon-message{
          font-size: 20px;
          margin: 5px 0 0 5px;
          color: #656262;
          cursor: pointer;
        }
        margin-left: 5px;
        margin-right: 25px;
      }
    }
}
.sub-board-list{
  display: flex;
  flex-wrap: wrap;
  .sub-board{
    padding: 0 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: rgb(239, 239, 239 );
    border: 1px solid #ddd;
    color: #6b6a6a;
    margin-top: 10px;
  }
  .sub-board:hover{
    color: var(--link);
    cursor: pointer;
  }
}

.body-content{
  margin-top: 60px;
  position: relative;
}
</style>
