<template>
  <div class="shop-container">

    <p class='shop-title'>库存列表</p>
        <div class='stock-select-box'>
          种类：
          <el-select v-model="type" placeholder="请选择" @change='getList'>
            <el-option
              v-for="item in Types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-table border   :data="goods"  highlight-current-row style="width: 90%; margin:50px auto;">
            
            <el-table-column align='center' type="index" label="序号" >
            </el-table-column>
            <el-table-column align='center' prop="good_id" label="商品编号">
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名">
            </el-table-column>
            <el-table-column align='center' prop="good_divide" label="商品种类">
            </el-table-column>
            <el-table-column align='center' prop="good_stock" label="库存">
              <template slot-scope="scope">
                  <el-button type="primary" size="medium" @click="editGood(scope.row)"
                            icon="el-icon-edit" v-if="scope.row.stuNum < 4">编辑
                  </el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column align='center' label="操作">
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
          goods:[],
          loading: false,
          currentPage:1,
          size:20,
          total_page : 100,
          type:'',
          Types : [
            {
              label:'食品',
              value:'食品'
            },
            {
              label:'饮料',
              value:'饮料'
            }
          ]
        }
      },
      methods: {
        editGood(target){

        },
        getList(){
          fetchStockList({page:this.currentPage,size:this.size,type:this.type}).then(data => {
              this.goods = data.goods;
              this.total_page = data.total;
           
          })
        }
      },
      mounted(){
         this.getList();
         fetchGoodType().then( data =>{
           this.Types = data.info;
         })
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
