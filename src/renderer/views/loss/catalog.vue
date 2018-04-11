<template>
<div class="shop-container">
        <p class='shop-title'>损耗商品列表</p>

        <el-table border :data="goodList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="no" label="员工编号" filter-placement="bottom-end" >
            </el-table-column>

            <el-table-column align='center' prop="sex" label="性别" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.loss_case |statusFilter  }}</span>
                </template>
            </el-table-column>
           
            <el-table-column align='center' label="操作" width="200">
              <template slot-scope="scope">
                 <el-button type="primary"  icon='el-icon-edit' @click="orderDialogVisible = true;account = scope.row" ></el-button>
                 <el-button type="danger"  icon='el-icon-delete' @click="DelAccount(scope.row.id)"></el-button>
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
        <el-dialog title="损耗商品" :visible.sync="orderDialogVisible" width="30%" center>
            <div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fetchAccount">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
import { getLossList, getLossDetail } from '@/api/stock'
export default {
    name: "accountMenu",
    data() {
        
        return {
            goodList: [],
            listLoading: true,
            orderDialogVisible: false,
            currentPage: 1,
            size: 20,
            total_page: 100,
        };
    },
    methods: {
        
        fetchDetail(id) {
            getLossDetail({id}).then( data=>{
                this.goodDetail = data.info;
                this.orderDialogVisible = true;
            })
        },
        getList() {
            getLossList({page:this.currentPage,size:this.size}).then( data =>{
                this.goodList = data.info;
                this.total_page = data.total;
                this.listLoading = false;
                
            }).catch((message) => {
                this.$message.error(message);
            })
        }
    },
    mounted() {
        this.getList();
    },

    filters: {
        statusFilter(status){
            const arr = ['变质','损坏','过期'];
            return arr[status];
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
