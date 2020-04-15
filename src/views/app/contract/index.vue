
<template>
  <div class="app-container app-container-table">
    <div class="app-warpper">
      <el-alert :closable="false" :title="title" />
      <div class="app-header">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="small"
        ></el-date-picker>

        <el-button type="select" size="small" style='margin-left:15px;' :disabled="loading" @click="handleDialog(2)">订单查询</el-button>
      </div>

      <div class="app-main">
        <v-el-table
          :loading="loading"
          :list="auth.list"
          style="width: 100%"
          @handle-size="handleSize"
          @handle-current="handleCurrent"
        >
          <el-table-column type="index" :width="50" :align="'center'" />
           <el-table-column
            prop="account"

            label="订单编号"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="password"
            label="商品详情"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="roleName"
            label="规格参数"
            :width="150"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="数量"
            :width="100"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="金额（元）"
            :width="100"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="用户名"
            :width="150"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="电话号码"
            :width="150"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="收货地址"
            :width="250"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="付款时间"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column label="操作" :width="250" :header-align="'center'" :align="'center'">
            <template>
              <el-radio-group v-model="radio1">
              <el-radio-button label="未处理"></el-radio-button>
              </el-radio-group>
            </template>
          </el-table-column>
        </v-el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      dialogFormVisible: false,
      radio1:'未处理',
      ruleDisabled: false,
      loading: false,
      showRule: false,
    }
  },
  computed: {
    ...mapGetters(['auth', 'userObj', 'pageObj']),
    title() {
      return this.$route.meta.title
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.ruleDisabled = false
        // 监听窗口状态 关闭清空数据
        this.form = this.resultObj(this.form)
      }
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    handleDelete(id) {
      this.$store.dispatch('auth/removeRow', { userId: id })
      this.fetchList()
    },
    // 监听每页显示数量
    handleSize(size) {
      this.$store.dispatch('app/setPageSize', size)
      this.fetchList()
    },
    // 监听当前页码数
    handleCurrent(current) {
      this.$store.dispatch('app/setPageCurrent', current)
      this.fetchList()
    },
    subForm() {
      const { id } = this.form
      this.form.type = id ? 1 : 0
      this.$store.dispatch('auth/saveForm', this.form).then(res => {
        this.dialogFormVisible = false
        this.fetchList()
      })
    },
    // 监听弹窗 0 新增 1修改
    handleDialog(type = 0, row) {
      this.showRule = type === 0
      if (type === 0) {
        // 新增部门
      } else if (type === 1) {
        this.ruleDisabled = true
        // 如果编辑则把行对象赋值到form
        for (const key in this.form) {
          this.form[key] = row[key]
        }
      }else if (type === 2) {
        this.ruleDisabled = true
        // 如果编辑则把行对象赋值到form
        for (const key in this.form) {
          this.form[key] = row[key]
        }
      }
      this.dialogFormVisible = true
    },
    /**
     * @param obj 要重置的object
     */
    resultObj(Obj) {
      for (const key in Obj) {
        Obj[key] = null
      }
      return Obj
    },
    fetchList() {
      this.loading = true
      this.$store
        .dispatch('auth/getList', {
          companyId: this.userObj.companyId,
          ids: '',
          keyword: '',
          orderBy: '',
          page: this.pageObj.current,
          rows: this.pageObj.size
        })
        .then(res => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.app {
  &-title {
    margin-bottom: 20px;
  }
}
</style>
