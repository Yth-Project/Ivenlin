<template>
  <nav class="nav">
    <div class="left">
      <el-dropdown>
        <span class="el-dropdown-link">
          产品总览
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>GoBuy小程序</el-dropdown-item>
          <el-dropdown-item>GoBuyApp</el-dropdown-item>
          <el-dropdown-item>GoBuy小程序/app PC管理系统</el-dropdown-item>
          <el-dropdown-item>GoBuy小程序/app PE管理系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right">
      <span>联系我们</span>
      <span>关于我们</span>
      <span>加入我们</span>
      <span>帮助中心</span>
      <span>技术支持</span>
    </div>
  </nav>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.nav {
  transition: all 300ms ease 0s;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  padding: 0 20px 0 20px;
  display: flex;
  font-size: 14px;

  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    text-align: right;
    padding: 10px 0;
    span {
      cursor: pointer;
      padding: 10px 15px;
      color: #ffffff;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 50%;
        display: inline-block;
        width: 100%;
        height: 1px;
        transform: translate(-50%);
      }
      &:hover:before {
        height: 2px;
        animation: ad_width 0.23s linear forwards;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0),
          #fff,
          rgba(0, 0, 0, 0)
        );
      }
    }
  }
}
@keyframes ad_width {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
