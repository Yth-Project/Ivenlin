<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    dataValue: {}
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    dataValue() {
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const { checkedNum, noCheckNum } = this.dataValue
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['已检', '未检', '未绑定']
        },
        series: [
          {
            name: '数据解释',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: checkedNum, name: '已检' },
              { value: noCheckNum, name: '未检' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ],
        color: ['#67C23A', '#F56C6C', '#909399']
      })
    }
  }
}
</script>
