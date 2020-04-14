import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // 英文包
import locale from 'element-ui/lib/locale/lang/zh-CN' // 中文包

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/verifyCode' // 引入验证码插件
import '@/utils/audioPlay' //

import * as filters from './filters' // global filters

import tablePages from '@/components/TablePages' // 全局表格+分页
Vue.use(tablePages)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/* import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
 */
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
