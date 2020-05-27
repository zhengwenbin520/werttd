<template>
  <div class="aa">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="userid">
          <el-input v-model="param.userid" placeholder="userid" maxlength="10" show-word-limit>
            <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            maxlength="10"
            show-word-limit
            show-password
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-s-cooperation"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from "../common/bus";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      param: {
        code: "",
        message: "",
        count: "",
        table: "user01",
        userid: "",
        username: "",
        password: ""
      },

      rules: {
        userid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["login"]),
     submitForm() {
      var _this = this;
      let par = {
        code: _this.param.code,
        count: _this.param.count,
        data: {
          userid: _this.param.userid,
          username: _this.param.username,
          password: _this.param.password
        },
        message: _this.param.message,
        table: _this.param.table
      };

      this.$refs.login.validate(valid => {
        if (valid) {
          _this
            .postRequest("/Springmvc_Maven06/kxd1/login.json", par)
            .then(result => {
              if (result && result.data.code == 1) {
                const params = {
                  userid: result.data.data.userid,
                  username: result.data.data.username,
                  token: result.data.token
                };
                this.login(params)
                this.$router.push("/dashboard");       
              } else {
                this.$message.error(result.data.message);
              }
            });
        }else {
          this.$message.error(`账号、密码不能为空！`);
        }
      });
    }
  }
};
</script>

<style scoped>
.aa {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>