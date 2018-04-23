<template>
<div style="" class='activity-box'>
        <el-form  :inline="true" :model="postForm"  ref="postForm" :rules="rules" label-width="80px" >
        <el-form-item label="商品编号" prop="goodId" style="width:300px">
            <el-autocomplete  style="width:200px" v-model="postForm.goodId" value-key='goodName' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
               <template slot-scope="props">
                  <div class="name">商品名：{{ props.item.good_name }}</div>
                </template>
            </el-autocomplete>
            
        </el-form-item>
        <el-form-item label="限定数量" prop="price" style="width:300px">
            <el-input-number v-model.number="postForm.num " :min="0"  label="价格" ></el-input-number>
        </el-form-item>
       
         
        <el-form-item >
            <el-button type="success" @click="pushGood" style="width: 70px;" v-loading="loading">添加</el-button>
        </el-form-item>
        </el-form>

       <el-table border :data="goodsList"  class='goodsList' style="width:781px;margin:10px auto;" empty-text='暂无商品'>
            <el-table-column align='center' type="index" label="序号" width="120px">
            </el-table-column>
            <el-table-column align='center' prop="goodId" label="商品编号" width="120px">
            </el-table-column>
            <el-table-column align='center' prop="goodName" label="商品名称" width="120px">
            </el-table-column>
            <el-table-column align='center' prop="goodPrice" label="商品价格" width="120px">
            </el-table-column>
            <el-table-column align='center' prop="num" label="商品参与数量" width="180px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.num" :min='1' size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align='center' prop="num" label="操作" width="120px">
              <template slot-scope="scope">
                  <el-button type="danger" @click="deleteGood(scope.row.$index)" style="width: 70px;">删除</el-button>
                
              </template>
            </el-table-column>
        </el-table>
           优惠： <el-input v-model.number="discount" :min="1"  style="width:80px;margin-right:10px;"></el-input>
           活动名称： <el-input v-model="activityName" :min="1"  style="width:200px;margin-right:10px;"></el-input>
        
        <el-button type="primary" @click="updatePrice" style="width:100px;margin:10px auto;" v-loading="loading" >确认</el-button>
        
</div>
</template>

<script>
import { fetchAjaxGood, updateGoodPriceMultiple, fetchGoodInfo } from "@/api/good";

const defaultForm = {
  goodId: "",
  num:1,
  name:''
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
      discount : 0,
      listLoading: false,
      dialogVisible: false,
      goodsList : [],
      showBox:false,
      isBundling : false,
      importance: 1,
      activityName:'',
      note:'',
      rules: {
        // goodId: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "输入数字",
        //     trigger: "blur"
        //   }
        // ],
        price: [
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
      if(this.goodsList.length <= 1){
        this.$message({
              message: "数量不足",
              type: "warning"
        });
        return;
      };
      updateGoodPriceMultiple({goodsList : this.goodsList, discount:this.discount, name:this.activityName}).then( data =>{
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
    pushGood(){


        fetchGoodInfo({goodId:this.postForm.goodId}).then(data => {
              this.postForm.goodName = data.info.good_name;
              this.postForm.goodId = data.info.good_id;
              this.postForm.goodPrice = data.info.good_price;


              let flag = true;
              flag = this.goodsList.every( item=>{
                return item.goodId !=this.postForm.goodId
              });
              if(!flag){
                this.$message({
                      message: "已有该商品",
                      type: "warning"
                  });
                  return;
              }
              this.goodsList.push(this.postForm);
              this.postForm = {
                  goodId: "",
                  price: 0,
                  num : 1,
              };

              this.$message({
                message: "添加成功",
                type: "success"
              });
          }).catch(err => {
              this.loading = false;
          }); 
    },
    deleteGood(index){
      this.goodsList.splice(index,1);
    }
    
  }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .activity-box{
      margin:10px auto;  
      width:100%;    
      text-align: center;
  }
  
</style>
