<template>
  <div class="login-container">
    <div class="mask-container">
      <!-- <login-nav /> -->

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
      <template v-if="formType===0">
        <div class="title-container">
          <h3 class="title">
            <!-- <svg-icon icon-class="bug" class="white" style="font-size:36px" /> -->
          g;lfkjdklkjhyyyyy登录
          </h3>
        </div>

        <!-- <template v-if="formType===0"> -->
          <el-form-item prop="phone">
            <span class="svg-container">
              <!-- <svg-icon icon-class="user" class="white" /> -->
              <span class="white-fot">手机号 :</span>
            </span>
            
            <el-input
              ref="phone"
              v-model="loginForm.phone"
              placeholder="手机"
              name="phone"
              type="text"
              tabindex="1"
              autocomplete="off"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <!-- <svg-icon icon-class="password" class="white" /> -->
              <span class="white-fot">密 码 :</span>
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="off"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-row v-if="ecshow">
            <el-col :span="18">
              <el-form-item prop="vcode">
                <span class="svg-container">
                  <svg-icon icon-class="verification" class="white" />
                </span>
                <el-input
                  ref="vcode"
                  v-model="loginForm.vcode"
                  placeholder="验证码"
                  name="vcode"
                  type="text"
                  tabindex="3"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <verify-code
                ref="verify-code"
                :background-color-min="255"
                :background-color-max="255"
                :content-height="52"
                :content-width="104"
              />
            </el-col>
          </el-row>
        </template>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          round
          @click.native.prevent="handleLogin"
        >登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
import { isNull, isIPhone } from '@/utils/validate'
import { NewUser } from './form'
import { LoginNav } from './components'
import { getErrCount } from '@/utils/auth'
import {
  getCurrentTimeOut,
  setCurrentTimeOut,
  removeCurrentTimeOut
} from '@/utils/timeOut'
import { getToken, setTest } from '@/utils/auth'

export default {
  name: 'Login',
  components: {
    'new-user': NewUser,
    'login-nav': LoginNav
  },
  data() {
    role : "supplier"
    const validateAccount = (rule, value, callback) => {
      if (!isNull(value)) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isNull(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!isNull(value)) {
        callback(new Error('手机不能为空'))
      } else if (!isIPhone(value)) {
        callback(new Error('手机格式有误'))
      } else {
        callback()
      }
    }
    const validateVCode = (rule, value, callback) => {
      if (!isNull(value)) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '18898899888',
        account: 'admin',
        password: 'admin123'
        /*  phone: '',
        vcode: '',
        remeberMe: false */
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateAccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        vcode: [{ required: true, trigger: 'blur', validator: validateVCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      newUserDrawer: false,
      forgetPwdDrawer: false,
      ecshow: false, // 当前是否显示验证码
      vcodeLoading: false, // 发送手机验证码的等待loading
      MAX_TIMEOUT: 59, // 验证码倒计时
      /**
       *  默认账号密码登录页面
       * @param 0 - 普通登录表单
       * @param 1 - 手机登录表单
       * */
      formType: 0
    }
  },
  computed: {
    errCount() {
      return Number(getErrCount())
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    if (getErrCount()) this.ecshow = true
  },
  created() {
    if (getCurrentTimeOut()) {
      this.MAX_TIMEOUT = getCurrentTimeOut()
      this.getVCode()
    }
  },
  methods: {
    // 重置验证码
    resetVerfiyCode() {
      // this.$refs['verify-code'].resetVerfiyCode()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 发送手机验证码
    getVCode() {
      let _this = this
      this.vcodeLoading = true

      let max = Number(getCurrentTimeOut()) ? Number(getCurrentTimeOut()) : 59
      let fuc = function() {
        setTimeout(() => {
          if (max !== 1) {
            _this.MAX_TIMEOUT = --max
            _this.$store.dispatch('timeOut/setCurrentTime', _this.MAX_TIMEOUT)
            return fuc()
          }
          _this.vcodeLoading = false // 关闭加载
          _this.MAX_TIMEOUT = 59 // 重新渲染
          _this.$store.dispatch('timeOut/delCurrentTime') // 重新设置新的定时器
        }, 1000)
      }
      fuc()
    },
    handleLogin() {
      let _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading = true

          // 判断验证码是否通过
          // if (typeof this.$refs['verify-code'] !== 'undefined') {
          //   const identifyCode = this.$refs['verify-code'].identifyCode
          //   if (
          //     !(
          //       identifyCode.toLowerCase() ===
          //       _this.loginForm['vcode'].toLowerCase()
          //     )
          //   ) {
          //     _this.loading = false
          //     // 重置验证码
          //     this.resetVerfiyCode()
          //     return this.$message({
          //       type: 'error',
          //       message: '验证码有误'
          //     })
          //   }
          // }
          // 发送登录请求 验证是否通过
          this.$store
            .dispatch('user/login', _this.loginForm)
            .then(() => {
              _this.loading = false
              _this.$router.push(
                { path: this.redirect || '/' },
                onComplete => {},
                onAbort => {}
              )
            })
            .catch(() => {
              _this.loading = false
              // 重置验证码
              !(_this.ecshow && this.resetVerfiyCode()) && (_this.ecshow = true)
              // 获取cookie中登录失败次数
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* getRoutes() {
      let _this = this
      _this.$store
        .dispatch('user/getRoutesByRule')
        .then(() => {
          _this.$router.push({ path: this.redirect || '/' })
        })
        .catch(() => {

        })
    } */
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* 重置 element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 40px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2b2b2b;
$dark_gray: #889aa4;
$light_gray: #eee;
$bg_img: url('~@/assets/bg_images/login.png');

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: $bg_img;
  background-size: cover;
  background-position: center center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    .white {
      color: #ffffff;
    }

    .white-fot {
      color: #ffffff;
      vertical-align: middle;
      display: inline-block;
      width: 100px;
      padding: 6px 45px 6px 0px;
     
    }
   
  }
    

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .remeber_me {
    color: #ffffff;
    margin-left: 2px;
    margin-bottom: 20px;
  }

  .otherLogin {
    font-size: 24px;

    span {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      &:hover {
        cursor: pointer;
      }
      // &:first-of-type {
      //   margin-right: 16px;
      // }
    }
  }

  .mask-container {
    position: absolute;
    min-height: 100%;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(44, 44, 44, 0.2),
      rgba(138, 64, 0, 0.48)
    );
  }

  .flex-box {
    color: #fff;
    font-size: 14px;
  }
}
.big__button {
  font-size: 30px;
  padding: 12px;
}
</style>
