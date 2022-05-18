<template>
<div class="login-wrap">
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" type="email" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>

  </a-form-model>
</div>

</template>
<script>
import loginApi from '../api/login';

export default {
  data() {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginApi(this.ruleForm).then((res) => {
            if (res.data.status === 'success') {
              this.$message.success('登陆成功');
              this.$store.dispatch('setUserInfo', res.data.data);
              this.$router.push('/');
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-wrap{
  margin: 200px auto;
  max-width: 500px;
}
</style>
