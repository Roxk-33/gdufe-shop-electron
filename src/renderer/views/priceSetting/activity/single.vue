<template>
<div style="margin:10px auto;  width:100%;">
        <el-form  :model="postForm"  ref="postForm" :rules="rules" label-width="100px" style="" class='formGood'>
         <el-form-item label="活动名称" prop="name" style="width:300px">
            <el-input v-model="postForm.name"   label="名称" ></el-input>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodId" style="width:500px">
            <el-autocomplete  style="width:200px" v-model.number="postForm.goodId" value-key='goodName' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
               <template slot-scope="props">
                  <div class="name">商品名：{{ props.item.good_name }}</div>
                </template>
            </el-autocomplete>
            
        </el-form-item>
        <el-form-item label="限定数量" prop="num" style="width:500px">
            <el-input-number v-model.number="postForm.num " :min="0"  label="价格"></el-input-number>
        </el-form-item>
         <el-form-item label="优惠" prop="discount" style="width:500px">
            <el-input v-model.number="postForm.discount" :min="1"  style="width:150px"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="updatePrice" style="width:150px;" v-loading="loading" >确认</el-button>
        </el-form-item>
        </el-form>
        <transition name="el-fade-in-linear" >
              <el-card class="good-card" v-show='showBox' >
                <el-button  class='good-card_closeBtn' type="primary" size='small' round icon="el-icon-close" @click="showBox = !showBox;postForm.goodId = '' "></el-button>
                <p>商品编号：{{postForm.goodId}}</p>
                <p>商品名称：{{postForm.goodName}}</p>
                <p>商品价格：{{postForm.goodPrice}}</p>
              </el-card>
            </transition>
</div>
</template>

<script>
import { fetchAjaxGood, updateGoodPriceSingle } from "@/api/good";

const defaultForm = {
  goodId: "",
  discount: 0,
  num : 1
};
export default {
  name: "priceSetting",
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
      listLoading: false,
      dialogVisible: false,
      showBox:false,
      importance: 1,
      note:'',
      rules: {
        goodId: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "blur"
          }
        ],
        discount: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    
    querySearchAsync(query, cb) {
       if(query === ''|| query === undefined){
         cb();
         
      }else{
        fetchAjaxGood({target : query}).then( data =>{
           if(data.status){
            cb(data.info);
          }
       })
      }
    },
    handleSelect(item) {
        this.postForm.goodId = parseInt(item.good_id);
        this.postForm.goodName = item.good_name;
        this.postForm.goodPrice = item.good_price;
        this.showBox = true;
    },

    updatePrice() {
      delete this.postForm.goodName;
      delete this.postForm.goodPrice;
      updateGoodPriceSingle(this.postForm).then( data =>{
          
            this.$message({
                message: "设置成功",
                type: "success"
            });
            this.postForm = {
                goodId: "",
                discount: 0,
                name:''
            };
            this.showBox = false;
            
      })
    },
    
  }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   .input-with-select{
    width: 420px;
  }
    .formGood{
    display: inline-block;
    width:400px;
       margin: 10px 0 0 300px;
  }
 
  .good-card{
    width: 250px;
    display: inline-block;
    
  }
  .goodsList{
    width: 100%;
    margin-bottom: 10px;
  }
  .good-card_closeBtn{
    // width:20px;
    float: right;
  }
  
   .el-select .el-input {
    width: 120px;
  }
  .goodList{
    width:1000px;
    margin: 10px auto;
  }
  .btn-box{
    display: flex;
    justify-content:  flex-end;
    margin-top:30px;
  }
  .btn-box >div span{
    color: #409EFF;
    font-weight: 600;
  }
  .btn-box .el-button{
    width:120px;
    height: 80%;
    margin-left: 20px;
    margin-top: 7px;
  }
  .order-box{
    width: 50%;
    margin: 10px 0;
  }
  .order-box label{
    width: 100px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 36px;
    
  }
  .order-box_note,.order-box_importance{
    margin: 10px;
  }
  .order-box_note .el-input, .order-box_importance .el-rate{
    width:220px;
    display: inline-block;
  }


</style>
