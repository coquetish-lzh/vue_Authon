import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login/index.vue'
//1.Vue.use安装插件
Vue.use(VueRouter)
const routes =[
     {
          path:'/',
          name:Login,
          componet:Login
     }
]
//2.创建路由对象
const router = new VueRouter({
     //配置路由与组件的关系
     mode:'history',
     routes

})
//3.将router对象导出
export default router
