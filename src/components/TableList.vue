<template>
<div>
  <div id="components-table-demo-size" >
    <a-table :columns="columns" :data-source="data" size="small" :pagination=false>
        <a slot='edit' slot-scope="text, record">
          <a-button @click='handleEdit(record)'>编辑</a-button>
          <a-button @click='handleRemove(record)'>删除</a-button>
        </a>
    </a-table>
  </div>
  <a-pagination
      v-model='$store.state.formData.page'
      :total="total"
      :page-size="$store.state.formData.size"
      :default-current="$store.state.formData.page"
      @change='handlePage'
    />
</div>

</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    ellipsis: true,
  },
  {
    title: '可购买量',
    dataIndex: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'edit' },
    width: 150,
  },
];

export default {
  props: {
    data: {
      type: Array,
    },
    total: {
      type: Number,
    },
  },
  data() {
    return {
      columns,
    };
  },
  methods: {
    handlePage(page) {
      this.$emit('handlePage', page);
    },
    handleRemove(data) {
      this.$emit('handleRemove', data);
    },
    handleEdit(data) {
      this.$emit('handleEdit', data);
    },
  },
};
</script>

<style scoped>
#components-table-demo-size{
  margin: 20px 0;
}
</style>
