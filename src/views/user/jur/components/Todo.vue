<template>
  <el-row>
    <el-col :span="2">
      <el-button type="primary" icon="el-icon-plus">新增角色</el-button>
    </el-col>
    <el-col :span="22" class="right">
      <el-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="筛选级别"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value: [],
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
