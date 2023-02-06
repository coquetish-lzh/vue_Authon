import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueRouter from 'vue-router'
import router from './router'
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';
 
Vue.use(VueRouter)
Vue.prototype.axios = axios;
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Antd)

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
