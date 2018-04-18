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
                <el-autocomplete  style="width:300px" v-model.number="postForm.goodId" value-key='goodId' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
                  <template slot-scope="props" >
                      <div class="name">商品名：{{ props.item.good_name }}</div>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="购买数量" prop="goodNum">
                <el-input-number v-model="postForm.goodNum" :min="1"  label="购买数量"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="pushCart()" style="width:100px;" v-loading="loading">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div>
        <p class='shop-title'>商品列表</p>
        <el-table border :data="cartList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="goodId" label="商品编号" width="200" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="goodName" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="goodNum" label="数量" width="200">
            </el-table-column>
            <el-table-column align='center' prop="goodPrice" label="单价" width="200">
            </el-table-column>
            <el-table-column align='center' prop="totalPrice" label="合计" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
              <template slot-scope="scope">
                 <el-button type="danger" @click="delGood(scope.$index)" icon='el-icon-delete'></el-button>
              </template>
            </el-table-column>
        </el-table>
        <div>
        <el-card class='cart-info btn-box'>
            <el-button type="success" @click="dialogVisible = true" style="display:inlne-block;" :disabled="isEmpty">结算</el-button>
            <el-button type="danger" @click="emptyCart" style="display:inlne-block;" :disabled="isEmpty">清空</el-button>
        </el-card>
          <el-card class='cart-info price-info'>
            <div class='non-discount price-box' :class="{ 'has-discount': discount }">总价：{{TotalPrice}}</div>
            <transition name="el-fade-in">
              <div v-show='discount' class='discount-box'>优惠：<strong style="font-size:20px;margin:0 3px;" >-</strong>{{discount}}</div>
            </transition>
        </el-card>
        </div>
          
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
          <div  class='pay-box-item' v-if="isEnough && pay !== 0 && pay !== ''"><span>找余：</span>
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
import { cleanCart,  checkVip, pushCart} from "@/api/front";
import { validateTel } from '@/utils/validate.js'
import { fetchAjaxGood } from "@/api/good";

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
      discount : 0,
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
            trigger: "blur"
          }
        ],
        goodNum: [
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
    },

    pushCart() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          pushCart({good:this.postForm, cart:this.cartList, discount:this.discount}).then(data => {
              const {   discount ,status } = data;
              if(status){
                this.postForm.goodPrice = data.info.good_price;
                this.postForm.goodName = data.info.good_name;

                this.postForm.totalPrice = this.postForm.goodPrice * this.postForm.goodNum;

                this.cartList.push(this.postForm);
                this.postForm = Object.assign({}, defaultForm);
                this.discount = discount;
                this.loading = false;

                this.cartList.forEach( (good,index1)=>{
                  let goodId = good.goodId;

                  this.cartList = this.cartList.filter((other,index2) =>{

                      if(other.goodId === goodId && index1 !== index2){
                        this.cartList[index1].goodNum +=this.cartList[index2].goodNum;
                        this.cartList[index1].totalPrice +=this.cartList[index2].totalPrice;
                        return false;
                      }
                      return true;
                  })
                })
                console.log(this.cartList);
              }
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
        }
      });
    },
    Clearing() {
      cleanCart({order:this.cartList, userId:this.vipInfo.userId || '', pay:this.pay, discount : this.discount}).then( data =>{
        
        this.$notify({
          title: '成功',
          message: '结算成功',
          type: 'success'
        });
        this.cartList = [];
        this.discount = 0;
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
          temp =  temp + element.totalPrice;
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
  .cart-info{
    width: 200px;
    float: right;
    height: 60px;
    text-align: left;
    margin-right: 10px;
  }
  .cart-info .price-box{
    display: block;
    text-align: left;
    padding-left: 40px;
    font-weight: bolder;
    
  }

  .price-info{
    width: 140px;
  }
  .cart-info .el-card__body{
    text-align: center;
    padding:10px 0;
  }
  .cart-info .non-discount{
    margin-top:10px;
    font-weight: bolder;
    transition: transform .5s;
    color: #409EFF
    
    
  }
  .cart-info .discount-box{
    margin-top: -10px;
    text-align: left;
    padding-left: 30px;
    transition:  opacity .5s;
    color: rgb(197, 59, 25)
    
  }
  .has-discount{
    transform: translate(-10px,-10px)
  }
</style>
