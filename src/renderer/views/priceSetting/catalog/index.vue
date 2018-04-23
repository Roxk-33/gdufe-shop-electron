<template>
<div class="shop-container">
        <p class='shop-title'>商品优惠列表</p>
        <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success '></el-button>

        <el-table border :data="orderList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="activity_id" label="编号" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="name" label="名称" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="discount" label="优惠价" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="is_bind" label="是否捆绑销售" filter-placement="bottom-end" >
                <template slot-scope="scope">
                    {{scope.row.is_bind === '0' ?'否' : '是'}}
                </template>
            </el-table-column>

            <el-table-column align='center' label="操作" width="300">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="getItemDetail(scope.row.activity_id)"
                            icon="el-icon-zoom-in" >查看详情
                  </el-button>
                  <el-button type="danger" size="small" @click="deleteItem(scope.row.activity_id)"
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
        <el-dialog title="" :visible.sync="boxDialogVisible" width="30%" center>
            <div>
                 <el-table :data="orderDetail" border fit highlight-current-row style="width: 100%">
                    <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
                    <el-table-column align="center" label="商品名称" prop="good_name"></el-table-column>
                    <el-table-column align="center" label="限定数量" prop="good_number"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boxDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
import { getGoodPriceList, deleteGoodPriceSetting, getGoodPriceDetail } from '@/api/good'
export default {
    name: "goodPriceList",
    data() {
        
        return {
            orderList: [],
            orderDetail:null,
            listLoading: true,
            boxDialogVisible: false,
            currentPage: 1,
            size: 20,
            total_page: 100,
        };
    },
    methods: {
        
        fetchDetail(id) {
            getLossDetail({id}).then( data=>{
                this.goodDetail = data.info;
                this.boxDialogVisible = true;
            })
        },
        getList() {
            getGoodPriceList({page:this.currentPage,size:this.size}).then( data =>{
                this.orderList = data.info;
                this.total_page = data.total;
                this.listLoading = false;
                
            }).catch((message) => {
                this.$message.error(message);
            })
        },
        deleteItem(id){
            deleteGoodPriceSetting({activity_id :id}).then( data=>{
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.currentPage = 1;
                this.getList();
            })
        },
        getItemDetail(id){
            getGoodPriceDetail({activity_id : id}).then(data=>{
                this.orderDetail = data.info;
                this.boxDialogVisible = true;
            })
            
        }
    },
    mounted() {
        this.getList();
    },

    filters: {
        
        TimeConversion(time){
            const date = new Date(parseInt(time));
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
 .pagination{
    float: right;
    margin-top: 20px;
  }
</style>
