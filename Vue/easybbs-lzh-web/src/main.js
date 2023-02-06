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
//全局方法
import Verify from '@/utils/Verify'
//全局组件
import Diolog from '@/components/Diolog.vue'
const app = createApp(App)

app.use(router)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo={
    bodyWidth:1200,
}
app.config.globalProperties.Verify=Verify;
app.component("Diolog",Diolog);
app.mount('#app')
