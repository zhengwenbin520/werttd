<template>
  <div id="page">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-present"></i>管栏
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          id="budele"
          type="primary"
          :disabled="display"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-date-picker
          v-model="begintime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
        <el-date-picker
          v-model="endtime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
        <el-button
          type="primary"
          id="bindex"
          class="button-index"
          icon="el-icon-search"
          :disabled="disabled"
          @click="handleSearch"
        >搜索</el-button>
        <!-- <el-button type="primary" class="button-excle" icon="el-icon-plus" @click="exportFile">导出数据</el-button> -->
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中..."
        :data="list"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="taskid" label="任务值" width="60px" align="center"></el-table-column>
        <el-table-column prop="time" label="时间毫秒数" align="center"></el-table-column>
        <el-table-column prop="datetime" label="日期" align="center"></el-table-column>
        <el-table-column prop="longitude" label="经度" align="center"></el-table-column>
        <el-table-column prop="latitude" label="纬度" align="center"></el-table-column>
        <el-table-column prop="light" label="光强" align="center"></el-table-column>
        <el-table-column prop="ch4" label="甲烷浓度" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" :disabled="display" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.row)"
              :disabled="display"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="pageNum"
          :page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <!-- 添加 -->
      <el-form :model="ta" ref="ta" class="asa"  :rules="rules" >
        <el-dialog
          :title="dialogTitle"
          :close-on-click-modal="false"
          style="margin: auto;overflow:hidden;width:900px;"
          :show-close="show"
          :visible.sync="passVisible"
        >
          <el-divider></el-divider>
          <el-form-item label="任务值" prop="taskid">
            <el-input
              v-model="ta.taskid"
              placeholder="任务值"
              clearable
              maxlength="11"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="毫秒" prop="time">
            <el-input
              v-model="ta.time"
              placeholder="事件毫秒数"
              clearable
              maxlength="13"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="datetime">
            <el-date-picker
              v-model="ta.datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              clearable
              type="datetime"
              show-word-limit
              style="width: 250px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input
              v-model="ta.longitude"
              placeholder="经度"
              clearable
              maxlength="11"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input
              v-model="ta.latitude"
              placeholder="纬度"
              clearable
              maxlength="11"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="光强" prop="light">
            <el-input
              v-model="ta.light"
              placeholder="光强"
              clearable
              maxlength="11"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="浓度" prop="ch4">
            <el-input
              v-model="ta.ch4"
              placeholder="甲烷浓度"
              clearable
              maxlength="11"
              show-word-limit
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <div>
            <el-button type="primary" @click="submitForm()">修改</el-button>
            <el-button type="primary" @click="one()">取消</el-button>
          </div>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from "../../common/bus";
