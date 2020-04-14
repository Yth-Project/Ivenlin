<template>
  <div class="table-container">
    <el-table :data="tableData" style="width: 100%" :border="border" :height="height" :size="size" :highlight-current-row="highlightCurrentRow">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  props:{
    // 是否开启边框
    border:{
      type:Boolean,
      default:false
    },
    // 设置表格高度 
    // 如果 height 为 number 类型，单位 px；
    // 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
    height:{
      type:String || Number,
      default:'200px' || 200
    },
    // 表格尺寸 不设置默认为medium
    size:{
      type:String,
      default:'medium'
    },
    // 是否高亮点击选中的当前行
    highlightCurrentRow:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.table-container {
  margin: 10px 20px 0;
}
</style>