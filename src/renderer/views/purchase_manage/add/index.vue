<template>
<div class="shop-container ">
    <div>
        <p class='shop-title'>添加商品</p>
        <el-form  :model="postForm"  ref="postForm" :rules="rules" label-width="100px">
        <el-form-item label="商品编号" prop="goodNo">
            <el-autocomplete style="width:200px" v-model.number="postForm.goodNo" value-key='goodName' placeholder="商品编号"  required :fetch-suggestions="querySearchAsync" @select="handleSelect">
               <template slot-scope="props">
                  <div class="name">商品名：{{ props.item.goodName }}</div>
                </template>
            </el-autocomplete>
        </el-form-item>
        <el-form-item label="购买数量" prop="purchaseNum">
            <el-input-number v-model="postForm.purchaseNum" :min="1"  label="购买数量"></el-input-number>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="pushGood()" style="width:150px;" v-loading="loading">添加</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div>
        <p class='shop-title'>商品列表</p>
        <el-table border :data="goodList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="goodNo" label="商品编号" width="200" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="goodName" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="purchaseNum" label="数量" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
              <template slot-scope="scope">
                 <el-button type="danger" @click="delGood(scope.$index)" icon='el-icon-delete'></el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class='order-box'>
          <div class='order-box_note'>
            
            <label>清单备注：</label>
            <el-input v-model="note"></el-input>
          </div>
          <div class='order-box_importance'>
            <label>清单重要性：</label>
            
            <el-rate v-model="importance" :colors="['#99A9BF', '#E6A23C', '#F56C6C']" :low-threshold='2' :high-threshold='4' style='margin-top: 8px;'></el-rate>       
          </div>
        </div>
        <div class='btn-box'>
          <el-button type="success" @click="postList"  >提交</el-button>
          <el-button type="danger" @click="Empty" :disabled="isEmpty">清空</el-button>
        </div>
    </div>
    
</div>
</template>

<script>
import { addList} from "@/api/purchase";
import { fetchGood } from "@/api/good";
import { validateTel } from '@/utils/validate.js'

const defaultForm = {
  goodNo: "",
  purchaseNum: 0
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
      goodList: [],
      fetchSuccess: true,
      loading: false,
      listLoading: false,
      dialogVisible: false,
      importance: 1,
      note:'',
      rules: {
        goodNo: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "change"
          }
        ],
        purchaseNum: [
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
       fetchGood({target : query}).then(rep=>{
         if(rep.data.status){
           cb(rep.data.info);
         }
       })
    },
    handleSelect(item) {
        console.log(item);
        this.postForm.goodNo = item.goodNo;
    },

    pushGood() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {

          fetchGood({goodNo : this.postForm.goodNo}).then(rep => {
            if (rep.data.status) {
              this.postForm.goodName = rep.data.info.goodName;
              this.goodList.push(this.postForm);
              this.postForm = Object.assign({}, defaultForm);
              this.$message({
                message: "添加成功",
                type: "success"
              });
            }else {
              this.$message.error(rep.data.message);
            }
          })
        } 
      });
    },
    postList() {
      let data = {
        goods : this.goodList,
        importance: this.importance,
        note : this.note
      }
      addList(data).then(rep=>{
        if (rep.data.stauts) {
          this.$message({
              message: "添加成功",
              type: "success"
          });
        }else {
          this.$message.error(rep.data.message);
          
        }
      })
    },
    delGood(index){
      this.goodList.splice(index,1);
    },
    Empty() {
      this.goodList = [];
    }
  },
  computed:{
    isEmpty(){
      return this.goodList.length == 0
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-container .input-with-select{
    width: 420px;
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