import moment from "moment";
export default {
  data() {
    return {
      display:false,
      multipleSelection: [],
      loading: false,
      ta: {
        id: "",
        taskid: "",
        time: "",
        datetime: "",
        longitude: "",
        latitude: "",
        light: "",
        ch4: ""
      },
      begintime: "", //  开始时间
      endtime: "", //  结束时间
      dialogTitle: "", //  模态框的标题名
      passVisible: false, //  是否打开模态框
      show: false, //  是模态框的×隐藏
      rules: {}, //  验证规则
      table: "message01", //  表
      disabled: true, //   表里面的数据
      list: [],
      //   清空
      listCliear: {
        taskid: "",
        time: "",
        datetime: "",
        longitude: "",
        latitude: "",
        light: "",
        ch4: ""
      },

      pageNum: 1, // 我给你的第1页数据
      pageSize: 5, //  每页显示的数据
      total: 0 //  总条数
    };
  },

  //   监听日期失去焦点的事件
  watch: {
    begintime: function() {
      if (this.begintime != "" && this.begintime != null) {
        this.disabled = false;
      } else if (this.begintime == null) {
        this.disabled = true;
        this.handleSearch();
      }
    },
    endtime: function() {
      if (this.endtime != "" && this.endtime != null) {
        this.disabled = false;
      } else if (this.endtime == null) {
        this.disabled = true;
        this.handleSearch();
      }
    }
  },
  created(){
    const dis = this.$store.state.usertype;
    if(dis==false){
      //alert(111)
       return this.display = true
    }
  },
  methods: {
    //  清空
    disreCliear() {
      this.listCliear = {
        taskid: "",
        time: "",
        mody: "",
        longitude: "",
        latitude: "",
        light: "",
        ch4: ""
      };
    },

    //  搜索
    handleSearch() {
      let par = {
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize, //  这是我发给后端的
          begintime: this.begintime,
          endtime: this.endtime
        },
        code: this.code,
        table: this.table
      };
      this.loading = true;
      this.postRequest("/Springmvc_Maven06/kxd1/selectClass.json", par).then(
        result => {
          if (result && result.data.code == 1) {
            this.list = result.data.data.list; //  这个是我想要的
            this.total = result.data.data.total;
          } else if (result && result.data.code == 0) {
            this.list = [];
            this.total = 0;
            this.pageNum = 1;
            this.pageSize = 5;
          }
          this.loading = false;
        }
      );
    },
    //  多选删除
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //  批量删除
    delAllSelection() {
      
      if (this.multipleSelection==0) {
        this.$message.error(`请选中后！！在删除！！！`);
      }else{
         this.$confirm(
        "此操作将删除[" + this.multipleSelection.length + "]条数据,是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
             ids.push(this.multipleSelection[i].id);
          }
          let par = {
            dataLists: ids,
            table: "message01_s",
            code: this.code
          };
          
          let _this = this;
          _this
            .postRequest("/Springmvc_Maven06/kxd1/delateClass.json", par)
            .then(result => {
              if (result && result.data.code == 1) {
                _this.handleSearch();
              } else {
                this.$message.error(`删除失败！`);
              }
            });
        })
        .catch(() => {});
      }
     
    },
    //  编辑
    handleEdit(row) {
      this.dialogTitle = "修改数据";
      this.passVisible = true;
      Object.assign(this.ta, {
        id: row.id,
        taskid: row.taskid,
        time: row.time,
        datetime: row.datetime,
        longitude: row.longitude,
        latitude: row.latitude,
        light: row.light,
        ch4: row.ch4
      });
    },
    //  删除
    handleDelete(row) {
      //删除
      this.$confirm("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _this = this;
          let par = {
            data: {
              id: row.id
            },
            table: this.table,
            code: this.code
          };
          _this
            .postRequest("/Springmvc_Maven06/kxd1/delateClass.json", par)
            .then(result => {
              if (result && result.data.code == 1) {
                _this.handleSearch();
              } else {
                this.$message.error(`删除失败！`);
              }
            });
        })
        .catch(() => {});
    },
    //  分页
    handlePageChange(size) {
      //改变页码事件
      this.pageNum = size;
      this.handleSearch();
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    //  导出
    exportFile() {},
    one() {
      this.passVisible = false;
    },
    // 修改
    submitForm(row) {
      // this.passVisible = false;
      let par = {
        data: {
          id: this.ta.id,
          taskid: this.ta.taskid,
          time: this.ta.time,
          datetime: this.ta.datetime,
          longitude: this.ta.longitude,
          latitude: this.ta.latitude,
          light: this.ta.light,
          ch4: this.ta.ch4
        },
        table: this.table,
        code: this.ta.code
      };
      this.postRequest("/Springmvc_Maven06/kxd1/updateClass.json", par).then(
        result => {
          if (result && result.data.code == 1) {
            this.passVisible = false;
            this.handleSearch();
            alert("修改成功");
          } else {
            this.$message.error(`修改失败！`);
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.el-card {
  height: 450px;
}
span {
  font-weight: bold;
}
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 7px;
}
#bindex {
  margin-bottom: 15px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.button-index {
  margin-left: 10px;
}
.button-excle {
  margin-left: 345px;
  width: 200px;
}
.schart {
  width: 100%;
  height: 300px;
}
h3 {
  text-align: center;
  font-weight: bold;
  margin-top: -10px;
}
.el-form-item {
  text-align: left;
}
</style>