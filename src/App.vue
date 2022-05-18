<template>
  <div class="app-wrap">
    <Layout v-if='$route.meta.show' @handleOut='logout'/>
    <router-view v-else/>
  </div>
</template>

<script>
import Layout from './components/Layout.vue';
import getCategory from './api/getCategory';

export default {
  components: {
    Layout,
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut');
      this.$message.success('退出当前用户成功');
      this.$router.push('/login');
    },
  },
  created() {
    getCategory().then((res) => {
      this.$store.dispatch('setCategory', res.data.data.data);
    });
  },
};
</script>

<style>
.app-wrap{
  overflow: hidden;
}
</style>
