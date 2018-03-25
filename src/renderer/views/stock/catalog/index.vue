<template>
  <div class="shop-container">

    <p class='shop-title'>库存列表</p>

        <el-table border   :data="goods"  highlight-current-row style="width: 90%; margin:50px auto;">
            
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="goodNo" label="商品编号" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="goodName" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="goodStock" label="库存" width="200">
            </el-table-column>
            <el-table-column align='center' label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="medium" @click="editGood(scope.row)"
                               icon="el-icon-edit" v-if="scope.row.stuNum < 4">编辑
                    </el-button>
                  
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            @current-change="getGoodStockList"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="total_page">
          </el-pagination>
        </div>
  </div>
</template>

<script>
    import { getStockList } from "@/api/stock";
    export default {
      name: 'stockCatalog',
      data() {

        return {
          goods:[],
          loading: false,
          currentPage:1,
          size:20,
          total_page : 100,
        }
      },
      methods: {
        editGood(target){

        },
        getGoodStockList(){
          getStockList({page:this.currentPage,size:this.size}).then(rep => {
            if (rep.data.statuse) {
              this.goods = rep.data.info;
              this.total_page = rep.data.total;
            }else{
              this.$message({message: rep.data.message,type: "error"});
            }
          })
        }
      },
      created(){
        this.getGoodStockList();
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination{
    float: right;
  }
   
</style>
