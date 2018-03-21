<template>
<div class="shop-container">
        <p class='shop-title'>账户列表</p>
        <el-table border :data="AccountList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="no" label="员工编号" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="name" label="员工姓名" width="100" >
            </el-table-column>
            <el-table-column align='center' prop="tel" label="员工电话" >
            </el-table-column>
            <el-table-column align='center' prop="sex" label="性别" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex == 0 ? '男' : '女'  }}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="job" label="职位" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.job | jobs}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label="操作" width="200">
              <template slot-scope="scope">
                 <el-button type="primary"  icon='el-icon-edit' @click="workerDialogVisible = true;account = scope.row" ></el-button>
                 <el-button type="danger"  icon='el-icon-delete' @click="delAccount(scope.$index)"></el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改员工信息" :visible.sync="workerDialogVisible" width="30%" center>
            <div>
                <el-form  :model="account"  ref="account" :rules="rules" class='postForm'>
                    <el-form-item label="职工姓名：" prop="name">
                        <el-input v-model="account.name" placeholder="姓名" required></el-input>
                    </el-form-item>
                    <el-form-item label="职工电话：" prop="tel">
                        <el-input v-model.number="account.tel" placeholder="电话" required></el-input>
                    </el-form-item>
                    <el-form-item label="职工性别：" prop="sex">
                        <el-radio-group v-model="account.sex">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职工职位：" prop="work">
                        <el-select v-model="account.job" placeholder="请选择">
                            <el-option v-for="item in works" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="workerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fetchAccount">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
import { getAccountList, editAccount, delAccount } from '@/api/account'
export default {
  name: "accountMenu",
  data() {
    var checkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('电话不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                }else {
                    // if (!validateTel(value)) {
                    //     callback(new Error('请输入电话号码'));
                    // } else {
                        callback();
                    // }
                }
            }, 1000);
        };
    return {
        works : [
                {
                    label:'前台销售人员',
                    value:'saler'
                },
                {
                    label:'库存管理人员',
                    value:'stocker'
                },
                {
                    label:'会计',
                    value:'accountant'
                },
            ],
        AccountList : [],
        listLoading : true,
        account:{},
        workerDialogVisible : false,
        rules: {
            tel:  { validator: checkTel, trigger: 'blur' },
        }
    };
  },
  methods: {
    delAccount(index){
        delAccount().then( resp =>{
            if(rep.data.status){
                this.workerDialogVisible = false;
                this.$message({
                    message: rep.data.message,
                    type: "success"
                });
            }else{
                this.$message.error(rep.data.message);
            }
        })
    },
    fetchAccount(){
            this.$refs["account"].validate(valid => {
                if(valid){
                    editAccount(this.postForm).then( rep =>{
                        if(rep.data.status){
                            this.workerDialogVisible = false;
                            this.$message({
                                message: rep.data.message,
                                type: "success"
                            });
                        }else{
                            this.$message.error(rep.data.message);
                        }
                    })
                }
            })    
    }  
  },
  computed:{
   
  },
    created(){
        getAccountList().then( rep=>{
            this.AccountList = rep.data.info;
            this.listLoading = false;
        })
    },
   filters:{
        jobs:function(job){
            let result = '';
            switch (job) {
                case 'saler':
                    result = '前台销售人员'
                    break;
                case 'stocker':
                    result = '仓库管理人员'
                    break;
                case 'accountant':
                    result = '会计'                
                    break;
            }
            return result;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
 
</style>
