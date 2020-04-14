<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column
      fixed
      prop="date"
      label="级别"
      :width="200"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-column
      prop="name"
      label="角色名"
      :width="200"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-column prop="province" label="描述" />
    <el-table-column
      fixed="right"
      label="操作"
      :width="250"
      :header-align="'center'"
      :align="'center'"
    >
      <template slot-scope="scope">
        <el-button type="info" size="small" icon="el-icon-edit">编辑权限</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '管理员',
          name: '主管',
          province: '主管和部长都有管理员权限级别的操作',
          city: ''
        },
        {
          date: '管理员',
          name: '部长',
          province: '主管和部长都有管理员权限级别的操作',
          city: '普陀区'
        },
        {
          date: '普通用户',
          name: '财务人员',
          province: '财务人员和销售人员只有普通用户的普通操作',
          city: '普陀区'
        },
        {
          date: '普通用户',
          name: '销售人员',
          province: '财务人员和销售人员只有普通用户的普通操作',
          city: '普陀区'
        }
      ]
    }
  }
}
</script>
