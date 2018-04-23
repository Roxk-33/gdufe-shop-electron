<template>
<div class="shop-container">
        <p class='shop-title'>损耗商品列表</p>
        <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success'></el-button>

        <el-table border :data="goodList" v-loading="listLoading"  class='goodsList'>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="loss_id" label="编号" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="worker_id" label="登记员工编号" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="worker_name" label="登记员工姓名" filter-placement="bottom-end" >
            </el-table-column>
            <el-table-column align='center' prop="loss_time" label="登记时间" filter-placement="bottom-end" >
                <template slot-scope="scope">
                    {{scope.row.loss_time | TimeConversion}}
                </template>
            </el-table-column>

            <el-table-column align='center' label="操作" width="300">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="fetchDetail(scope.row.loss_id)"
                            icon="el-icon-zoom-in" >查看详情
                  </el-button>
                  <el-button type="danger" size="small" @click="deleteItem(scope.row.loss_id)"
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
        <el-dialog title="损耗商品" :visible.sync="boxDialogVisible" width="50%" center>
            <div>
                <el-table :data="goodDetail" border fit highlight-current-row style="width: 100%">
                    <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
                    <el-table-column align="center" label="商品名称" prop="good_name"></el-table-column>
                    <el-table-column align="center" label="编号" prop="loss_id"></el-table-column>
                    <el-table-column align="center"  label="损耗原因" prop="loss_case"> 
                        <template slot-scope="scope">
                            {{scope.row.loss_case | statusFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="损耗个数" prop="good_number"> </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boxDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
import { getLossList, getLossDetail, deleteLoss } from '@/api/stock'
export default {
    name: "accountMenu",
    data() {
        
        return {
            goodList: [],
            listLoading: true,
            boxDialogVisible: false,
            currentPage: 1,
            size: 20,
            total_page: 100,
            goodDetail: null
        };
    },
    methods: {
        
        fetchDetail(id) {
            getLossDetail({loss_id:id}).then( data=>{
                    this.goodDetail = data.info;
                    this.boxDialogVisible = true;
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
        },
        deletItem(id){
            deleteLoss({loss_id:id}).then( data=>{
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.currentPage = 1;
                this.getList();
            })
        }
        
    },
    mounted() {
        this.getList();
    },

    filters: {
        statusFilter(status){
            const arr = ['变质','损坏','过期'];
            return arr[parseInt(status)];
        },
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
