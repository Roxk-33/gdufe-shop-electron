<template>
<div class="shop-container sale-container">
    <div>
        <p class='shop-title'>会员</p>
        <transition name="el-fade-in-linear">
            <el-input  v-show="showVip" placeholder="请输入内容" v-model="vipNo" class="input-with-select">
            <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="会员编号" value="0"></el-option>
                <el-option label="会员电话" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getVipInfo"></el-button>
            </el-input>
        </transition>
        <transition name="el-fade-in-linear">
            <el-card class="vip-card" v-show='!showVip'>
              <el-button  class='vip-card_closeBtn' type="primary" round icon="el-icon-close" @click="showVip = !showVip; vipInfo = {}"></el-button>
              <p>会员编号：{{vipInfo.id}}</p>
              <p>会员姓名：{{vipInfo.name}}</p>
              <p>会员电话：{{vipInfo.tel}}</p>
              <p>会员性别：{{vipInfo.sex == 1 ? '男' : '女'}}</p>
            </el-card>
        </transition>
    </div>
    <div>
        <p class='shop-title'>添加商品</p>
        <el-form :inline="true" :model="postForm"  ref="postForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="商品编号" prop="goodId">
            <el-autocomplete  style="width:300px" v-model.number="postForm.goodId" value-key='goodName' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
               <template slot-scope="props" >
                  <div class="name">商品名：{{ props.item.good_name }}</div>
                </template>
            </el-autocomplete>
        </el-form-item>
        <el-form-item label="购买数量" prop="goodNum">
            <el-input-number v-model="postForm.goodNum" :min="1"  label="购买数量"></el-input-number>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="pushCart()" style="width:100px;" v-loading="loading">添加</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div>
        <p class='shop-title'>商品列表</p>
        <el-table border :data="cartList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="good_id" label="商品编号" width="200" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="good_num" label="数量" width="200">
            </el-table-column>
            <el-table-column align='center' prop="good_price" label="单价" width="200">
            </el-table-column>
            <el-table-column align='center' prop="good_total" label="合计" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
              <template slot-scope="scope">
                 <el-button type="danger" @click="delGood(scope.$index)" icon='el-icon-delete'></el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-button type="success" @click="dialogVisible = true" style="float:right;" >结算</el-button>
        <el-button type="danger" @click="emptyCart" style="float:right;margin-right:10px;" :disabled="isEmpty">清空</el-button>
    </div>
    <el-dialog title="结算" :visible.sync="dialogVisible" width="30%">
      <div class='pay-box'>
          <div class='pay-box-item'>
            <span>应收款：</span>
            <el-input v-model="TotalPrice" readonly></el-input>
          </div>
          <div class='pay-box-item'>
            <span>实收款：</span>
            <el-input v-model.number="pay" style="position:relative" :class="{'error_input' : !isEnough || !isNumber}"></el-input>
            <div class="error_input_tip" v-show="!isEnough && isNumber">实收款小于应收款</div>
            <div class="error_input_tip" v-show="!isNumber">只能输入数字</div>
          </div>
          <div  class='pay-box-item' v-if="isEnough && pay !== 0"><span>找余：</span>
            <el-input v-model="ChangeMoney" readonly ></el-input>
          
          </div>
      </div>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Clearing" :disabled="!isEnough || pay === 0">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import { cleanCart,  checkVip} from "@/api/front";
import { validateTel } from '@/utils/validate.js'
import { fetchAjaxGood,fetchGood } from "@/api/good";

const defaultForm = {
  goodId: "",
  goodNum: 0
};
export default {
  name: "settleAccounts",
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
      dialogVisible: false,
      pay : 0,
      vipNo:'',
      searchType : '1',
      rules: {
        goodId: [
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
    },

    pushCart() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetchGood(this.postForm)
            .then(data => {
              const {  info } = data;
                this.loading = false;
                info.good_total = 0;
                info.good_total = parseFloat((parseInt(this.postForm.goodNum) * parseFloat(info.good_price)).toFixed(1));
                this.cartList.push(info);
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
        }
      });
    },
    Clearing() {
      cleanCart({order:this.cartList,userId:this.vipInfo.userId,pay:this.pay}).then( data =>{
        
        this.$notify({
          title: '成功',
          message: '结算成功',
          type: 'success'
        });
        this.cartList = [];
        this.vipInfo = {};
        this.showVip = true;
        this.dialogVisible = false;
        this.pay = 0;
      })
    },
    delGood(index){
      this.cartList.splice(index,1);
    },
    emptyCart() {
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
      checkVip({target:this.vipNo, searchType:this.searchType}).then(data => {
          this.showVip = !this.showVip;
          this.vipInfo = data.info
      })
    }
  },
  watch:{
    searchType(){
      this.vipNo = '';
    }
  },
  computed:{
    TotalPrice(){
        let temp = 0;
        this.cartList.forEach(element => {
          temp =  temp + element.good_total;
        });
        return temp;
    },
    isEmpty(){
      return this.cartList.length == 0;
    },
    ChangeMoney(){
      return (this.pay - this.TotalPrice).toFixed(1); 
    },
    isEnough(){
      return this.pay >= this.TotalPrice || this.pay == 0
    },
    isNumber(){
      return !(isNaN(this.pay))
    }

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  .sale-container .input-with-select{
    width: 420px;
  }
  .sale-container .el-select .el-input {
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
  .error_input .el-input__inner{
   border: 1px  solid #f56c6c;
  }
  .error_input_tip{
     color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    padding-left: 20px;
  }
  .pay-box{
    text-align: center;
  }
  .pay-box-item{
    margin: 10px auto;
  }
  .pay-box-item .el-input{
    width:150px;
    display: inline-block;
  }
  .pay-box-item span{
    font-size: 15px;
    width:60px;
    display: inline-block;
  }
</style>
