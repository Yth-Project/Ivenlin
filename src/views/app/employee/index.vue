<template>
  <div class="app-container full-height--container">
    <el-alert :closable="false" :title="title" style="    margin-bottom: 20px;" />
    <div class="app-warpper full-height--warpper">
      <div class="app-header">
        <input v-show="false" type="file" ref="import" @change="handleImport" />
        <el-button-group>
          <el-button type="primary" :disabled="loading" @click="handleDialog">新增员工</el-button>
          <el-button type="primary" :disabled="loading" @click="handleDownland">模板下载</el-button>
          <el-button type="primary" :disabled="loading" @click="()=>{$refs.import.click()}">导入</el-button>
          <el-button type="primary" :disabled="loading" @click="handleExport">导出</el-button>
        </el-button-group>
      </div>
      <el-row :gutter="35" class="app-body-transfer flex-box">
        <el-col :span="10">
          <el-card
            class="box-card"
            :bodyStyle="{'overflow-y': 'auto', 'height': 'calc(100% - 40px)'}"
          >
            <div slot="header" class="clearfix">
              <span>
                部门人员 - 选中部门
                <span
                  class="font-mini"
                  :class="currentNode.label?'color-green':'color-red'"
                >{{currentNode.label || '未选中'}}</span>
              </span>
              <div style="float: right; padding: 3px 0">
                <el-link type="info" @click="handlerLeftTitleAll">全选</el-link>
                <el-link type="info" @click="handlerLeftTitleCancel">取消选中</el-link>
                <el-link type="danger" @click="removeMember(0)">删除</el-link>
              </div>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
            <el-tree
              ref="treeLeft"
              v-loading="treeLoading"
              class="card-tree"
              accordion
              highlight-current
              show-checkbox
              :data="employee.deptList"
              :props="defaultProps"
              :expand-on-click-node="true"
              :node-key="'id'"
              :filter-node-method="filterNode"
              :default-expanded-keys="expandedKeys"
              @node-expand="handleNodeExpand"
              @node-collapse="handleNodeCollaps"
              @node-click="handleNodeClick"
              @check-change="handleNodeChange"
            >
              <div class="custom-tree-node" slot-scope="{ node, data }">
                <template v-if="!data.leaf">
                  <span class="font-small">{{ data.label }}</span>
                </template>
                <template v-else>
                  <div>
                    <span class="font-small">{{ data.label }}</span>
                    <span class="font-mini color-info">{{ data.idCard }}</span>
                  </div>
                </template>
              </div>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="4" class="flex-item--column-center">
          <el-row :gutter="35">
            <el-col :span="12">
              <el-button
                type="primary"
                icon="el-icon-arrow-right"
                :disabled="btnDisabledLeft && !loading"
                @click="handleBtnBind(0)"
              />
            </el-col>
            <el-col :span="12" class="right">
              <el-button
                type="primary"
                icon="el-icon-arrow-left"
                :disabled="btnDisabledRight && !loading"
                @click="handleBtnBind(1)"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-card class="box-card" :body-style="{height:'80%'}">
            <div slot="header" class="clearfix">
              <span>
                未绑定名单 - 选中部门
                <span
                  class="font-mini"
                  :class="currentNode.label?'color-green':'color-red'"
                >{{currentNode.label || '未选中'}}</span>
              </span>
              <div style="float: right; padding: 3px 0">
                <el-link type="info" @click="handlerRightTitleAll">全选/取消</el-link>
                <el-link type="danger" @click="removeMember(1)">删除</el-link>
              </div>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
            <!-- <el-tree
              :data="dataRight"
              :props="defaultProps"
              @node-click="handleRightNodeClick"
              accordion
              highlight-current
            ></el-tree>-->

            <v-el-table
              ref="multipleTable"
              :loading="loading"
              :list="employee.tableList"
              style="width: 100%"
              @row-click="handleRowClick"
              @selection-change="handleSelectionChange"
              @handle-size="handleSize"
              @handle-current="handleCurrent"
            >
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column label="姓名" :width="100">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="phone" show-overflow-tooltip label="手机号" :width="120"></el-table-column>
              <el-table-column prop="idCard" show-overflow-tooltip label="身份证 "></el-table-column>
              <el-table-column v-if="false" prop="id" show-overflow-tooltip label="手机号" width="120"></el-table-column>
            </v-el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="所属部门" :label-width="'120px'">
          <el-select v-model="form.deptId" clearable placeholder="请选择部门" class="full-width">
            <el-option
              v-for="item in employee.deptList"
              :key="item.key"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" :label-width="'120px'">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" :label-width="'120px'">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份证" :label-width="'120px'">
          <el-input v-model="form.idCard" autocomplete="off" />
        </el-form-item>
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
import baseApi from '@/baseApi.js'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
        value: 'id',
        isLeaf: 'leaf'
      },
      currentNode: {}, // 当权选中的node
      multipleSelection: [], // 右侧table所有选中的row
      treeSelection: [], // 左侧tree所有选中的data
      checkedId: null,
      treeLoading: false,
      expandedKeys: [], // 展开节点的key
      dialogFormVisible: false, // 弹窗
      form: {
        deptId: null,
        name: null,
        phone: null,
        idCard: null,
        companyCode: null
      },
      exportUrlParams: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['employee', 'userObj', 'pageObj']),
    title() {
      return this.$route.meta.title
    },
    btnDisabledLeft() {
      return this.currentNode.id ? false : true
    },
    btnDisabledRight() {
      return this.multipleSelection.length && this.currentNode.id ? false : true
    }
  },
  watch: {
    multipleSelection(val) {},
    currentNode(val) {
      // expandedKeys
    }
  },
  created() {
    this.fetchDeptData()
    this.fetchTableData()
  },
  methods: {
    subForm() {
      this.form.companyCodes = this.userObj.companyCode
      this.$store.dispatch('employee/saveForm', this.form).then(res => {
        this.fetchDeptData()
        this.fetchTableData()
        this.dialogFormVisible = false
      })
    },
    // 下载 http://192.168.2.15/excelTemplate/用户信息导入模板.xlsx
    // http://47.115.33.193:8086/excelTemplate/用户信息导入模板.xlsx
    handleDownland() {
      const a = document.createElement('a')
      a.href = `${baseApi.BASE_URL}${baseApi.BASE_PORT}/excelTemplate/用户信息导入模板.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    // 导出
    handleExport() {
      // let checkMember = ''
      const nodes = this.$refs.treeLeft.getCheckedNodes()
      const rows = this.multipleSelection
      const arr = []
      // 获取树选择的员工，拼字符串
      nodes.map((item, index) => {
        if (item.leaf) {
          // 只加入叶子节点
          arr.push(item.id)
          // checkMember = `${checkMember}${checkMember.length?',':''}${item.id}${index !== nodes.length - 1 ? ',' : ''}`
        }
      })
      // 获取表格选择的员工，拼字符串
      rows.map((item, index) => {
        arr.push(item.id)
        // checkMember = `${checkMember}${checkMember.length?',':''}${item.id}${index !== rows.length - 1 ? ',' : ''}`
      })
      /* this.$nextTick(function() {
        this.$refs.downland.click()
      }) */
      if (arr.length) {
        const a = document.createElement('a')
        a.href = `${baseApi.BASE_URL}${baseApi.BASE_PORT}${baseApi.BASE_BASE}/member/exportMemberInfo?memberIds=${arr.join()}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        this.$message({
          showClose: true,
          message: '请先选择员工',
          type: 'warning'
        })
      }
      /* return
      this.$store
        .dispatch('employee/exports', {
          memberIds: checkMember
        })
        .then(res => {
          console.log(res)
        }) */
    },
    // 导入
    handleImport() {
      // 导入后回调arr 只允许导入一个所以取0
      const file = this.$refs.import.files[0]
      const fileName = file.name.split('.')
      const suffix = fileName[fileName.length - 1] // 获取文件后缀
      const param = new FormData()
      param.append('companyId', this.userObj.companyId)
      param.append('file', file)
      if (suffix === 'xlsx') {
        this.$store.dispatch('employee/imports', param).then(res => {
          this.fetchTableData()
          this.$message({
            showClose: true,
            message: `成功导入${res}人`,
            type: 'success'
          })
        })
        this.$refs.import.value = ''
        this.$refs.import.outerHTML = this.$refs.import.outerHTML
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // tree全选
    handlerLeftTitleAll() {
      this.$refs.treeLeft.setCheckedNodes(this.employee.treeList)
    },
    // tree取消全选
    handlerLeftTitleCancel() {
      this.$refs.treeLeft.setCheckedKeys([])
    },
    // table全选 / 取消
    handlerRightTitleAll() {
      this.$refs.multipleTable.$refs.table.toggleAllSelection()
    },
    // 监听 中间按钮
    handleBtnBind(type) {
      // 左->右 0，右->左 1
      const _this = this
      const checkNodes = []
      const checkRows = []
      this.$refs.treeLeft.getCheckedNodes().map(item => {
        if (item.leaf) {
          // 只加入叶子节点
          checkNodes.push(item.id)
        }
      })
      this.multipleSelection.map(item => {
        checkRows.push(item.id)
      })

      if (!checkNodes.length && type === 0) {
        return this.$message({
          showClose: true,
          message: `请先选择员工`,
          type: 'warning'
        })
      }
      if (!checkRows.length && type === 1) {
        return this.$message({
          showClose: true,
          message: `请先选择员工`,
          type: 'warning'
        })
      }
      this.$store
        .dispatch('employee/unBindEmployee', {
          deptId: this.currentNode.id,
          memberIds: type === 0 ? checkNodes : checkRows,
          moveType: type
        })
        .then(res => {
          this.fetchDeptData()
          this.fetchTableData()
        })
    },
    // 删除员工 0左边删除 1右边删除
    removeMember(type) {
      let checkMember = ''
      const nodes = this.$refs.treeLeft.getCheckedNodes()
      const rows = this.multipleSelection
      if (type === 0) {
        nodes.map((item, index) => {
          if (item.leaf) {
            // 只加入叶子节点
            checkMember = `${checkMember + item.id}${
              index !== nodes.length - 1 ? ',' : ''
            }`
          }
        })
      } else {
        rows.map((item, index) => {
          checkMember = `${checkMember + item.id}${
            index !== rows.length - 1 ? ',' : ''
          }`
        })
      }

      this.$store
        .dispatch('employee/delMember', {
          memberIds: checkMember
        })
        .then(res => {
          this.fetchDeptData()
          this.fetchTableData()
        })
    },
    // node父节点全选
    handleNodeChange(data, checked, childChecked) {
      const { id, label } = data
      !data.leaf && (this.currentNode = data)
      // this.handleNodeCheck(data)
      if (!data.leaf) {
        /* this.$message({
          showClose: true,
          message: `当前 ${label} 没有选中任何人，请先展开该部门`,
          type: 'warning'
        }) */
        // this.expandedKeys = [node.key]
        /* if (data.getData) {
          this.currentNode = data
          this.$refs.treeLeft.store.nodesMap[data.id].expanded = true
        } else {
          // 没有展开的情况要先弹窗提示 先展开 懒加载
          if (checked) {
            this.$message({
              showClose: true,
              message: '请先展开当前加载员工',
              type: 'warning'
            })
          }
          this.$refs.treeLeft.store.nodesMap[data.id].checked = false
        } */
      }
    },
    // 节点展开时
    handleNodeExpand(data, node) {
      if (this.expandedKeys.length) {
        this.expandedKeys.map((item, index) => {
          if (node.key != item && index === this.expandedKeys.length - 1) {
            this.expandedKeys.push(node.key)
          }
        })
      } else {
        this.expandedKeys.push(node.key)
      }
    },
    // 节点关闭时
    handleNodeCollaps(data, node) {
      if (this.expandedKeys.length) {
        this.expandedKeys.map((item, index) => {
          if (node.key == item) {
            return this.expandedKeys.splice(index, 1)
          }
        })
      }
    },
    // 树 tree  - 当复选框被点击的时候触发
    /* handleNodeCheck(data) {
      // 根据 data 或者 key 拿到 Tree 组件中的 node
      const node = this.$refs.treeLeft.getNode(data.id)
      if (!data.leaf) {
        this.currentNode = node.data
      }
      this.$refs.treeLeft.setCurrentKey(node.key)
    }, */
    // 监听左侧树node点击
    handleNodeClick(data, node) {
      // 只有父节点可以保存
      if (!data.leaf) {
        this.currentNode = node.data
      } else {
        // 如果点击的是叶子节点
        this.$refs.treeLeft.setChecked(node.data,!node.checked,false)
      }
      // 判断点击的是否是叶子节点 非叶子节点需要保存当前选中父节点
      /* if (!data.leaf) {
        this.currentNode = data
        this.treeSelection = []
        this.$refs.treeLeft.setCheckedNodes([])
      } else {
        this.$refs.treeLeft.setCheckedNodes([node.data])
      }

      return
      if (isLeaf) {
        this.$refs.treeLeft.setCheckedNodes([node.data])
        this.currentNode = data
      } */
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.$refs.table.clearSelection()
      }
    },
    // table监听行点击 触发checkbox
    handleRowClick(row, column, event) {
      console.log(this.$refs)
      this.$refs.multipleTable.$refs.table.toggleRowSelection(row)
    },
    // table监听选中的row val = 所有选中的row
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 懒加载 加载部门下员工
    loadNode(node, resolve) {
      const _this = this
      const deptList = this.employee.deptList

      _this.treeLoading = true

      if (node.level === 0) {
        _this.treeLoading = false
        return resolve(deptList)
      }
      // if (node.level > 1) return resolve([])
      _this.$store
        .dispatch('employee/fetchEmployeeList', {
          deptId: node.data.id,
          companyCode: this.userObj.companyCode
        })
        .then(res => {
          const data = this.employee.treeList
          node.data.getData = true // 表示该节点获得了data
          _this.treeLoading = false
          resolve(data)
        })
    },
    handleDialog() {
      this.dialogFormVisible = true
      this.form = this.resultObj(this.form)
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
    // 监听每页显示数量
    handleSize(size) {
      this.$store.dispatch('app/setPageSize', size)
      this.fetchTableData()
    },
    // 监听当前页码数
    handleCurrent(current) {
      this.$store.dispatch('app/setPageCurrent', current)
      this.fetchTableData()
    },
    // 通过部门获取员工
    async fetchMemberByDeptId() {
      const _this = this
      await Promise.all(
        _this.employee.deptList.map(item =>
          (async () => {
            _this.$store
              .dispatch('employee/fetchEmployeeList', {
                deptId: item.id,
                companyCode: _this.userObj.companyCode
              })
              .then(res => {})
          })()
        )
      )
    },
    // 获取部门
    fetchDeptData() {
      const _this = this
      _this.$store.dispatch('employee/fetchDeptList').then(res => {
        this.fetchMemberByDeptId()
      })
    },
    // 获取未绑定员工
    fetchTableData() {
      const _this = this
      this.loading = true
      _this.$store
        .dispatch('employee/fetchTableList', {
          companyCode: _this.userObj.companyCode,
          idCard: _this.userObj.idCard,
          ids: '',
          keyword: '',
          name: '',
          orderBy: '',
          page: this.pageObj.current,
          rows: this.pageObj.size,
          wxOpenId: ''
        })
        .then(res => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang='scss' scoped>
/* $minHeight:calc(100vh - 200px);
.app-warpper {
    min-height: calc(100vh - 200px);
    .app-body-transfer{
        height: $minHeight
    }
} */
.app-container {
  overflow: hidden;
  .app-body-transfer {
    min-height: calc(70vh);
    max-height: calc(70vh);
    overflow-y: auto;
  }
  .box-card {
    overflow-y: hidden;
    height: 100%;
  }
  .app-bottom {
    margin-top: 20px;
  }
}
</style>
