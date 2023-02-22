<template>
  <div class="cover">
    <el-image 
    :style="{width:width+'px',height:width+'px'}" 
    :src="cover?proxy.globalInfo.imageUrl+cover:localCover" 
    fit="scale-down" 
    load="lazy" 
    :lazy="true">
    </el-image>
    
  </div>
</template>

<script setup>
import {getCurrentInstance} from "vue"; 
const {proxy} =getCurrentInstance();
const localCover= new URL('@/assets/G6f2JlVazmYMLYP_.jpeg',import.meta.url).href;

    const props=defineProps({
        cover:{
            type:String,
        },
        width:{
            type:Number,
            default:60
        },
    })
</script>

<style lang="scss" scoped> 
    .cover{
        background: #ddd;
        border-radius: 5px;
    }
</style>
