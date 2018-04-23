<template>
  <div class="shop-container">

    <p class='shop-title'>入库记录表</p>
        <div class='stock-select-box'>
            <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success '></el-button>
        </div>
        
        <el-table border   :data="recordList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align='center' prop="stock_id" label="入库编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="stock_time" label="入库时间">
              <template slot-scope="scope">
                {{scope.row.stock_time | TimeConvert}}
              </template>
            </el-table-column>
            <el-table-column align='center' prop="worker_name" label="入库人员">
            </el-table-column>
            <el-table-column align='center'  label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="medium" @click="getDetail(scope.row.stock_id)"
                            icon="el-icon-search" >查看
                  </el-button>
              </template>
            </el-table-column>
            
        </el-table>

          <el-dialog
            title="入库记录详情"
            :visible.sync="dialogVisible"
            width="50%">
          <div>
            <el-table :data="recordDetail" border fit highlight-current-row style="width: 100%">
                    <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
                    <el-table-column align="center" label="商品编号" prop="good_id"></el-table-column>
                    <el-table-column align="center" label="商品名称" prop="good_name"></el-table-column>
                    <el-table-column align="center" label="入库数量" prop="good_number"></el-table-column>
                    <el-table-column align="center" label="商品进货价" prop="cost"></el-table-column>
                    <el-table-column align="center" class-name="status-col" label="购买个数" prop="good_number"> </el-table-column>
              </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
    import { fectchInStockList, fectchInStockDetail } from "@/api/stock";
    export default {
      name: 'inStock',
      data() {

        return {
          recordList:[],
          recordDetail:null,
          loading: false,
          currentPage:1,
          dialogVisible:false,          
          size:20,
          total_page : 100,
          type:'全部',
          Types:[]
        }
      },
      methods: {
        
        getList(){
          this.goodList = [];
          fectchInStockList({page:this.currentPage,size:this.size }).then(data => {
              this.recordList = data.info;
              this.total_page = data.total;
          })
        },
        getDetail(id){
          fectchInStockDetail({stock_id : id}).then(data=>{
            this.recordDetail = data.info;
            this.dialogVisible = true;
          })

        }
      },
      created(){
         this.getList();
      },
      filters:{
          TimeConvert(time){
            const date = new Date(parseInt(time));
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
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
