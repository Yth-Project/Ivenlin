<template>
  <div style="height:100%">
    <div style="position: fixed;z-index: 999;">
      <div>
        <el-button type="primary" icon="el-icon-arrow-up" circle @click="currentPage<=1?false:currentPage--" />
      </div>
      <div style="margin-top:20px;">
        <el-button type="primary" icon="el-icon-arrow-down" circle @click="currentPage>=pageCount?false:currentPage++" />
      </div>
    </div>
    <pdf :src="src" :page="currentPage" @page-loaded="currentPage = $event" @num-pages="pageCount = $event" />
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  data() {
    return {
      src: '',
      currentPage: 1, // 当前页
      pageCount: 0 // 总页数
    }
  },
  watch: {
    currentPage(val) {
      console.log(val)
    },
    pageCount(val) {
      console.log(val)
    }
  },
  methods: {
    lo([...ar]) {
      console.log(ar)
      console.log(arguments)
    },
    //预览pdf
    previewPDF(url, fileData) {
      // const s = String.fromCharCode.apply(null, new Uint8Array(url));
      this.src = new Uint8Array(url)
    },
    //下载PDF
    downloadPDF(url, fileData, fileName) {
      this.$axios({
        method: 'post',
        responseType: 'arraybuffer',
        url: url,
        data: fileData
      })
        .then(
          function(res) {
            // 调用下载方法，把后端传过来的流传给fileDownload方法
            this.fileDownload(res.data, fileName)
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Message.error('网络请求出错')
            // 调试阶段可以看看报的什么错
            // console.log("error",error)
          }.bind(this)
        )
    },

    fileDownload: function(data, fileName) {
      let blob = new Blob([data], {
        // type类型后端返回来的数据中会有，根据自己实际进行修改
        type: 'application/vnd.ms-excel'
      })
      let filename = fileName || '报表.xls'
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename)
      } else {
        var blobURL = window.URL.createObjectURL(blob)
        var tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', filename)
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(blobURL)
      }
    }
  }
}
</script>