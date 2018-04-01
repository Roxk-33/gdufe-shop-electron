<template>
<div>


  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column align="center" label="序号"   v-loading="loading" prop="no">
    </el-table-column>
    <el-table-column  align="center" label="发布时间" prop="time">
    </el-table-column>

    <el-table-column  align="center" label="重要性">
      <template slot-scope="scope">

        <el-rate v-model="scope.row.importance" disabled :colors="['#99A9BF', '#E6A23C', '#F56C6C']"   disabled-void-color ='transparent'></el-rate>

       </template>
    </el-table-column>

    <el-table-column align="center" class-name="status-col" label="状态" >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter_1">{{scope.row.status == 0 ? '未完成':'已完成'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" class-name="status-col" label="操作" >
      <template slot-scope="scope">
          <el-button type="primary"  @click="getOrderDetail(scope.row.no)" >查看</el-button>        
          <el-button type="danger"  @click="delOrder(scope.row.no)" icon="el-icon-delete">删除</el-button>
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
  <el-dialog title="采购商品" :visible.sync="orderDialogVisible" width="70%">
      <div>
           <el-table :data="orderDetail" border fit highlight-current-row style="width: 100%">
              <el-table-column align="center" label="序号"   v-loading="loading" type="index" width='100'></el-table-column>
              <el-table-column align="center" label="编号" prop="goodNo"></el-table-column>
              <el-table-column align="center" label="名称" prop="goodName"></el-table-column>
              <el-table-column align="center" class-name="status-col" label="采购数量" prop="purchaseNum"> </el-table-column>
              <el-table-column align="center" class-name="status-col" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.purchaseStatus | statusFilter_2">{{scope.row.purchaseStatus | purchaseFilter}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="orderDialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
</div>
  
</template>

<script>
import { fetchList , delList, fetchListDetail} from '@/api/purchase'

export default {
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      orderDialogVisible: false,
      list: null,
      orderDetail : null,
      loading: false,
      currentPage:1,
      size:20,
      total_page : 100,
    }
  },
  filters: {
    statusFilter_1(status) {
      status = parseInt(status);
      const statusMap = ['','success'];
      return statusMap[status]
    },
    statusFilter_2(status) {
      status = parseInt(status);
      const statusMap = ['info','success','danger'];
      return statusMap[status]
    },
    purchaseFilter(status){
      status = parseInt(status);
      const statusMap = ['未采购','已采购','缺货'];
      return statusMap[status]
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') 
      fetchList({page:this.currentPage,size:this.size}).then(response => {
        this.list = response.data.info;
        this.total_page = response.data.total;
        this.loading = false
      })
    },
    delOrder(no){
      delList({no}).then( rep=>{
        if(rep.data.status){
          this.$message({
            message: rep.data.message,
            type: "success"
            });
          }else{
            this.$message.error(rep.data.message);
          }
      })
    },
    getOrderDetail(no){
      fetchListDetail({no}).then( rep=>{
        if(rep.data.status){
          this.orderDialogVisible = true;
          this.orderDetail = rep.data.info;
        }
      })
    }
  }
}
</script>
<style scoped>
.pagination{
  float: right;
  margin-top: 10px;
}
</style>


