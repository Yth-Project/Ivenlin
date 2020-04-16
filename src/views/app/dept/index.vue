
<template>
  <div class="app-container app-container-table">
    <div class="app-warpper">
      <el-alert :closable="false" :title="title" />
      <div class="app-header">
        <el-button type="primary" size="small" :disabled="loading" @click="handleDialog(0)">添加物料类目</el-button>

        <el-button type="delete" size="small" :disabled="loading" @click="handleDialog(1)">批量删除物料类目</el-button>

        <el-select v-model="select" style="margin-left:55px;" size="small" slot="prepend" placeholder="请选择">
          <el-option label="一次性医用口罩" value="1"></el-option>
          <el-option label="KN9口罩" value="2"></el-option>
          <el-option label="医用口罩" value="3"></el-option>
          <el-option label="儿童口罩" value="4"></el-option>
        </el-select>

        <el-button
          type="select"
          size="small"
          style="margin-left:15px;"
          :disabled="loading"
          @click="handleDialog(2)"
        >类目查询</el-button>
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
            label="物料类目编号"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            prop="password"
            label="物料类目名称"
            :width="600"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column
            label="是否上架"
            :width="100"
            :header-align="'center'"
            :align="'center'"
            
          >
          <el-switch
            v-model="value1"
            active-value="100"
            inactive-value="0"
            @click="handleSwitch(1, row)">
          </el-switch>
        </el-table-column>
          <el-table-column label="操作" :width="250" :header-align="'center'" :align="'center'">
            <template slot-scope="{ row }">
              <el-button
                type="info"
                size="small"
                icon="el-icon-edit"
                @click="handleDialog(1, row)"
              >编辑</el-button>
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

    <el-dialog title="编辑物料类目" :visible.sync="dialogFormVisible">
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
export default {
  data() {
    return {
      select: '',
      value1: 100,
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
     
      ruleDisabled: false,
      loading: false,
      showRule: false,
      pack_options: pos,
      pack_name: namepos,
    
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
      } else if (type === 2) {
        this.ruleDisabled = true
        // 如果编辑则把行对象赋值到form
        for (const key in this.form) {
          this.form[key] = row[key]
        }
      }
      this.dialogFormVisible = true
    },
    handleSwitch(type = 0, row) {

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
