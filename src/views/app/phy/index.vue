<template>
  <div class="app-container app-container-table">
    <el-alert :closable="false" :title="title" />
    <div class="app-warpper">
      <div class="app-header">
        <el-form ref="form" :model="optionForm" label-width="40px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="部门">
                <el-select v-model="optionForm.deptId" :disabled="loading" clearable placeholder="请选择" :size="''">
                  <el-option
                    v-for="item in phy.options_dept"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select v-model="optionForm.phyId" :disabled="loading" clearable placeholder="请选择" :size="''">
                  <el-option
                    v-for="item in options_status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="套餐">
                <el-select v-model="optionForm.packageId" :disabled="loading" clearable placeholder="请选择" :size="''">
                  <el-option
                    v-for="item in phy.options_package"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" :disabled="loading" :size="''" @click="fetchList()">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="app-main">
        <v-el-table
          :loading="loading"
          style="width: 100%"
          :list="phy.list"
          @handle-size="handleSize"
          @handle-current="handleCurrent"
        >
          <el-table-column type="index" :width="50" :align="'center'" />

          <el-table-column prop="memberName" label="员工姓名" />
          <el-table-column v-if="false" prop="memberId" label />
          <el-table-column
            prop="idCard"
            label="身份证"
            :width="200"
            :header-align="'center'"
            :align="'center'"
          />
          <el-table-column prop="phone" label="手机号" :header-align="'center'" :align="'center'" />
          <el-table-column prop="deptName" label="所属部门" />
          <el-table-column label="体检状态" :header-align="'center'" :align="'center'">
            <template slot-scope="{ row }">{{row.phyStatus | phyStatus_Filter}}</template>
          </el-table-column>
          <el-table-column prop="packName" label="所属套餐" />

          <el-table-column label="操作" :width="100" :header-align="'center'" :align="'center'">
            <template slot-scope="{ row }">
              <el-button type="info" size="small" icon="el-icon-edit">下载</el-button>
            </template>
          </el-table-column>
        </v-el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

const ps = [
  {
    id: 0,
    name: '无套餐'
  },
  {
    id: 1,
    name: '未体检'
  },
  {
    id: 2,
    name: '已预约'
  },
  {
    id: 3,
    name: '已体检'
  },
  {
    id: 4,
    name: '完成体检'
  }
]
export default {
  filters: {
    phyStatus_Filter(val) {
      let text = ''
      ps.map(item => {
        item.id === val && (text = item.name)
      })
      return text
    }
  },
  data() {
    return {
      value: null,
      // 状态下拉
      options_status: ps,
      optionForm: {
        deptId: null,
        phyId: null,
        packageId: null
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['phy', 'userObj', 'pageObj']),
    title() {
      return this.$route.meta.title
    }
  },
  created() {
    this.fetchList()
    this.fetchDeptOptions() // 获取部门 组合下拉
    this.fetchPackageOptions() // 获取套装 组合下拉
  },
  methods: {
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
    fetchPackageOptions() {
      this.$store.dispatch('phy/getPackageOptions', {
        companyId: this.userObj.companyId
      })
    },
    fetchDeptOptions() {
      this.$store.dispatch('phy/getDeptOptions', {
        companyId: this.userObj.companyId
      })
    },
    fetchList() {
      const { deptId, phyId, packageId } = this.optionForm
      this.loading = true
      this.$store.dispatch('phy/getList', {
        companyCode: this.userObj.companyCode,
        deptId: deptId,
        ids: '',
        keyword: '',
        orderBy: '',
        packageId: packageId,
        page: this.pageObj.current,
        rows: this.pageObj.size,
        phyId: phyId
      }).then(res=>{
            this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-form-item {
  margin: 0;
}
</style>
