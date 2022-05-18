import Vue from 'vue';
import VCharts from 'v-charts-v2';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';

if (window.localStorage.getItem('userInfo')) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.getItem('userInfo')));
}

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
