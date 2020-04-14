<template>
  <div class="form-continer">
    <el-form :model="form" :rules="formRules" ref="form" size="mini">
      <el-form-item prop="username">
        <md-input placeholder="输入账号" v-model="form.username" name="username" icon="user">创建新账号</md-input>
      </el-form-item>
      <el-form-item prop="password">
        <md-input
          placeholder="输入密码"
          v-model="form.password"
          type="password"
          name="password"
          icon="password"
        >密码</md-input>
      </el-form-item>
      <el-form-item prop="passwords">
        <md-input
          placeholder="再次输入密码"
          v-model="form.passwords"
          type="password"
          name="passwords"
          icon="lock"
        >确认密码</md-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <md-input placeholder="输入手机号" v-model="form.mobile" name="mobile" icon="phone">手机号码</md-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MdInput from "@/components/MDinput";
import { validUsername, isNull, isIPhone } from "@/utils/validate";

export default {
  components: {
    MdInput
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isNull(value)) {
        callback(new Error("账号不能为空"));
      } else {
        if (value.length < 6) {
          callback(new Error("账号不能小于6位数"));
        } else {
          callback();
        }
      }
    };
    const validatePassword = (ruel, value, callback) => {
      if (!isNull(value)) {
        callback(new Error("密码不能为空"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能小于6位数"));
        } else {
          callback();
        }
      }
    };
    const validatePasswords = (ruel, value, callback) => {
      if (!isNull(value)) {
        callback(new Error("再次确认密码项不能为空"));
      } else {
        if (this.form.password != value) {
          callback(new Error("两次密码输入不一致"));
        } else {
          callback();
        }
      }
    };
    const validateMobile = (ruel, value, callback) => {
      if (!isNull(value)) {
        callback(new Error("手机号码不能为空"));
      } else {
        if (!isIPhone(value)) {
          callback(new Error("手机号码格式有误"));
        }
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        passwords: "",
        mobile: ""
      },
      formRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        passwords: [
          { required: true, trigger: "blur", validator: validatePasswords }
        ],
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.form-continer {
  padding: 10px 30px;
}
</style>