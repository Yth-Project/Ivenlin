<template>
  <div style="height:100%">
    <el-table
      ref="table"
      v-loading="loading"
      border
      size="medium"
      :data="list.dataList"
      :highlight-current-row="true"
      :height="height"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :empty-text="'暂无数据'"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="type" :type="type?'selection':''" />
      <el-table-column v-if="index" prop="date" label="序号" type="index" align="center" sortable />
      <slot name="title" />
      <!-- <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        :label="t.text"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
        show-overflow-tooltip
        align="center"
      />-->
      <slot />
      <slot name="after" />
    </el-table>

    <div v-if="list.total && list.total!=0" class="text-center pages">
      <el-pagination
        :current-page="list.pageNo"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="list.pageSize"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
        @size-change="handleSize"
        @current-change="handleCurrent"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      // 请求返回的json数据
      type: Object,
      default: null
    },
    columns: {
      // 列
      type: Array,
      default: null
    },
    index: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    // 是否开启多选
    type: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 是否打开底部合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: false
    },
    // 是否自定义高度 默认100%
    height: {
      type: String,
      default: '100%'
    }
  },
  watch: {
    list(val) {
      console.log(val)
    }
  },
  methods: {
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val) {
       return this.$emit('selection-change', val)
      // this.$store.dispatch('list/setSelections', val)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    // 表格单击操作
    rowClick(row, column, el) {
      return this.$emit('row-click', { row, column, el })
    },
    // 表格双击操作
    dblclick(row, column, el) {
      return this.$emit('dblclick', { row, column, el })
    },
    // 监听每页显示数量
    handleSize(size) {
      return this.$emit('handle-size', size)
    },
    // 监听当前页码数
    handleCurrent(current) {
      return this.$emit('handle-current', current)
    }
  }
}
</script>

<style scoped>
</style>
