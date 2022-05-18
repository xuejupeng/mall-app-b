<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="price" label="商品售价" prop="price">
      <a-input
        v-model="form.price"
        @blur="
          () => {
            $refs.price.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item ref="price_off" label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off"/>
    </a-form-model-item>

    <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
      <a-input
        v-model="form.inventory"
        @blur="
          () => {
            $refs.inventory.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
       <a-form-model-item ref="unit" label="计量单位" prop="unit">
      <a-input
        v-model="form.unit"
        @blur="
          () => {
            $refs.unit.onFieldBlur();
          }
        "
      />
       </a-form-model-item>

    <a-form-model-item label="商品相册" prop="images">
       <div class="clearfix">
    <a-upload
      action="https://mallapi.duyiedu.com/upload/images?appkey=xuejp_1631502225673"
      name='avatar'
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      v-model='form.images'
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur',
          },
        ],
        price_off: [
          {
            required: false,
          },
        ],
        inventory: [
          { required: true, message: '请输入商品库存量', trigger: 'change' },
        ],
        unit: [
          {
            required: true,
            message: '请填写计量单位',
            trigger: 'change',
          },
        ],
        images: [
          {
            required: true,
            message: '请传入图片',
            trigger: 'change',
            // required: false,
          },
        ],
      },

      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        // eslint-disable-next-line no-param-reassign
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        this.form.images = this.form.images.filter((item) => item !== file.response.data.url);
      }
    },
  },
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
};
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
