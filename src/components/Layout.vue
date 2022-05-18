<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <a-menu theme="dark" mode="inline" :default-selected-keys="[$route.name]" v-model='current'>
        <a-menu-item v-for="item in list" :key="item.name">
          <router-link :to="{ name: item.name }">
            <a-icon :type="item.meta.icon" />
            <span>
              {{ item.meta.title }}
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-breadcrumb class="crumb" v-if="$route.name === 'Index'">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>统计</a-breadcrumb-item>
        </a-breadcrumb>
        <a-breadcrumb class="crumb" v-else>
          <a-breadcrumb-item>商品</a-breadcrumb-item>
          <a-breadcrumb-item>{{ $route.meta.title }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="user-wrap">
          <div class="user-info">
            当前用户：<span class="user">{{ user }}</span>
          </div>
          <div class="user-out" @click='handleOut'>退出</div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      routerList: [],
      user: '',
      current: [this.$route.name],
    };
  },
  watch: {
    $route() {
      this.current = [this.$route.name];
    },
  },
  created() {
    this.routerList = this.$router.options.routes;
    this.user = JSON.parse(window.localStorage.getItem('userInfo')).username;
  },
  computed: {
    list() {
      return this.routerList.filter((self) => self.meta.show);
    },
  },
  methods: {
    handleOut() {
      this.$emit('handleOut');
    },
  },
};
</script>
<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#components-layout-demo-custom-trigger {
  overflow: hidden;
  height: 100vh;
  width: 100%;
  .crumb {
    display: inline-block;
  }
  .layout {
    overflow: hidden;
  }
  .user-wrap {
    float: right;
    position: relative;
    &:hover :last-child {
      display: block;
    }
    .user-info {
      .user {
        display: inline-block;
        margin: 15px 20px 15px 0;
        width: 60px;
        height: 30px;
        border-radius: 7px;
        background: #1890ff;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .user-out {
      position: absolute;
      right: 20px;
      top: 50px;
      width: 60px;
      height: 30px;
      border-radius: 7px;
      background: #073b6cb0;
      line-height: 30px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      z-index: 999;
      display: none;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
