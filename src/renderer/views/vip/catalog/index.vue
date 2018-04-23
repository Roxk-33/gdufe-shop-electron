<template>
  <div class="shop-container">

    <p class='shop-title'>会员列表</p>
        <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success '></el-button>
        
        <el-table border  v-loading='isLoading' :data="vipList"  highlight-current-row style="width: 90%; margin:20px auto;">
            
            <el-table-column align='center' type="index" label="序号" >
            </el-table-column>
            <el-table-column align='center' prop="user_id" label="会员编号">
            </el-table-column>
            <el-table-column align='center' prop="user_name" label="会员姓名">
            </el-table-column>
            <el-table-column align='center' prop="user_phone" label="会员电话">
            </el-table-column>
            <el-table-column align='center' prop="user_integral" label="会员积分">
            </el-table-column>
            <el-table-column align='center' prop="user_sex" label="会员性别">
              <template slot-scope="scope">
                {{scope.row.user_sex == '0' ? '男' : '女'}}
              </template>
            </el-table-column>
            <el-table-column align='center' prop="regist_time" label="注册时间">
              <template slot-scope="scope">
                {{scope.row.regist_time  | TimeConversion}}
              </template>
            </el-table-column>
           
            <el-table-column align='center' label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="medium" @click="DeleteVip(scope.row.user_id)"
                               icon="el-icon-delete" >删除
                    </el-button>
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
  </div>
</template>

<script>
    import { fetchVipList, deleteVip } from "@/api/vip";
    export default {
      name: 'VipCatalog',
      data() {

        return {
          vipList:[],
          loading: false,
          isLoading:false,
          currentPage:1,
          size:20,
          total_page : 100,
          type:'',
         
        }
      },
      methods: {
       
        getList(){
          this.isLoading = true;
          fetchVipList({page:this.currentPage,size:this.size}).then(data => {
              this.vipList = data.info;
              this.total_page = data.total;
              this.isLoading = false;
           
          }).catch((err) => {
              this.isLoading = false;
              this.vipList = [];
          })
        },
        DeleteVip(id){
          deleteVip({id}).then( resp=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          })
        }
      },
      filters:{
        TimeConversion(time){
          const date = new Date(parseInt(time));
          return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        }
      },
      created(){
        this.getList();
      }
      
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination{
    float: right;
  }
  .stock-select-box{
    margin: 10px auto;
  }
   
</style>
