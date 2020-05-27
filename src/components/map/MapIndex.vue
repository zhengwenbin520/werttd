<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-location-outline"></i>地图
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-col :span="24">
      <el-card shadow="hover">
        <div :style="{width:'107%',height:'550px'}">
          <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
        </div>
        <div class="toolbar">
          <span class="a2">经度 = {{ lng }} 纬度 = {{ lat }}</span>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    const self = this;
    return {
      //   坐标
      center: [121.59996, 31.197646],
      //   经度
      lng: 0,
      //   纬度
      lat: 0,
      plugin: [
        {
          pName: "Geolocation",
          // 是否自动开启定位设置     false：不是自动   true:自动
          //  autoPosition:true,
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.el-card {
  height: 580px;
}
.amap-demo {
  margin-top: -17px;
  margin-right: 79px;
}
</style>