<template>
  <div>
      <div style="flex:2;margin:auto">
        <audio-play :src="mp3_src"></audio-play>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      mp3_src:require('@/assets/mp3/test1.mp3')
    }
  },
};
</script>
<style lang="scss" scoped>
</style>