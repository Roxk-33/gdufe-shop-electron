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
        <el-form-item label="职工职位：" prop="work">
            <el-select v-model="postForm.work" placeholder="请选择">
                <el-option v-for="item in works" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item style="display:block;text-align: center;">
            <el-button type="primary" @click="fetchAccount" style="width:150px;" v-loading="loading">添加</el-button>
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
                    // if (!validateTel(value)) {
                    //     callback(new Error('请输入电话号码'));
                    // } else {
                        callback();
                    // }
                }
            }, 1000);
        };

        return {
            loading : false,
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
                sex: 1,
                tel: '',
                work:0
            },
            rules: {
                tel:  { validator: checkTel, trigger: 'blur' },
            }

        }
    },
    methods:{
        fetchAccount(){
            this.$refs["postForm"].validate(valid => {
                if(valid){
                    addAccount(this.postForm).then( rep =>{
                        console.log(rep);
                        if(rep.data.status){
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
    }
}
</script>
<style scoped>
    .shop-container{
        width:400px;
    }
    
</style>

