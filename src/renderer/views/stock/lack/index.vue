<template>
  <div class="shop-container">

    <p class='shop-title'>缺货商品列表</p>
        <div class='stock-select-box'>
            <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success '></el-button>
        </div>
        
        <el-table border   :data="goodList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align='center' prop="good_id" label="商品编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名">
            </el-table-column>
            <el-table-column align='center' prop="good_divide" label="商品种类">
            </el-table-column>
            <el-table-column align='center' prop="good_price" label="商品价格">
            </el-table-column>
            <el-table-column align='center' prop="instock_price" label="入库价格">
            </el-table-column>
            <el-table-column align='center' prop="good_supplier" label="供应商">
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
    import { fetchLockList } from "@/api/stock";
    export default {
      name: 'lockCatalog',
      data() {

        return {
          goodList:[],
          loading: false,
          currentPage:1,
          size:20,
          total_page : 100,
          type:'',
          Types:[]
        }
      },
      methods: {
        getList(){
          this.goodList = [];
          fetchLockList({page:this.currentPage,size:this.size}).then(data => {
              this.goodList = data.info;
              this.total_page = data.total;
           
          })
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
