<template>
  <div class="avatar">
  
  <el-image 
  v-if="userId" 
  fit="scale-down" 
  :style="{width:width+'px',height:width+'px','border-radius':width/2+'px'} "
  :lazy="true"
  :src="proxy.globalInfo.avatarUrl+userId" 
  loading="lazy"
  @click="goToUcenter"></el-image>
</div>
  
</template>

<script setup>
import {ref,reactive,getCurrentInstance} from "vue"; 
import {useRouter,useRoute} from "vue-router"
const {proxy} =getCurrentInstance();
const router=useRouter();
const route=useRoute();

const props=defineProps({
    userId:{
        type:String,
    },
    width:{
        type:Number,
        default:50
    },
    addLink:{
        type:Boolean,
        default:true
    }
});
const goToUcenter=()=>{
    if(props.addLink){
        router.push('/user/'+proxy.userId)
    }
}
</script>

<style lang="scss" scoped>
    .avatar{
        cursor: pointer;
    }
</style>
