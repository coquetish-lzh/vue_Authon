import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
//图标 图标在附件中
import '@/assets/icon/iconfont.css'
import './assets/base.scss'
import store from './store'
//全局方法
import Verify from '@/utils/Verify'
//全局组件
import Diolog from '@/components/Diolog.vue'
import Message from '@/utils/Message'
import Request from '@/utils/Request'
import Avatar from '@/components/Avatar.vue'
import Cover from '@/components/Cover.vue'
import DataList from '@/components/DataList.vue'
import NoData from '@/components/NoData.vue'
const app = createApp(App)

app.use(router)
app.use(ElementPlus);
app.use(store);
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo={
    bodyWidth:1200, 
    avatarUrl:'api/file/getAvatar/',
    imageUrl:'/api/file/getImage/'
}
app.config.globalProperties.Verify=Verify;
app.config.globalProperties.Message=Message;
app.config.globalProperties.Request=Request;
app.component("Diolog",Diolog);
app.component("Avatar",Avatar);
app.component("Cover",Cover);
app.component("DataList",DataList);
app.component("NoData",NoData);
app.mount('#app')
