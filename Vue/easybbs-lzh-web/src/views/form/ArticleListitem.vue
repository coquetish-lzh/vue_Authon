<template>
  <div class="article-item">
      <div class="article-item-inner">
        <div class="article-body">
          <div class="user-info">
            <Avatar :userId="data.userId" :width="30"></Avatar>
            <router-link :to="'/user/'+data.userId" class="link-info">{{data.nickName}}</router-link>
            <el-divider direction="vertical" content-position="left"></el-divider>
            <div class="post-item">{{ data.postTime }}</div>
            <div class="address">&nbsp;·&nbsp;{{ data.userIpAddress }}</div>
            <el-divider direction="vertical" content-position="left"></el-divider>
            <router-link :to="'/'" class="link-info">{{data.pBoardName}}</router-link>
            <template v-if="data.boardName">
              <span>&nbsp;/&nbsp;</span>
              <router-link :to="'/'" class="link-info">{{data.boardName}}</router-link>
            </template>
          </div>
          <router-link :to="'/'" class="title">{{data.title}}</router-link>
          <div class="sumary">{{ data.summary }}</div>
          <div class="article-info">
            <span class="iconfont icon-eye-solid">
              {{ data.readCount == 0 ? "阅读" : data.readCount}} 
            </span>
            <span class="iconfont icon-good">
              {{ data.goodCount == 0 ? "点赞" : data.goodCount}}
            </span>
            <span class="iconfont icon-comment">
              {{ data.commentCount == 0 ? "评论" : data.commentCount}}
            </span>
          </div>
        </div>
        <Cover :cover="data.cover" :width="100"></Cover>
      </div>
  </div>
</template>

<script setup>
const props=defineProps({
  data:{
    type:Object
  },
  
})
</script>

<style lang="scss" scoped>
  .article-item{
    padding: 5px 10px 0 10px;
    .article-item-inner{
      border-bottom: 1px solid #ddd;
      padding: 10px;
      display: flex;
      .article-body{
        flex: 1;
        .user-info{
          display: flex ;
          align-items: center;
          font-size: 14px;
          .link-info{
            color:#494949;
            margin-left: 5px;
            text-decoration: none;
          }
          .link-info:hover{
            color:var(--link)
          }
          .post-item{
            font-size: 14px;
            color:#9a9a9a
          }
        }
        .title{
          font-weight: bold;
          font-size: 16px;
          text-decoration: none;
          color: #4a4a4a;
          margin: 10px 0;
          display:inline-block;
        }
        .sumary{
          font-size: 14px;
          color: #86909c;
        }
        .article-info{
          margin-top: 10px;
          display: flex;
          align-items: center;
          font-size: 13px;
          .iconfont{
            margin-right: 25px;
            color: #86909c;
            font-size: 14px;
          }
          .iconfont:before{
            padding-right: 3px;
          }
          .icon-comment:hover,.icon-good:hover{
           cursor: pointer;
           color:#86909c;
          }
        }
      }
    }
  }
  .article-item:hover{
    background: #fffbfb;
  }
</style>
