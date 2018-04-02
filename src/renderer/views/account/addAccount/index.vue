<template>
  <div class='shop-container'>
       <el-form  :model="postForm"  ref="postForm" :rules="rules" class='postForm' label-width="100px">
        <el-form-item label="职工姓名：" prop="name">
            <el-input v-model="postForm.name" placeholder="姓名" required></el-input>
        </el-form-item>
        <el-form-item label="职工电话：" prop="tel">
            <el-input v-model.number="postForm.tel" placeholder="电话" required></el-input>
        </el-form-item>
        <el-form-item label="职工性别：" prop="sex">
             <el-radio-group v-model="postForm.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="职工职位：" prop="job">
            <el-select v-model="postForm.job" placeholder="请选择">
                <el-option v-for="item in works" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="帐号：" prop="account">
            <el-input v-model.number="postForm.account" placeholder="帐号" required></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="postForm.password" placeholder="密码" required></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="postForm.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="display:block;text-align: center;">
            <el-button type="primary" @click="fetchAccount" style="width:150px;" >添加</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import { validateTel } from '@/utils/validate.js'
import { addAccount } from '@/api/account.js'
export default {
    name: 'addAccount',

    data() {
        var checkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('电话不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                }else {
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
                return callback(new Error('请输入密码'));
            } else {
            if (this.postForm.checkPass !== '') {
                this.$refs.postForm.validateField('checkPass');
            }
                return callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            
            if (value === '') {
                return callback(new Error('请再次输入密码'));
            } else if (value !== this.postForm.password) {
                return callback(new Error('两次输入密码不一致!'));
            } else {
                return callback();
            }
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
            postForm: {
                name: '',
                sex: 0,
                tel: '',
                job:'',
                password : '',
                checkPass : ''
            },
            rules: {
                tel:  { validator: checkTel, trigger: 'blur' },
                account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
                name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
                password: [{ validator: validatePass,  trigger: 'blur' }],
                checkPass: [{ validator: checkPass, trigger: 'blur' }]
            }

        }
    },
    methods:{
        fetchAccount(){
            this.$refs["postForm"].validate(valid => {
                if(valid){
                    addAccount(this.postForm).then( data =>{
                        this.$message({
                            message: data.message,
                            type: "success"
                        });
                        this.$router.push({path: "/account/catalogAccount"});
                    }).catch((message) => {
                        this.$message.error(message);
                    })
                }
            })    
        }
    }
}
</script>
<style scoped>
    .shop-container{
        width:400px;
    }
    
</style>

