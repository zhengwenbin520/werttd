<template>
  <div id="map">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-location-outline"></i>地图
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-col :span="24">
      <el-card shadow="hover">
        <div class="map-index" :style="{width:'69%',height:'550px',border:'1px'}">
          <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
            <div class="toolbar">
              <p>经度:{{ lng }}</p>
              <p>纬度:{{ lat }}</p>
            </div>
          </el-amap>
        </div>
      </el-card>
      <div class="map-too">
        <el-row class="map-row">
          <el-col :span="24">
            <div class="too-sya">
              <span>操作列表</span>
            </div>
            <div class="too-one">
              <span>
                选择:
                <el-select
                  style="width:80px"
                  size="mini"
                  v-model="value"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button type="primary">开始任务</el-button>
                <el-button type="danger">停止任务</el-button>
                <el-button type="info">上传报告</el-button>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="map-two">
        <el-row class="map-row2">
          <el-col :span="24">
            <div class="map-text">
              <span>巡检信息</span>
            </div>
            <div>
              11
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    const self = this;
    return {
      options: [
        {
          value: 1,
          label: "key12"
        },
        {
          value: 2,
          label: "key13"
        },
        {
          value: 3,
          label: "key14"
        }
      ],
      value: "",
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
  },
  methods: {
    rt() {
      console.log(111);
    }
  }
};
</script>

<style scoped>
.el-card {
  height: 600px;
}
.map-too {
  margin-left: 69%;
  margin-top: -590px;
  width: 30%;
}
.toolbar {
  position: absolute;
  top: 100px;
  color: mediumvioletred;
}
.map-row {
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
.too-sya {
  height: 25px;
  background-color: cornflowerblue;
  text-align: center;
  padding-top: 8px;
  border-radius: 4px;
}
.too-one {
  height: 40px;
  padding-top: 10px;
}
.map-two {
  padding-top: 10px;
  margin-left: 69%;
  width: 30%;
}
.map-text {
  height: 25px;
  background-color: cornflowerblue;
  text-align: center;
  padding-top: 8px;
  border-radius: 4px;
}
.map-row2 {
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  height: 465px;
  background-color: lavenderblush;
}
</style>