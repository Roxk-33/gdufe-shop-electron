<template>
<div class="shop-container ">
    <div>
        <p class='shop-title'>添加商品</p>
        <el-form :inline="true" :model="postForm"  ref="postForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="商品编号" prop="goodNo">
            <el-input v-model.number="postForm.goodNo" placeholder="商品编号" required :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-input>
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
        <el-table border :data="cartList" v-loading="listLoading"  class='goodsList'>
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
            <el-table-column align='center' prop="good_total" label="合计" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
              <template slot-scope="scope">
                 <el-button type="danger" @click="delGood(scope.$index)" icon='el-icon-delete'></el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-button type="success" @click="postList" style="float:right;" >提交</el-button>
        <el-button type="danger" @click="Empty" style="float:right;margin-right:10px;" :disabled="isEmpty">清空</el-button>
    </div>
    
</div>
</template>

<script>
import { cleanCart, addGood, checkVip} from "@/api/sale";
import { validateTel } from '@/utils/validate.js'

const defaultForm = {
  goodNo: "",
  goodNum: 0
};
export default {
  name: "postList",
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
    
    querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(results);
        // }, 3000 * Math.random());
    },
    handleSelect(item) {
        console.log(item);
    },

    pushCart() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          addGood(this.postForm)
            .then(response => {
              const {status,info} = response.data;
              if (status) {
                this.$message({
                  message: '添加成功',
                  type: "success"
                });
                this.loading = false;
                info.good_total = 0;
                info.good_total = (parseInt(info.good_num) * parseFloat(info.good_price)).toFixed(1);
                this.cartList.push(info);
              }else{
                  this.$message.error(rep.data.message);
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
    postList() {
      this.dialogVisible = false;
    },
    delGood(index){
      this.cartList.splice(index,1);
    },
    Empty() {
      this.cartList = [];
    }
  },
  computed:{
    
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

</style>
