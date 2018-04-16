<template>
  <div class="shop-container">

    <p class='shop-title'>订单列表</p>
        
        <el-table border   :data="orderList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align='center' prop="order_id" label="订单编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="create_time" label="结算时间">
                <template slot-scope="scope">
                    {{scope.row.create_time | TimeConvert}}
                </template>
            </el-table-column>
            <el-table-column align='center' prop="total_pay" label="金额">
            </el-table-column>
            <el-table-column align='center'  label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="getOrderDetail(scope.row)"
                            icon="el-icon-zoom-in" >查看
                  </el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="商品价格历史曲线图"
            :visible.sync="dialogVisible"
            width="30%">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
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
    import {  getOrderList } from "@/api/order";
    export default {
      name: 'orderList',
      data() {

        return {
          orderList:[],
          loading: false,
          dialogVisible:false,
          currentPage:1,
          size:20,
          total_page : 100,
          type:'',
        }
      },

      methods: {

        getList(){
          this.orderList = [];
            getOrderList({page:this.currentPage,size:this.size}).then(data => {
                this.orderList = data.info;
                this.total_page = data.total;
            })
        },
        getOrderDetail(){

        }

      },
      created(){
         this.getList();
         
      },
      filters:{
          TimeConvert(time){
            const date = new Date(parseInt(time) *100);
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
