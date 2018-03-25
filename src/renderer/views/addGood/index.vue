<template>
<div class="shop-container">
  
    <el-form  :model="postForm"  ref="postForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="商品名称" prop='goodName'>
            <el-input v-model="postForm.goodName" placeholder="商品名称" required></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
            <el-input v-model="postForm.supplier" placeholder="入库数量" required></el-input>
        </el-form-item>
        <el-form-item label="成本价" prop="cost">
            <el-input v-model.number="postForm.cost" placeholder="成本价" required></el-input>
        </el-form-item>
         <el-form-item label="库存警告值" prop="warmNum">
            <el-input v-model.number="postForm.warmNum" placeholder="库存警告值"></el-input>
        </el-form-item>
        <el-form-item style="display:block;text-align: center;">
            <el-button type="primary" @click="onSubmit" style="width:150px;" v-loading="loading">入库</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { addGoodInfo } from "@/api/good";
const defaultForm = {
  goodName: "",
  supplier:'',
  cost:0,
  warmNum:'',
};
export default {
  name: "addGoodInfo",
  data() {
   
    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      rules: {
        
        cost: [
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
            addGoodInfo(postForm).then(response => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.loading = true;
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
