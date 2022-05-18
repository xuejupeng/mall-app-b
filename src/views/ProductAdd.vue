<template>
  <div class="product-add-wrap">
    <AddProduct @submit='handleSubmit'/>
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct/index.vue';
import postProduct from '../api/postProduct';

export default {
  components: {
    AddProduct,
  },
  methods: {
    handleSubmit(form) {
      postProduct(form).then((res) => {
        if (res.data.status === 'success') {
          this.$message.success('添加商品成功');
          this.$router.push('/productList');
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.product-add-wrap{
  height: 100%;
  overflow: scroll;
}
</style>
