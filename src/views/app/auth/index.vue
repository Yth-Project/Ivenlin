<template>
  <div class="app-container app-container-table">
    <div class="app-warpper">
      <el-alert :closable="false" :title="title" />
      <div class="app-header">
        <el-button type="primary" size="small" :disabled="loading" @click="handleDialog(0)">添加账号</el-button>
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
          <el-table-column prop="account" label="账号" :width="200" />
          <el-table-column prop="password" label="密码" :header-align="'center'" :align="'center'" />
          <el-table-column prop="roleName" label="角色" :header-align="'center'" :align="'center'" />
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

    <el-dialog title="编辑账号" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="'120px'">
          <el-input v-model="form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="'120px'">
          <el-input v-model="form.password" autocomplete="off" type="password" show-password />
        </el-form-item>
        <template v-if="showRule">
          <el-form-item label="角色" :label-width="'120px'">
            <el-select
              v-model="form.roleId"
              clearable
              placeholder="请选择角色"
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
        </template>
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
    name: '超级管理员'
  },
  {
    id: 2,
    name: '财务'
  },
  {
    id: 3,
    name: '人事'
  }
]
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: null,
        account: null,
        password: null,
        type: 0, // 0-新增 1-修改
        roleId: null
      },
      ruleDisabled: false,
      loading: false,
      showRule: false,
      pack_options: pos
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
