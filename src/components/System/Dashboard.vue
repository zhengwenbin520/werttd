<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <!-- 其实 这个state 可以这样写 没必要一直用$store -->
              <div class="user-info-name">{{userid}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            登录时间：
            <span>{{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</span>
          </div>
          <div class="user-info-list">
            登录地点：
            <span>东莞</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>商品详情</span>
          </div>肩背
          <el-progress :percentage="71.3" color="#42b983"></el-progress>车载
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>手持
          <el-progress :percentage="13.7"></el-progress>管栏
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-chat-dot-round grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-orange grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:403px;">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="b1">
          <h3 class="bb">年度统计表</h3>
          <ve-histogram :data="chartData" :toolbox="toolbox" :loading="loading" :colors="appcolor"></ve-histogram>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Schart from "vue-schart";
import moment from "moment";
import bus from "../../common/bus";
import { mapState } from 'vuex';
export default {
  name: "dashboard",
  // 计算属性 这样直接就拿到vuex 的state的属性了。
  computed:{
    ...mapState({
      userid:state => state.userid
    })
  },
  data() {
    //  图片的工具箱，可以和折线图之间来回的切换，也可以保存图片
    this.toolbox = {
      feature: {
        magicType: { type: ["line", "bar"] },
        saveAsImage: {}
      }
    };
    return {
      role:'欢迎您的登入',
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
      x:'',
      //  进行判断的钩子！从而达到一样的话如果直接不登录就进首页等其他页面，则会直接跳到login界面
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要线路短路",
          status: false
        },
        {
          title: "明天切记把测试做好",
          status: false
        },
        {
          title: "请把车停到安全的地方",
          status: false
        },
      ],
      loading: true,
      chartData: {
        columns: ["月份", "访问用户"],
        rows: [
          { 月份: "1月", 访问用户: 1393 },
          { 月份: "2月", 访问用户: 3530 },
          { 月份: "3月", 访问用户: 2923 },
          { 月份: "4月", 访问用户: 1723 },
          { 月份: "5月", 访问用户: 3792 },
          { 月份: "6月", 访问用户: 893 },
          { 月份: "7月", 访问用户: 93 },
          { 月份: "8月", 访问用户: 1593 },
          { 月份: "9月", 访问用户: 6593 },
          { 月份: "10月", 访问用户: 7593 },
          { 月份: "11月", 访问用户: 3 },
          { 月份: "12月", 访问用户: 113 }
        ]
      },
      appcolor: ["#FF0000"], //   改变颜色
      loading: false, //   加载
      data: [
        {
          name: "2018/09/04",
          value: 1083
        },
        {
          name: "2018/09/05",
          value: 941
        },
        {
          name: "2018/09/06",
          value: 1139
        },
        {
          name: "2018/09/07",
          value: 816
        },
        {
          name: "2018/09/08",
          value: 327
        },
        {
          name: "2018/09/09",
          value: 228
        },
        {
          name: "2018/09/10",
          value: 1065
        }
      ],
 
      options2: {
        type: "line",
        title: {
          text: "最近几个月各品类销售趋势图"
        },
        labels: ["6月", "7月", "8月", "9月", "10月"],
        datasets: [
          {
            label: "商品",
            data: [234, 278, 270, 190, 230]
          },
        
        ]
      }
    };
  },
  // 渲染图表
  components: {
    Schart
  },
  /*Vue的生命周期
    通常是为  metheds  函数提前定义（ 类似提前声明变量 进入页面内容全部渲染完成后自动引函数） */
  mounted() {
    this.currentTime();   //时间
  },
  // 销毁定时器
  beforeDestroy: function() {
    if (this.getDate) {
      // 在Vue实例销毁前，清除时间定时器
      clearInterval(this.getDate); 
    }
  },

  methods: {
    //  定义定时器
    currentTime() {
      setInterval(this.getDate, 500);
    },
    //  时间
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      if (week == 1) {
        this.nowWeek = "星期一";
      } else if (week == 2) {
        this.nowWeek = "星期二";
      } else if (week == 3) {
        this.nowWeek = "星期三";
      } else if (week == 4) {
        this.nowWeek = "星期四";
      } else if (week == 5) {
        this.nowWeek = "星期五";
      } else if (week == 6) {
        this.nowWeek = "星期六";
      } else {
        this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.b1 {
  height: 400px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 358px;
}
h3 {
  text-align: center;
  font-weight: bold;
  margin-top: -10px;
}
</style>