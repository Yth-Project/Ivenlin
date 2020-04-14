import index from './index.vue'

const vElTable = {
  install: function(Vue) {
    Vue.component('v-el-table', index)
  }
};

export default vElTable
