<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="username" fixed label="用户名 / 归属人">
      <template slot-scope="scope">
        {{ scope.row.username }}
        <el-tag>{{ scope.row.user_ownername }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="pname" label="昵称" :width="150" />
    <el-table-column prop="rolename" label="角色" :width="150">
      <template slot-scope="scope">
        <svg-icon icon-class="user" />
        {{ scope.row.rolename }}
      </template>
    </el-table-column>
    <el-table-column prop="email" label="邮箱">
      <template slot-scope="scope">
        <el-link type="primary" :underline="true">{{ scope.row.email }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
      :width="150"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-column
      prop="sub_companies"
      label="所属公司"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-column
      prop="dept"
      label="部门"
      :width="100"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-col
      prop="post"
      label="岗位"
      :width="100"
      :header-align="'center'"
      :align="'center'"
    />
    <el-table-column
      fixed="right"
      label="操作"
      :width="250"
      :header-align="'center'"
      :align="'center'"
    >
      <template slot-scope="scope">
        <el-button type="info" size="small" icon="el-icon-edit">编辑</el-button>
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
          username: 'admin',
          user_ownername: '蔡徐坤',
          pname: '鸡你太美',
          rolename: '销售部总经理',
          email: '696gijr156s@xsn.net.com',
          phone: '13666666666',
          sub_companies: '深圳市新司南创新科技技术有限公司',
          dept: '销售部',
          post: '经理兼主管',
        },
        {
          username: 'admin12615d6489q',
          user_ownername: '马尔哈扎',
          pname: '今晚月色真的很美',
          rolename: '销售部总经理',
          email: '696gijr156s@xsn.net.com',
          phone: '13666666666',
          sub_companies: '深圳市新司南创新科技技术有限公司',
          dept: '销售部',
          post: '经理兼主管',
        }
      ]
    }
  }
}
</script>
