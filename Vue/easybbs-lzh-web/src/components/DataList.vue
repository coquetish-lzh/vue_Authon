<template>
    <div v-if="!loading&&dataSource.list!=null&&dataSource.list.length===0">
        <NoData :msg="noDatamsg">

        </NoData>
    </div>
    <div class="skletion" v-if="loading">
        <el-skeleton :rows="2" animated />
    </div>
  <div v-for="item in dataSource.list" v-if="!loading">
        <slot :data="item"></slot>
  </div>
  <div class="pagination">
    <el-pagination
    v-if="dataSource.pageTotal>1"
    small
    background
    :total="dataSource.totalCount"
    :current-page.sync="dataSource.pageNo"
    layout="prev, pager, next"
    @current-change="handlePageNoChange"
    style="text-align: right;"
    class="mt-4"
  />
  </div>
</template>

<script setup>
const props=defineProps({
    dataSource: {
        type:Object,
    },
    loading:{
        typ:Boolean,
    },
    noDatamsg:{
        type:String,
        default:'空空如也'
    }
});
const emit=defineEmits(["loadData"])
const handlePageNoChange=(pageNo)=>{
    props.dataSource.pageNo=pageNo;
    emit('loadData')
}
</script>

<style lang="scss" scoped>
    .mt-4{
        padding: 10px 0 5px 10px;
    }
    .skletion{
        padding:15px;
    }
</style>
