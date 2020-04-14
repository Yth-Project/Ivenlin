<template>
  <div class="app-container app-container-table">
    <el-alert :closable="false" :title="title" />

    <div class="app-warpper">
      <div class="app-header">
        <!-- <el-row>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-plus" :size="''" @click="handlerDialog()">添加部门</el-button>
          </el-col>
        </el-row>-->
      </div>
      <div class="app-main">
        <v-el-table
          :loading="loading"
          :list="contract.list"
          style="width: 100%"
          @handle-size="handleSize"
          @handle-current="handleCurrent"
        >
          <el-table-column type="index" :width="50" :align="'center'" />
          <el-table-column prop="contactPerson" label="联系人" :width="200" />
          <el-table-column prop="contactPersonPhone" label="联系电话" :width="200" />
          <el-table-column prop="name" label="合同名称" :width="200" />
          <el-table-column prop="signDate" label="签约日期" />
          <el-table-column :width="100" :header-align="'center'" :align="'center'">
            <template slot-scope="{ row }">
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                type="primary"
                size="small"
                icon
                @click="handlePreview(row.id)"
              >预览</el-button>
            </template>
          </el-table-column>
        </v-el-table>
      </div>
    </div>

    <el-dialog @opened="showPdf" @closed="removePdf" :visible.sync="pdfVisible" fullscreen>
      <PDF ref="pdf"></PDF>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PDF from '@/components/PDFJS'
export default {
  components: { PDF },
  data() {
    return {
      tableDetailCurrent: '第一期',
      loading: false,
      pdfVisible: false,
      pdfBuffer: null,
      fullscreenLoading: false // 正页loading
    }
  },
  computed: {
    ...mapGetters(['contract', 'userObj', 'pageObj']),
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
    handlerTableDetailDate(command) {
      this.tableDetailCurrent = command
    },
    fetchList() {
      this.loading = true
      const _this = this
      _this.$store
        .dispatch('contract/fetchList', {
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
    // 弹窗关闭后后回调函数 // 清空pdf
    removePdf() {
      this.$refs.pdf.previewPDF('')
    },
    // 弹窗显示后回调函数
    showPdf() {
      this.$refs.pdf.previewPDF(this.pdfBuffer)
      this.fullscreenLoading = false
    },
    handlePreview(id) {
      this.fullscreenLoading = true
      this.$store
        .dispatch('contract/getPreviewPdf', { contractId: id })
        .then(res => {
          // this.$refs.pdfDialog.$refs.pdf.previewPDF(res)
          this.pdfBuffer = res
          this.pdfVisible = true

          return
          const dataInfo = res.data
          let reader = new window.FileReader()
          // 使用readAsArrayBuffer读取文件, result属性中将包含一个 ArrayBuffer 对象以表示所读取文件的数据
          reader.readAsArrayBuffer(dataInfo)
          reader.onload = function(e) {
            const result = e.target.result
            const contentType = dataInfo.type
            // 生成blob图片,需要参数(字节数组, 文件类型)
            const blob = new Blob([result], { type: contentType })
            // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
            const url = window.URL.createObjectURL(blob)
            console.log(url) // 产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.app {
  &-title {
    margin-bottom: 20px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
