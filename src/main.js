import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import FastClick from 'fastclick'
import { Lazyload } from 'vant';


Vue.config.productionTip = false
Vue.use(Vant);

//使用懒加载插件
Vue.use(Lazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
