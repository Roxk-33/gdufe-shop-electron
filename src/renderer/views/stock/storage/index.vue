<template>
<div class="shop-container">
  
    <el-form  :model="postForm"  ref="postForm" :rules="rules"  label-width="80px">
        <el-form-item label="商品编号" prop="goodNo">
            <el-input v-model.number="postForm.goodNo" placeholder="商品编号" required></el-input>
        </el-form-item>
        <el-form-item label="入库数量" prop="supplier">
            <el-input v-model="postForm.goodNum" placeholder="入库数量" required></el-input>
        </el-form-item>
        <el-form-item style="display:block;text-align: center;">
            <el-button type="primary" @click="onSubmit" style="width:150px;" v-loading="loading">入库</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { goodINstock } from "@/api/stock";
const defaultForm = {
  goodNo: "",
  goodNum: 0,
};
export default {
  name: "storage",
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(null);
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      rules: {
        goodNo: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "change"
          }
        ],
        goodNum: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.loading = true;
            goodINstock(postForm).then( data => {
                this.loading = false;
            })
            .catch(err => {
                this.loading = false;
                this.$message({message: err,type: "error"});
            });
        } else {
            
        }
      });
      
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.shop-container {
  width: 50%;
  min-width: 700px;
  margin: 40px auto;
}
</style>
