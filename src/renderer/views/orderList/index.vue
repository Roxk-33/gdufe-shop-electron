<template>
  <div class="shop-container">

    <p class='shop-title'>订单列表</p>
        <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success'></el-button>
        
        <el-table border v-loading='isLoading'  :data="orderList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
            <el-table-column align='center' prop="order_id" label="订单编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="create_time" label="结算时间">
            </el-table-column>
            <el-table-column align='center' prop="total_pay" label="金额">
            </el-table-column>
            <el-table-column align='center'  label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="getOrderDetail(scope.row.order_id)"
                            icon="el-icon-zoom-in" >查看
                  </el-button>
                   <el-button type="danger" size="small" @click="deleteOrder(scope.row.order_id)"
                            icon="el-icon-delete" >删除
                  </el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="订单详情"
            :visible.sync="dialogVisible"
            width="50%">
          <div>
            <el-table :data="orderDetail" border fit highlight-current-row style="width: 100%">
                    <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
                    <el-table-column align="center" label="商品名称" prop="good_name"></el-table-column>
                    <el-table-column align="center" label="商品单价" prop="good_price"></el-table-column>
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
    import {  getOrderList, getOrderDetail, deleteOrder } from "@/api/order";
    export default {
      name: 'orderList',
      data() {

        return {
          isLoading:false,
          orderList:[],
          orderDetail:null,
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
            this.isLoading = true;
            this.orderList = [];
            getOrderList({page:this.currentPage,size:this.size}).then(data => {
                this.orderList = data.info;
                this.isLoading = false;
                this.total_page = data.total;
            }).catch((err) => {
                this.orderList = [];          
                this.isLoading = false;
            })
        },
        getOrderDetail(id){
          getOrderDetail({order_id:id}).then(data=>{
            this.orderDetail = data.info;
            this.dialogVisible = true;
          })
        },
        deleteOrder(id){
          deleteOrder({order_id:id}).then(data=>{
            this.$message({
              type:'success',
              message:'删除成功'
            })
             this.currentPage = 1;
          this.getList();
          })
         
        }

      },
      created(){
         this.getList();
         
      },
      filters:{
          TimeConvert(time){
            const date = new Date(parseInt(time)*100);
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
