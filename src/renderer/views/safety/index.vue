<template>
  <div class='changePass-container'>
    <el-form :model="postForm" status-icon :rules="rules2" ref="postForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="postForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="postForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
       
        <el-form-item>
            <el-button type="primary" @click="submitForm('postForm')">提交</el-button>
            <el-button @click="resetForm('postForm')">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePass } from "@/api/login";
export default {
  name: "change",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {

        if (value.length < 6) {
          callback(new Error("密码不能小于6位"));
        }else{
          if (this.postForm.checkPass !== "") {
          this.$refs.postForm.validateField("checkPass");
        }
        callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.postForm.password) {


        callback(new Error("两次输入密码不一致!"));
      } else {

         if (value.length < 6) {
          callback(new Error("密码不能小于6位"));
        }else{
        callback();
        }
      }
    };
    return {
      postForm: {
        password: "",
        checkPass: "",
        account: this.$store.state.user.token
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          changePass(this.postForm).then(data => {
            this.$notify({
              title: "成功",
              message: "成功修改密码",
              type: "success",
              duration: 2000
            });
          });
        } else {
          this.$notify({
              title: "失败",
              message: "请按照提示输入密码",
              type: "error",
              duration: 2000
            });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.changePass-container {
  width: 30%;
  margin: 40px auto;
}
</style>
