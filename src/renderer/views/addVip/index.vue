<template>
  <div class='shop-container'>
       <el-form :inline="true" :model="postForm"  ref="postForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="会员姓名" prop="name">
            <el-input v-model="postForm.name" placeholder="姓名" required></el-input>
        </el-form-item>
        <el-form-item label="会员电话" prop="tel">
            <el-input v-model.number="postForm.tel" placeholder="电话" required></el-input>
        </el-form-item>
        <el-form-item label="会员性别" prop="sex">
             <el-radio-group v-model="postForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item style="display:block;text-align: center;">
            <el-button type="primary" @click="fetchVip" style="width:150px;" v-loading="loading">添加</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import { validateTel } from '@/utils/validate.js'
import { addVip } from '@/api/sale.js'
export default {
    name: 'addVip',

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
            postForm: {
                name: '',
                sex: 1,
                tel: ''
            },
            rules: {
                tel:  { validator: checkTel, trigger: 'blur' },
            }

        }
    },
    methods:{
        fetchVip(){
            this.$refs["postForm"].validate(valid => {
                if(valid){
                    addVip(this.postForm).then( rep =>{
                        if(rep.data.status){
                            this.$message({
                                message: rep.data.message,
                                type: "success"
                            });

                            this.$emit('hideModal');

                        }
                    })
                }
            })    
        }
    }
}
</script>

