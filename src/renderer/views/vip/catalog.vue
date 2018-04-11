<template>
  <div class="shop-container">

    <p class='shop-title'>会员列表</p>
  <el-button icon='el-icon-refresh' @click="getList" style="margin:5px" type='success '></el-button>
        
        <el-table border   :data="vipList"  highlight-current-row style="width: 90%; margin:50px auto;">
            
            <el-table-column align='center' type="index" label="序号" >
            </el-table-column>
            <el-table-column align='center' prop="good_id" label="会员名字">
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="会员电话">
            </el-table-column>
            <el-table-column align='center' prop="good_divide" label="会员性别">
            </el-table-column>
           
            <el-table-column align='center' label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="medium" @click="DeleteVip(scope.row)"
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
          currentPage:1,
          size:20,
          total_page : 100,
          type:'',
         
        }
      },
      methods: {
       
        getList(){
          
          fetchVipList({page:this.currentPage,size:this.size,type:this.type}).then(data => {
              this.vipList = data.vipList;
              this.total_page = data.total;
           
          })
        },
        deleteVip(id){
          deleteVip({id}).then( resp=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          })
        }
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
