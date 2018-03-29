<template>
<div class="shop-container">
  
    <el-form  :model="postForm"  ref="postForm" :rules="rules" label-width="90px">
        <el-form-item label="商品名称" prop='goodName'>
            <el-input v-model="postForm.goodName" placeholder="商品名称" required></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
            <el-input v-model="postForm.supplier" placeholder="入库数量" required></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="goodAttr">
            <el-input v-model="postForm.goodAttr" placeholder="规格" required></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="goodDescribe">
            <el-input v-model="postForm.goodDescribe" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="goodDivide">
          <el-select v-model="postForm.goodDivide" placeholder="分类" required>
            <el-option
              v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本价" prop="cost">
            <el-input v-model.number="postForm.cost" placeholder="成本价" required></el-input>
        </el-form-item>
         <el-form-item label="库存警告值" prop="warmNum">
            <el-input v-model.number="postForm.warmNum" placeholder="库存警告值"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" class='btn' @click="onSubmit"  v-loading="loading" icon="el-icon-circle-plus-outline">添加</el-button>
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
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
      this.$refs['postForm'].validate(valid => {
        if (valid) {
            this.loading = true;
            addGoodInfo({good:this.postForm}).then(response => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
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
.btn{
  width:150px;
  margin:auto;
  display: block;
}
</style>
