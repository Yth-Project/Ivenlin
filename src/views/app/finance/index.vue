<template>
  <div class="app-container  app-container-table">
    <el-alert :closable="false" :title="title" />
    <div class="app-warpper">
      <div class="app-header"></div>
      <v-el-table
        :list="finance.list"
        style="width: 100%"
        :loading="loading"
          @handle-size="handleSize"
          @handle-current="handleCurrent"
      >
        <el-table-column type="index" :width="50" :align="'center'" />
        <el-table-column prop="name" label="合同名称" />
        <el-table-column :align="'right'" :width="50" :header-align="'right'" type="expand">
          <template slot-scope="{ row }">
            <!-- <div class="detail-title">
              <el-alert type="info" :closable="false">
                <span>
                  当前付款阶段：
                  <el-dropdown @command="handlerTableDetailDate">
                    <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="第一期">第一期</el-dropdown-item>
                      <el-dropdown-item command="第二期">第二期</el-dropdown-item>
                      <el-dropdown-item command="第三期">第三期</el-dropdown-item>
                      <el-dropdown-item command="第四期">第四期</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </el-alert>
            </div> -->
            <el-form class="demo-table-expand" :label-position="'left'">
              <el-form-item label="应付款">
                <span>￥{{ row.accPayable || 0.00 }}</span>
              </el-form-item>
              <el-form-item label="应收款">
                <span>￥{{ row.accReceivable || 0.00 }}</span>
              </el-form-item>
              <el-form-item label="合同总金额">
                <span>￥{{ row.amount || 0.00 }}</span>
              </el-form-item>
              <el-form-item label="首付款">
                <span>￥{{ row.firstPayment || 0.00 }}</span>
              </el-form-item>
              <el-form-item label="待付">
                <span>￥{{ row.toPaid || 0.00 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </v-el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userObj', 'finance', 'pageObj']),
    title() {
      return this.$route.meta.title
    }
  },
  created() {
    this.fetchList()
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
    fetchList() {
            this.loading = true
      this.$store
        .dispatch('finance/getList', {
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
    },
    handlerTableDetailDate(command) {}
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
