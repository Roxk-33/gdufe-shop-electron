<template>
  <div class="shop-container">

    <p class='shop-title'>库存列表</p>
        <div class='stock-select-box'>
          种类：
          <el-select v-model="type" placeholder="请选择" @change='getList'>
            <el-option
              v-for="item in Types"
              :key="item.good_divide"
              :label="item.good_divide"
              :value="item.good_divide">
            </el-option>
          </el-select>
        <el-button icon='el-icon-refresh' @click="getList" style="margin:5px" type='success '></el-button>
        </div>
        
        <el-table border   :data="goodList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align='center' prop="good_id" label="商品编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名">
            </el-table-column>
            <el-table-column align='center' prop="good_divide" label="商品种类">
            </el-table-column>
            <el-table-column align='center' prop="good_stock" label="库存">
            </el-table-column>
            <!-- <el-table-column align='center'  label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="medium" @click="editGood(scope.row)"
                            icon="el-icon-edit" v-if="scope.row.stuNum < 4">编辑
                  </el-button>
              </template>
            </el-table-column> -->
            
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
    import { fetchStockList, fetchGoodType } from "@/api/stock";
    export default {
      name: 'stockCatalog',
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
        editGood(target){

        },
        getList(){
          this.goodList = [];
          fetchStockList({page:this.currentPage,size:this.size,type:this.type}).then(data => {
              this.goodList = data.info;
              this.total_page = data.total;
           
          })
        }
      },
      created(){
         this.getList();
         fetchGoodType().then( data =>{
           this.Types = data.info;
         })
      },
      mounted(){
        
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
