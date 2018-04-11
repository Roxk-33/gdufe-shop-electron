<template>
<div class="shop-container " style="width:500px;">
        <p class='shop-title'>商品价格设置</p>
        <el-form  :model="postForm"  ref="postForm" :rules="rules" label-width="100px" >
        <el-form-item label="商品编号" prop="goodId" style="width:500px">
            <el-autocomplete  style="width:400px" v-model.number="postForm.goodId" value-key='goodName' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
               <template slot-scope="props">
                  <div class="name">商品名：{{ props.item.good_name }}</div>
                </template>
            </el-autocomplete>
            <transition name="el-fade-in-linear">
              <el-card class="good-card" v-show='showBox'>
                <el-button  class='good-card_closeBtn' type="primary" size='small' round icon="el-icon-close" @click="showBox = !showBox;postForm.goodId = '' "></el-button>
                <p>商品编号：{{postForm.goodId}}</p>
                <p>商品名称：{{postForm.goodName}}</p>
              </el-card>
            </transition>
        </el-form-item>
        <el-form-item label="价格" prop="price" style="width:500px">
            <el-input v-model.number="postForm.price" :min="0"  label="价格"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="updatePrice" style="width:150px;" v-loading="loading">确认</el-button>
        </el-form-item>
        </el-form>
</div>
</template>

<script>
import { fetchAjaxGood, updateGoodPrice } from "@/api/good";

const defaultForm = {
  goodId: "",
  price: 0
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
            trigger: "change"
          }
        ],
        price: [
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
        this.showBox = true;
    },

    updatePrice() {
      delete this.postForm.goodName;
      updateGoodPrice(this.postForm).then( data =>{
          
            this.$message({
                message: "设置成功",
                type: "success"
            });
            this.postForm = {
                goodId: "",
                price: 0
            };
            this.showBox = false;
            
      })
    },
  }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-container .input-with-select{
    width: 420px;
  }
  .good-card{
    width: 250px;
    margin: 10px 0;
  }
  .goodsList{
    width: 100%;
    margin-bottom: 10px;
  }
  .good-card_closeBtn{
    // width:20px;
    float: right;
  }
  
  .shop-container .el-select .el-input {
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
