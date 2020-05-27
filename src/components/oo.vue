<template>
  <div id="app">
    <el-form
      :model="loginForm"
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="name">
        <el-input
          type="text"
          clearable
          v-model="loginForm.uercode"
          auto-complete="off"
          placeholder="账号"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          clearable
          show-password
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item prop="emil">
      <el-input type="text" clearable v-model="loginForm.emil"
                auto-complete="off" placeholder="邮箱"  maxlength="10" show-word-limit></el-input>
      </el-form-item>-->
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          icon="el-icon-user-solid"
          style="width: 100%"
          @click="submitClick"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      loginForm: {
        uercode: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    submitClick: function() {
      var _this = this;
      _this.loading = false;
      _this
        .postRequest("/user/login.html", {
          uercode: this.loginForm.uercode,
          password: this.loginForm.password
        })
        .then(resp => {
          _this.loading = false;
          // console.log(resp);
          if (resp && resp.data.status == 0) {
            this.$message.success(resp.data.retmsg);
            var path = _this.$route.query.redirect;
            var dd = resp.data.user;
            _this.$store.commit("login", dd);
            // alert(resp.data.user.password)
            // _this.$router.replace({
            //   path: path == "/" || path == undefined ? "/Index" : path
            // });
            this.$router.push({
              // name:'Index',
              // params:{
              //   uercode:this.uercode,
              //   password:this.password
              // }
              path:'/Index'
            })
          } else {
            this.$message.error(resp.data.retmsg);
          }
        });
    }
  }
};
</script>

<style>
</style>