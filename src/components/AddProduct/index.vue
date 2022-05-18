<template>
  <div class='add-product'>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <Basic v-if='current === 0' :form='form' ref='form'/>
      <Sale v-if='current === 1' :form='form' ref='sale'/>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click='next'
      >
        完成
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        上一步
      </a-button>
    </div>
  </div>
</template>
<script>
import Basic from './Basic.vue';
import Sale from './Sale.vue';

export default {
  props: ['editShow', 'formData'],
  components: {
    Basic,
    Sale,
  },
  mounted() {
    if (this.editShow) {
      this.form = this.formData;
    }
  },
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: '',
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        images: [],
      },
      steps: [
        {
          title: '基本信息填写',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.current === 0) {
        // eslint-disable-next-line consistent-return
        this.$refs.form.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.current += 1;
          } else {
            return false;
          }
        });
      } else {
      // eslint-disable-next-line consistent-return
        this.$refs.sale.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const data = {
              ...this.form,
              c_items: [this.form.c_items],
            };
            this.$emit('submit', data);
          } else {
            return false;
          }
        });
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

.add-product{
  overflow: scroll;
}
</style>
