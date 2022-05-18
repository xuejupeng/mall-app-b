import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Index from '../views/Index.vue';
import ProductList from '../views/ProductList.vue';
import ProductAdd from '../views/ProductAdd.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      show: false,
      title: '登陆',
    },
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      show: true,
      title: '首页/统计',
      icon: 'area-chart',
    },
  },
  {
    path: '/productList',
    name: 'ProductList',
    component: ProductList,
    meta: {
      show: true,
      title: '商品列表',
      icon: 'unordered-list',
    },
  },
  {
    path: '/productAdd',
    name: 'ProductAdd',
    component: ProductAdd,
    meta: {
      show: true,
      title: '商品添加',
      icon: 'plus-square',
    },
  },
];

const router = new VueRouter({
  routes,
  // mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    if (store.state.userInfo.username) {
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
