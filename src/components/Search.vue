<template>
  <a-form-model
    layout="inline"
    :model="form"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="搜索关键字">
      <a-input
        v-model="form.searchWord"
        placeholder="输入搜索关键字"
        type="text"
      >
      </a-input>
    </a-form-model-item>
    <a-form-model-item label='商品类目'>
        <a-select
          show-search
          placeholder="选择商品类目"
          option-filter-prop="children"
          style="width: 150px"
          :filter-option="filterOption"
          v-model='form.category'
          allowClear
        >
          <a-select-option v-for='(item, i) in category' :key='i' :value="i">
              {{item }} </a-select-option>
        </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  props: {
    category: {
      type: Array,
    },
  },
  data() {
    return {
      form: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('search', this.form);
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
