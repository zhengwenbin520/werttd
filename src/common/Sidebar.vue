<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
      
    >
      <template v-for="item in items" :v-if="true==item.isshowe">
        <template v-if="item.subs">
          <el-submenu :index="item.index"  :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "系统首页",
          isshow:true,
          isss:true,
        },
         {
          icon: "el-icon-location-information",
          index: "map",
          isshow:false,
          isss:true,
          title: "地图"
        },
        {
          icon: "el-icon-suitcase",
          index: "table",
          isshow:true,
          title: "肩背"
        },
        {
          icon: "el-icon-truck",
          index: "tabs",
          isshow:true,
          title: "车载",
           subs: [
            {
              index: "pre",
              title: "前置",
              isshow:true,
            },
            {
              index: "rear",
              title: "后置",
              isshow:true,
            }
          ]
        },
        {
          icon: "el-icon-s-cooperation",
          index: "3",
          isshow:true,
          title: "手持"
        },
        {
          icon: "el-icon-turn-off",
          index: "icon",
          isshow:true,
          title: "管栏"
        },
        {
          icon: "el-icon-user",
          index: "6",
          title: "用户管理",
          isshow:true,
          subs: [
            {
              index: "drag",
              title: "修改密码",
              isshow:true,
            },
            {
              index: "dialog",
              title: "个人信息",
              isshow:true,
            }
          ]
        },
        {
          icon: "el-icon-pie-chart",
          index: "charts",
          isshow:true,
          title: "注销"
     }
       
      ]
    };
  },
  
  computed: {
    onRoutes() {
        return this.$route.path.replace("/", "");
    },
  
  },

  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
