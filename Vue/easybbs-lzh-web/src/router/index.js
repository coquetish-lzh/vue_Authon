import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path:'/',
    name:"layout",
    component:()=>import('@/views/Layout.vue'),
    children:[{
      path:'/',
      name:"文章",
      component:()=>import('@/views/form/ArticleList.vue'),
    },{
      path:'/form/:pBoardId',
      name:"一级板块",
      component:()=>import('@/views/form/ArticleList.vue'),
    },{
      path:'/form/:pBoardId/:boardId/',
      name:"二级板块",
      component:()=>import('@/views/form/ArticleList.vue'),
    },{
      path:'/user/:userId',
      name:"用户信息",
      component:()=>import('@/ucenter/Ucenter.vue'),
    }]
   }
    
  ]
})

export default router
