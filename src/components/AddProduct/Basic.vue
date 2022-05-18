<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="title" label="标题" prop="title">
      <a-input
        v-model="form.title"
        @blur="
          () => {
            $refs.title.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item ref="desc" label="商品描述" prop="desc">
      <a-input
        v-model="form.desc"
        @blur="
          () => {
            $refs.desc.onFieldBlur();
          }
        "
      />
    </a-form-model-item>

    <a-form-model-item label="商品类目" prop="category">
      <a-select v-model="form.category" placeholder="请选择类目" @change='categoryChange'>
        <a-select-option :value="i" v-for='(item, i) in category' :key='i'>
            {{item}} </a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请选择子类目">
        <a-select-option :value="it" v-for='(it, i) in items'
         :key='i'> {{it}} </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
      <a-select
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        v-model="form.tags"
        default-value='包邮最晚次日达'
      >
        <a-select-option key="包邮最晚次日达"> 包邮最晚次日达 </a-select-option>
      </a-select>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      items: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题内容',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请选择商品类目',
            trigger: 'change',
          },
        ],
        c_items: [
          { required: true, message: '请选择商品子类目', trigger: 'change' },
        ],
        tags: [
          {
            required: true,
            message: '请填写商品标签',
            trigger: 'change',
          },
        ],
        desc: [
          {
            required: false,
          },
        ],
      },
    };
  },
  methods: {
    categoryChange() {
      this.items = this.$store.state.categoryList[this.form.category].c_items;
    },
  },
  computed: {
    category() {
      return this.$store.state.categoryList.map((it) => it.name);
    },
  },
};
</script>
