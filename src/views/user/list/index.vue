<template>
  <div style="padding:10px;min-height: calc(100vh - 86px)">
    <el-alert :closable="false" :title="title" />
    <div class="app-warpper">
      <div class="app-header">
        <todo />
      </div>
      <div class="app-main">
        <list />
      </div>
    </div>
  </div>
</template>

<script>
import { List, Todo } from './components'
export default {
  components: {
    List,
    Todo
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>

<style>
</style>
