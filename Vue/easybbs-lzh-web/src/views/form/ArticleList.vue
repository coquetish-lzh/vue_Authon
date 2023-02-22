<template>
  <div class="container-body article-list-body" 
  :style="{width:proxy.globalInfo.bodyWidth+'px'}">
    <!--二级板块-->
    <div class="sub-board" v-if="pBoardId">
      <span class="board-item">全部</span>
      <span v-for="item in subBoardList" class="board-item">
          <router-link :to="`/form/${item.pBoardId}/${item.boardId}`">{{item.boardName}}</router-link>
      </span>
    </div>
    <div class="article-panel">
      <div class="top-tab">
        <div :class="['tab',orderType===0?'active':'']" @click="changeOrderType(0)">热榜</div>
          <el-divider direction="vertical" content-position="left"></el-divider>
       <div :class="['tab',orderType===1?'active':'']" @click="changeOrderType(1)">发布时间</div>
        <el-divider direction="vertical" content-position="left"></el-divider>
        <div :class="['tab',orderType===2?'active':'']" @click="changeOrderType(2)">最新</div>
      </div>
      <div class="article-list">
          <DataList 
          :loading="loading" 
          :dataSource="articleInfo" 
          @loadData="loadArticle"
          noDatamsg="暂无数据">
            <template #default="{data}">
              <ArticleListitem :data="data"></ArticleListitem>
            </template>
          </DataList> 
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticleListitem from './ArticleListitem.vue'
import {ref,reactive,getCurrentInstance,watch} from "vue"; 
import {useRouter,useRoute} from "vue-router"
import {useStore} from 'vuex'
const {proxy} =getCurrentInstance();
const router=useRouter();
const route=useRoute();
const store=useStore()

const api={
  loadArticle:'/forum/loadArticle',
}

const changeOrderType=(type)=>{
  orderType.value=type
  loadArticle()
}

const loading=ref(false)
//文章列表
const orderType=ref(0)
const articleInfo=ref({})
const boardId=ref(0)
const pBoardId=ref(0)
const loadArticle=async ()=>{
  loading.value=true
  let params={
    pageNo:articleInfo.value.pageNo,
    pBoardId:pBoardId.value,
    boardId:boardId.value,
    orderType:orderType.value
  }  
  let result = await proxy.Request({
    url: api.loadArticle,
    params: params,
    showLoading:false
  })
  loading.value=false
  if(!result) return;
  articleInfo.value=result.data
}
loadArticle()

//二级板块
const subBoardList=ref([]);
const setSubBoard=()=>{
  subBoardList.value=store.getters.getSubBoardList(pBoardId.value)
  console.log(subBoardList.value)
}
//监听路由变化
watch(() =>route.params, (newVal, oldVal) => {
  pBoardId.value=newVal.pBoardId
  boardId.value=newVal.boardId
  loadArticle()
  setSubBoard()
}, { immediate: true, deep: true });

//监听板块数据变化
watch(() =>store.state.boardList,(newVal, oldVal) => {
  setSubBoard()
}, { immediate: true, deep: true });
</script>

<style lang="scss">
  .article-list-body{
      .sub-board{
        padding: 5px 0px 10px 0px;
        .board-item{
          background: #fff;
          border-radius: 15px;
          padding: 2px 10px;
          margin-right: 10px;
          color: #909090;
          cursor: pointer;
          font-size: 14px; 
        }
        
      }
      .article-panel{
        background: #fff;
        .top-tab{
          display: flex;
          align-items: center;
          padding: 10px;
          font-size: 14px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
          .active{
            color:var(--link);
          }
        }
        .article-list{
          padding-bottom: 5px;
        }
      }
  }
</style>
