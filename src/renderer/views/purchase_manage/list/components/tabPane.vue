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
        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status == 0 ? '未完成':'已完成'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" class-name="status-col" label="操作" >
      <template slot-scope="scope">
          <el-button type="primary"  @click="getOrderDetail(scope.row.no)" :disabled="scope.row.status == 1">查看</el-button>        
          <el-button type="danger"  @click="delOrder(scope.row.no)" icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <el-dialog title="采购商品" :visible.sync="orderDialogVisible" width="70%">
      <div>
           <el-table :data="orderDetail" border fit highlight-current-row style="width: 100%">
              <el-table-column align="center" label="序号"   v-loading="loading" type="index" width='100'></el-table-column>
              <el-table-column align="center" label="编号" prop="good_no"></el-table-column>
              <el-table-column align="center" label="名称" prop="good_name"></el-table-column>
              <el-table-column align="center" class-name="status-col" label="采购数量" prop="purchase_num"> </el-table-column>
              <el-table-column align="center" class-name="status-col" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.purchase_status | statusFilter_2">{{scope.row.purchase_status | purchaseFilter}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="orderDialogVisible = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
      </span>
  </el-dialog>
</div>
  
</template>

<script>
import { fetchList , delList, fetchListDetail} from '@/api/purchaseList'

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
      loading: false
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') 
      fetchList(this.listQuery).then(response => {
        this.list = response.data.info
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

