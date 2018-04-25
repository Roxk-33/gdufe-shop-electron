<template>
<div>
  <el-button icon='el-icon-refresh'  title='刷新' @click="getList" style="margin:5px" type='success '></el-button>

  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column align="center" label="序号"   type='index' width="60">
    </el-table-column>
    <el-table-column  align="center" label="发布时间" prop="time">
      <template slot-scope="scope">
        {{scope.row.create_time | TimeConversion}}
      </template>
    </el-table-column>

    <el-table-column  align="center" label="重要性">
      <template slot-scope="scope">
        <el-rate v-model="scope.row.importance" disabled :colors="['#67C23A', '#E6A23C', '#F56C6C']"   ></el-rate>
       </template>
    </el-table-column>

    <el-table-column align="center" class-name="status-col" label="状态" >
      <template slot-scope="scope">
        <el-tag :type="scope.row.purchase_status | statusFilter_1">{{scope.row.purchase_status == 0 ? '未完成':'已完成'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" class-name="status-col" label="操作" >
      <template slot-scope="scope">
          <el-button type="primary"  @click="getOrderDetail(scope.row.purchase_id)" >查看</el-button>        
          <el-button type="danger"  @click="DeleteList(scope.row.purchase_id)" icon="el-icon-delete">删除</el-button>
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
              <el-table-column align="center" label="序号"   type="index" width='100'></el-table-column>
              <el-table-column align="center" label="名称" prop="good_name"></el-table-column>
              <el-table-column align="center" class-name="status-col" label="采购数量" prop="purchase_number"> </el-table-column>
              <el-table-column align="center" class-name="status-col" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.purchase_status | statusFilter_2">{{scope.row.purchase_status | purchaseFilter}}</el-tag>
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
      const statusMap = ['未采购','已采购','商品缺货'];
      return statusMap[status]
    },
    TimeConversion(time){
      const date = new Date(parseInt(time));
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }
  },
  
  methods: {
    getList() {
      this.loading = true
      fetchList({page:this.currentPage,size:this.size,type:this.type}).then( data => {
        this.list = data.info;
        this.total_page = data.total;
        this.loading = false;
      })
    },
    DeleteList(id){
      delList({id}).then( data =>{
        
          this.$message({
            message: '删除成功',
            type: "success"
          });
          this.getList();
      })
    },
    getOrderDetail(id){
      fetchListDetail({id}).then( data =>{
          this.orderDialogVisible = true;
          this.orderDetail = data.info;
      })
    }
  },
  created() {
    this.getList();
  }
}
</script>
<style scoped>
.pagination{
  float: right;
  margin-top: 10px;
}
</style>


