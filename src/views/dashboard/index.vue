
<template>
  <div class="app-container app-container-table">
    <div class="app-warpper">
      <el-alert :closable="false" :title="title" />
      <div class="app-header">
        <el-button type="primary" size="small" :disabled="loading" @click="handleDialog(0)">添加订单</el-button>

        <el-button type="delete" size="small" :disabled="loading" @click="handleDialog(1)">批量删除订单</el-button>

        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="small"
          style="margin-left:75px"
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
            label="物料类目"
            :width="100"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="roleName"
            label="物料名称"
            :width="100"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="account"
            label="供应商"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column prop="password" label="数量" :header-align="'center'" :align="'center'" />
          <el-table-column prop="roleName" label="状态" :header-align="'center'" :align="'center'" />
          <el-table-column
            prop="account"
            label="下单时间"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column label="操作" :width="250" :header-align="'center'" :align="'center'">
            <template slot-scope="{ row }">
              <el-button
                type="info"
                size="small"
                icon="el-icon-edit"
                @click="handleDialog(1, row)"
              >修改</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </v-el-table>
      </div>
    </div>

    <el-dialog title="编辑订单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择物料类目:" :label-width="'120px'">
          <el-select
            v-model="form.roleId"
            clearable
            placeholder="请选择物料类目"
            class="full-width"
            :disabled="ruleDisabled"
          >
            <el-option
              v-for="item in pack_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择物料名称:" :label-width="'120px'">
          <el-select
            v-model="form1.roleId"
            clearable
            placeholder="请选择物料名称"
            class="full-width"
            :disabled="ruleDisabled"
          >
            <el-option
              v-for="item in pack_name"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="选择供应商:" :label-width="'120px'">
          <el-select
            v-model="form2.roleId"
            clearable
            placeholder="请选择供应商"
            class="full-width"
            :disabled="ruleDisabled"
          >
            <el-option
              v-for="item in pack_shoper"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model="form.account" autocomplete="off" /> -->
        </el-form-item>
        <el-form-item label="填写数量:" :label-width="'120px'">
          <el-input v-model="form3.password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="填写公司名称:" :label-width="'120px'">
          <el-input v-model="form4.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="填写联系方式:" :label-width="'120px'">
          <el-input v-model="form5.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="填写收货地址:" :label-width="'120px'">
          <el-input v-model="form6.password" autocomplete="off" />
        </el-form-item>
        <!-- <template v-if="showRule">
        </template>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const pos = [
  {
    id: 1,
    name: '一次性医用口罩'
  },
  {
    id: 2,
    name: '口罩棉布'
  },
  {
    id: 3,
    name: '口罩挂绳'
  },
  {
    id: 4,
    name: '口罩棉'
  },
  {
    id: 5,
    name: 'Kn9口罩'
  },
  {
    id: 6,
    name: '口罩棉'
  },
  {
    id: 7,
    name: '口罩棉'
  }
]
const namepos = [
  {
    id: 1,
    name: '一次性医用口罩'
  },
  {
    id: 2,
    name: 'Kn9口罩'
  },
  {
    id: 3,
    name: '防尘口罩'
  }
]
const shoperpos = [
  {
    id: 1,
    name: '京东'
  },
  {
    id: 2,
    name: '淘宝'
  },
  {
    id: 3,
    name: '考拉海购'
  },
  {
    id: 4,
    name: '蘑菇街'
  },
  {
    id: 5,
    name: '亚马逊'
  }
]
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
      form: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form1: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form2: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form3: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form4: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form5: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      form6: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      ruleDisabled: false,
      loading: false,
      showRule: false,
      pack_options: pos,
      pack_name: namepos,
      pack_shoper: shoperpos
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
