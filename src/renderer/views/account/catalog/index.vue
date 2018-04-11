<template>
<div class="shop-container">
        <p class='shop-title'>账户列表</p>
    
        <router-link to="/account/addAccount" >
            <el-button icon='el-icon-plus' type="primary" round style='margin:20px 10px;'>添加账户</el-button>
        </router-link>
  <el-button icon='el-icon-refresh' @click="getList" style="margin:5px" type='success '></el-button>
        
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
                 <el-button type="danger"  icon='el-icon-delete' @click="DelAccount(scope.row.no)"></el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="getList"
            :current-page.sync="currentPage"
            :page-size="size"
            layout="total, prev, pager, next, jumper"
            :total="total_page">
        </el-pagination>
  </div>
        <el-dialog title="修改员工信息" :visible.sync="workerDialogVisible" width="30%" center>
            <div>
                <el-form  :model="account"  ref="account" :rules="rules" class='postForm' label-width="100px">
                    <el-form-item label="职工姓名：" prop="name">
                        <el-input v-model="account.name"  readonly=""></el-input>                        
                    </el-form-item>
                    <el-form-item label="职工电话：" prop="tel">
                        <el-input v-model.number="account.tel" placeholder="电话" required></el-input>
                    </el-form-item>
                    <el-form-item label="原密码：" prop="password_old">
                        <el-input type="password" v-model="account.password_old" placeholder="原密码" required></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="account.password" placeholder="密码" required></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="checkPass">
                        <el-input type="password" v-model="account.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职工性别：" prop="sex">
                        <el-radio-group v-model="account.sex">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职工职位：" prop="work">
                        <el-select v-model="account.job" placeholder="请选择" width='200px'>
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
                } else {
                    if (!validateTel(value)) {
                        callback(new Error('请输入电话号码'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };


        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.account.checkPass !== '') {
                    this.$refs.account.validateField('checkPass');
                }
                callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.account.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            works: [{
                    label: '前台销售人员',
                    value: 'saler'
                },
                {
                    label: '库存管理人员',
                    value: 'stocker'
                },
                {
                    label: '会计',
                    value: 'accountant'
                },
            ],
            AccountList: [],
            listLoading: true,
            account: {},
            workerDialogVisible: false,
            rules: {
                tel: { validator: checkTel, trigger: 'blur' },
                account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
                name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: checkPass, trigger: 'blur' }],
            },
            currentPage: 1,
            size: 20,
            total_page: 100,
        };
    },
    methods: {
        DelAccount(id) {
            delAccount({ id }).then(data => {

                this.workerDialogVisible = false;
                this.$message({
                    message: '删除成功',
                    type: "success"
                });
                this.getList();
            }).catch((message) => {
                this.$message.error(message);
            })
        },
        fetchAccount() {
            this.$refs["account"].validate(valid => {
                if (valid) {
                    delete this.account.checkPass;
                    editAccount({ account: this.account }).then(data => {

                        this.workerDialogVisible = false;
                        this.$message({
                            message: '修改成功',
                            type: "success"
                        });
                        this.getList();
                        
                    }).catch((message) => {
                        this.$message.error(message);
                    })
                }
            })
        },
        getList() {
            
            getAccountList({page:this.currentPage,size:this.size}).then( data =>{
                this.AccountList = data.info;
                this.total_page = data.total;
                this.listLoading = false;
            }).catch((message) => {
                this.$message.error(message);
            })
        }
    },
    created() {
        this.getList();
    },

    filters: {
        jobs: function(job) {
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
                case 'admin':
                    result = '管理员'
                    break;
            }
            return result;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
 .pagination{
    float: right;
    margin-top: 20px;
  }
</style>
