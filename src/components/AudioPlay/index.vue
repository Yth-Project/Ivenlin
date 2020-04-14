<template>
  <div class="audio-continer">
    <div class="audio-controller">
      <span @click="mp">检查MP3</span>
      <svg-icon icon-class="audio_up" />
      <svg-icon
        :icon-class="AUDIO_PAUSED?'audio_start':'audio_stop'"
        @click="onStartStop(AUDIO_PAUSED)"
      />
      <svg-icon icon-class="audio_down" />

      <el-slider v-model="value" input-size="mini" :min="0" :max="100" :show-tooltip="false"></el-slider>
        
        <span><strong>00:00 / 00:00</strong></span>
      <svg-icon
        :icon-class="AUDIO_MUTED?'audio_voice_off':(AUDIO_VOLUME==0?'audio_voice_off':'audio_voice_on')"
        @click="AUDIO_MUTED=!AUDIO_MUTED"
      />
      <svg-icon icon-class="audio_list" />
    </div>
    <audio preload ref="audio" >
      <source :src="src" />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: 0,
      AUDIO_PAUSED: true, //当前是否暂停 - get/set v:true/false
      AUDIO_CURRENTTIME: 0, // 当前播放位置 - get/set
      AUDIO_DURATION: 0, // 音频长度 - get
      AUDIO_MUTED: false, // 当前是否关闭声音 - get/set v:true/false
      AUDIO_VOLUME: 1, // 当前音量 - get/set v:0.0 ~ 1.0
     AUDIO_READYSTATE: null // 当前音频的就绪状态 - get v:true/false
    };
  },
  watch:{
      AUDIO_READYSTATE(val){
          console.log(val)
      }
  },
  created(){
  },
  mounted(){
      this.AUDIO_READYSTATE = this.$refs["audio"].readyState;
  },
  methods: {
    mp() {
      const audio = this.$refs["audio"];
      console.log("返回当前音频的 URL", audio.currentSrc);
      console.log(
        "设置或返回音频中的当前播放位置（以秒计）",
        audio.currentTime
      );
      console.log("返回音频的长度（以秒计）。", audio.duration);
      console.log("返回音频的播放是否已结束。", audio.ended);
      console.log("设置或返回是否关闭声音。", audio.muted);
      console.log("设置或返回音频是否暂停。", audio.paused);
      console.log("设置或返回音频的音量。", audio.volume);
      console.log("设置或返回音频的 src 属性的值。", audio.src);
      console.log("设置或返回音频的 preload 属性的值。", audio.preload);
      console.log("就绪状态。", audio.readyState);
    },
    onStartStop(pause) {
      if (pause) {
        this.$refs["audio"].play();
        this.AUDIO_PAUSED = !this.AUDIO_PAUSED;
      } else {
        this.$refs["audio"].pause();
        this.AUDIO_PAUSED = !this.AUDIO_PAUSED;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 重置element-ui 样式 */
.audio-continer {
  .el-slider {
    display: inline-block;
    width: 200px;
    margin: 0 10px;
  }
  .el-slider >>> .el-slider__runway {
    margin: 3px 0 !important;
  }
}
</style>

<style lang="scss" scoped>
.audio-continer {
  display: inline-block;
  .audio-controller svg {
    color: #292929;
    cursor: pointer;
  }
  span{
      font-size:16px;
  }
}
</style>