<template>
<div class="shop-container">
    <div>
        <el-form :inline="true" :model="postForm"  ref="postForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="商品编号" prop="goodNo">
            <el-input v-model.number="postForm.goodNo" placeholder="商品编号" required></el-input>
        </el-form-item>
        <el-form-item label="购买数量" prop="goodNum">
            <el-input-number v-model="postForm.goodNum" :min="1"  label="购买数量"></el-input-number>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="pushCart()" style="width:150px;" v-loading="loading">添加</el-button>
        </el-form-item>
    </el-form>
    </div>
    <div>
        <el-table border :data="cartList" v-loading="listLoading" highlight-current-row style="width: 100%; margin:50px auto;">
            
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="good_no" label="商品编号" width="200" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="good_num" label="数量" width="200">
            </el-table-column>
            <el-table-column align='center' prop="good_price" label="单价" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
                  <el-button type="success" @click="delGood()" style="float:right;" >删除</el-button>
                
            </el-table-column>
        </el-table>
        <el-button type="success" @click="Clearing" style="float:right;" >结算</el-button>
        <el-button type="danger" @click="Empty" style="float:right;margin-right:10px;" :disabled="cartList.length > 0">清空</el-button>
    </div>
        
</div>
</template>

<script>
import { cleanCart, addGood } from "@/api/sale";
const defaultForm = {
  goodNo: "",
  goodNum: 0
};
export default {
  name: "sale",
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
      cartList: [],
      fetchSuccess: true,
      loading: false,
      listLoading: false,
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
    
    pushCart() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          addGood(this.postForm)
            .then(response => {

              const {status,info} = response.data;
              if (status) {
                this.$message({
                  message: response.data,
                  type: "success"
                });
                this.loading = false;
                this.cartList.push(info);
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message({ message: err, type: "error" });
            });
        } else {
        }
      });
    },
    Clearing() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          cleanCart(this.postForm)
            .then(response => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.loading = false;
              this.cartList = [];
            })
            .catch(err => {
              this.loading = false;
              this.$message({ message: err, type: "error" });
            });
        } 
      });
    },
    Empty() {
      this.cartList = [];
    },
    getVipInfo(no){
      checkVip({no}).then(function (rep) {
        if(rep.status){

        }else{
          this.$message({
                message: resp.data.message,
                type: "info"
          });
        }
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
