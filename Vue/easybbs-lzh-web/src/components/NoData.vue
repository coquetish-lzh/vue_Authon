<template>
  <div class="no-data">
    <div class="iconfont icon-empty"></div>
    <div class="msg">{{msg}}</div>
  </div>
</template>

<script setup>
const props=defineProps({
    msg:{
        type:String,
    }
})
</script>

<style lang="scss" scoped>
.no-data{
    text-align: center;
    padding: 10px 0;
    .icon-empty{
      font-size:50px;
      color: #ddd;
    }
    .msg{
      margin-top: 10px;
      color: #909399;
    }
}
</style>
