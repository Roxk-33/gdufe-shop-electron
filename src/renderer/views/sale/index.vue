<template>
<div class="shop-container">
    <div>
        <p class='shop-title'>会员</p>
      
        <transition name="el-fade-in-linear">
            <el-input  v-show="showVip" placeholder="请输入内容" v-model="vipNo" class="input-with-select">
            <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="会员编号" value="1"></el-option>
                <el-option label="会员电话" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getVipInfo"></el-button>
            </el-input>
        </transition>
        <transition name="el-fade-in-linear">
          
            <el-card class="vip-card" v-show='!showVip'>
              <el-button  class='vip-card_closeBtn' type="primary" round icon="el-icon-close" @click="showVip = !showVip; vipInfo = {}"></el-button>
              
              <p>会员编号：{{vipInfo.no}}</p>
              <p>会员姓名：{{vipInfo.name}}</p>
              <p>会员电话：{{vipInfo.tel}}</p>
              <p>会员性别：{{vipInfo.sex == 1 ? '男' : '女'}}</p>
              
            </el-card>
            
        </transition>

    </div>
    <div>
        <p class='shop-title'>添加商品</p>
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
        <p class='shop-title'>商品列表</p>
        <el-table border :data="cartList" v-loading="listLoading" highlight-current-row class='goodsList'>
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
import { cleanCart, addGood, checkVip  } from "@/api/sale";
import { validateTel } from '@/utils/validate.js'

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
      showVip:true,
      vipInfo:{},
      loading: false,
      listLoading: false,
      vipNo:'',
      searchType : '1',
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
    getVipInfo(){
      if(this.vipNo == ''){
        this.$message({
            message: '请输入会员信息',
            type: "warning"
        });
        return; 
      }
      if(this.searchType == 2 && !validateTel(this.vipNo)){
        this.$message({
            message: '请输入电话',
            type: "warning"
        });
        return;
      }
      checkVip({no:this.vipNo}).then(rep => {
        console.log(rep);
        if(rep.data.status){
            this.showVip = !this.showVip;
            this.vipInfo = rep.data.info
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
  .shop-container .input-with-select{
    width: 420px;
  }
  .shop-container .el-select .el-input {
    width: 120px;
  }
  .vip-card{
    width: 400px;
  }
  .goodsList{
    width: 100%;
    margin-bottom: 10px;
  }
  .vip-card_closeBtn{
    float: right;
  }
</style>
