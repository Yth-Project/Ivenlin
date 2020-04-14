<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item,index) of timeline"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
        :color="index===0 ? '#0bbd87' : '' "
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
          <p>{{ item.times }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/4/20',
          title: '广东省 深圳市 龙岗区',
          content: 'ip - 36.54.99.612',
          times: '2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/21',
          title: '广东省 深圳市 龙岗区',
          content: 'ip - 36.54.99.612',
          times: '2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/22',
          title: '广东省 深圳市 龙岗区',
          content: 'ip - 36.54.99.612',
          times: '2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/23',
          title: '广东省 深圳市 龙岗区',
          content: 'ip - 36.54.99.612',
          times: '2019/4/20 20:46'
        }
      ]
    }
  }
}
</script>
