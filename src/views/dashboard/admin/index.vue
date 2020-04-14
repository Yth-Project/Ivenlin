<template>
  <div class="dashboard-editor-container">
    <span v-for="(item,index) in home.list" :key="index">
      <el-link
        :type="index==tabsIndex?'primary':'info'"
        @click="handlerTabs(index)"
      >{{ item.contractName }}</el-link>
      <el-divider content-position="left" direction="vertical" />
    </span>
    <!-- <el-link type="info">合同2</el-link>
    <el-divider content-position="left" direction="vertical" />
    <el-link type="info">合同3</el-link>-->

    <div style="margin-top:18px">
      <el-link
        style="margin-bottom:18px"
        disabled
        :type="'primary'"
      >总人数: {{list_obj.total}} 人 / 已检人数: {{list_obj.checkedNum || 0}} 人</el-link>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="list_obj.percentage"
        :status="'success'"
      />
    </div>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>-->

    <el-row :gutter="32" style="margin-top:18px;">
      <!--   <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <pie-chart :dataValue="pieChartData" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>-->
    </el-row>

    <el-alert :title="`过期时间：${list_obj.endDate}`" type="error" :closable="false"></el-alert>
    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

import { mapGetters } from 'vuex'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      tabsIndex: 0,
      currentList: {},
      list_obj: {},
      pieChartData: {}
    }
  },
  computed: {
    ...mapGetters(['home', 'userObj'])
  },
  watch: {
    tabsIndex(index) {
      this.currentList = this.home.list[index]
      const { total, checkedNum, endDate } = this.home.list[index]
      let percentage = 0
      if (total) {
        percentage = Number((checkedNum / total) * 100).toFixed(2)
      }

      this.list_obj = {
        total: total || 0,
        checkedNum: checkedNum,
        percentage: percentage === 'Infinity' ? 0 : Number(percentage),
        endDate: endDate
      }

       // 给pieChartData赋值
          this.pieChartData = {
            checkedNum: this.home.list[index].checkedNum || 0,
            noCheckNum: this.home.list[index].noCheckNum || 0
          }
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    handlerTabs(index) {
      this.tabsIndex = index
    },
    fetchList() {
      const { tabsIndex } = this
      this.$store
        .dispatch('home/fetchList', {
          companyId: this.userObj.companyId
        })
        .then(res => {
          const { total, checkedNum, endDate } = this.home.list[tabsIndex]
          const percentage = Number((checkedNum / total) * 100).toFixed(2)

          // 给list赋值
          this.list_obj = {
            total: total || 0,
            checkedNum: checkedNum,
            percentage: percentage === 'Infinity' ? 0 : Number(percentage),
            endDate: endDate
          }
          // 给pieChartData赋值
          this.pieChartData = {
            checkedNum: this.home.list[tabsIndex].checkedNum || 0,
            noCheckNum: this.home.list[tabsIndex].noCheckNum || 0
          }
        })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgba(240, 242, 245, 0);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: rgba(255, 255, 255, 0);
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
