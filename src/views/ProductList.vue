<template>
  <div class="product-list-wrap">
    <Search @search='handleSearch' :category="category"/>
    <TableList :data='dataList' :total='total'
    @handlePage='handlePage' @handleRemove='remove' @handleEdit='edit'/>
        <a-drawer
      title="编辑商品信息"
      :width="700"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
     <AddProduct editShow='true' :formData='form' @submit='handleSubmit'  v-if='visible'/>
        </a-drawer>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import TableList from '../components/TableList.vue';
import getProduct from '../api/getProduct';
import removeProduct from '../api/removeProduct';
import AddProduct from '../components/AddProduct/index.vue';
import editProduct from '../api/editProduct';

export default {
  components: {
    Search,
    TableList,
    AddProduct,
  },
  data() {
    return {
      dataList: [],
      total: 0,
      visible: false,
      form: {},
    };
  },
  methods: {
    handleSearch(form) {
      this.$store.dispatch('setFormData', { ...form, page: 1 });
      this.getProductList(this.$store.state.formData);
    },
    remove(data) {
      const This = this;
      this.$confirm({
        title: '确认删除此条数据吗?',
        cancelText: '取消',
        okText: '确认',
        content: () => <div style="color:red;">删除后将永久不能恢复</div>,
        onOk() {
          removeProduct(data.id).then((res) => {
            if (res.data.status === 'success') {
              This.$message.success('删除成功');
              This.getProductList(This.$store.state.formData);
            }
          });
        },
        onCancel() {
          This.$message.info('您已取消删除');
        },
        class: 'test',
      });
    },
    getProductList(params) {
      getProduct(params).then((res) => {
        this.total = res.data.data.total;
        this.dataList = res.data.data.data.map((it, index) => ({
          ...it,
          key: index,
          status: it.status === 1 ? '上架' : '下架',
          category: this.category[it.category],
        }));
      });
    },
    handlePage(page) {
      this.$store.dispatch('setFormData', { page });
      this.getProductList(this.$store.state.formData);
    },
    edit(data) {
      this.form = data;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleSubmit(form) {
      let index;
      this.$store.state.categoryList.forEach((it, i) => {
        if (form.category === it.name) {
          index = i;
        }
      });
      const data = {
        ...form,
        category: index,
        status: form.status === '上架' ? 1 : 0,
      };
      editProduct(data).then((res) => {
        if (res.data.status === 'success') {
          this.$message.success('修改当前商品信息成功');
          this.visible = false;
          this.getProductList(this.$store.state.formData);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.getProductList(this.$store.state.formData);
  },
  computed: {
    category() {
      return this.$store.state.categoryList.map((it) => it.name);
    },
  },
};
</script>

<style scoped>
.product-list-wrap{
  overflow: scroll;
  height: 100%;
}
</style>
