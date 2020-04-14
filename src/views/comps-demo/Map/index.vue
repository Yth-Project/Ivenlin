<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: {},
      lat: 114.06611219325782,
      lng: 22.548514883102943
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        //判断是否有这个对象
        navigator.geolocation.getCurrentPosition(function(pos) {
          console.log(
            "经度：" + pos.coords.longitude + "纬度：" + pos.coords.latitude
          );
        });
      } else {
        console.log("当前系统不支持GPS API");
      }
    },
    getCurrentCity() {
      var cityName = arguments[0].name;
      this.lat = arguments[0].center.lat;
      this.lng = arguments[0].center.lng;
      this.map.setCenter(cityName);
    },
    getPoint(lat, lng) {
      return new BMap.Point(lat, lng);
    },
    //初始化地图
    initMap() {
      // 创建地图实例

      this.map = new BMap.Map("map");
      let map = this.map;
      // 设置中心点坐标 - 天安门
      let point = this.getPoint(116.404, 39.915);
      // 地图初始化，同时设置地图展示级别
      map.centerAndZoom(point, 15);

      // IP定位 获取城市
      var myCity = new BMap.LocalCity();
      myCity.get(this.getCurrentCity);

      // 开启鼠标滚轮播放
      map.enableScrollWheelZoom(true);

      // 向地图添加控件。
      map.addControl(new BMap.NavigationControl()); // 平移缩放控件 - PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方
      map.addControl(new BMap.ScaleControl()); // 比例尺 - 默认位于地图左下方，显示地图的比例关系
      map.addControl(new BMap.OverviewMapControl()); // 缩略地图 - 默认位于地图右下方，是一个可折叠的缩略地图
      map.addControl(new BMap.MapTypeControl()); // 地图类型 - 默认位于地图右上方

      var marker = new BMap.Marker(this.getPoint(this.lat, this.lng)); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中

      // enableDragging-开启 / disableDragging-关闭
      marker.enableDragging();
      marker.addEventListener("dragend", function(e) {
        console.log("当前位置：" + e.point.lng + ", " + e.point.lat);
      });
    }
  }
};
</script>
<style scoped lang="scss">
#map {
  min-height: calc(100vh - 84px);
}
</style>