<template>
<div class='shop-container'>

  <p class='shop-title'>采购列表</p>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column  align="center" label="发布时间">
      <template slot-scope="scope">
        {{scope.row.create_time | TimeConversion}}
      </template>
    </el-table-column>

    <el-table-column  align="center" label="重要性">
      <template slot-scope="scope">
            <el-rate v-model="scope.row.importance" disabled :colors="['#99A9BF', '#E6A23C', '#F56C6C']"   disabled-void-color ='transparent'></el-rate>
    </template>
    </el-table-column>

    <el-table-column align="center" class-name="status-col" label="状态" >
      <template slot-scope="scope">
        <el-tag :type="scope.row.purchase_status | statusFilter_1">{{scope.row.purchase_status == 0 ? '未完成':'已完成'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" class-name="status-col" label="操作" >
      <template slot-scope="scope">
          <el-button type="primary"  @click="getOrderDetail(scope.row.purchase_id)" :disabled="scope.row.purchase_status == 1">采购</el-button>
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
  <el-dialog title="采购清单详情" :visible.sync="orderDialogVisible" width="1200px" >
      <div>
           <el-table :data="orderDetail" border fit highlight-current-row style="width: 100%">
              <el-table-column align="center" label="序号"    type="index" width='100'></el-table-column>
              <el-table-column align="center" label="名称" prop="good_name"></el-table-column>
              <el-table-column align="center" class-name="status-col" label="采购数量" prop="purchase_number"> </el-table-column>
              <el-table-column align="center" class-name="status-col" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.purchase_status | statusFilter_2">{{scope.row.purchase_status | purchaseFilter}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" class-name="status-col" label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary" @click="changeGoodStatus(scope.$index,1)" :disabled="scope.row.purchase_status == 1">已采购</el-button>
                    <el-button type="danger" @click="changeGoodStatus(scope.$index,2)" :disabled="scope.row.purchase_status == 2">缺货</el-button>
                </template>
              </el-table-column>
            </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="orderDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sumbitOrder()">确 认</el-button>
      </span>
  </el-dialog>
</div>
  
</template>

<script>
import { fetchList ,fetchListDetail, updateList} from '@/api/purchase'

export default {
  
  data() {
    return {
      type : 'not',
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
    },
    TimeConversion(time){
      const date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true
      fetchList({page:this.currentPage,size:this.size,type:'not'}).then( data => {
        this.list = data.info;
        this.total_page = data.total;        
        this.loading = false;
      })
    },
    getOrderDetail(id){
      fetchListDetail({id}).then( data =>{
          this.orderDialogVisible = true;
          this.orderDetail = data.info;
      })
    },
    changeGoodStatus(index,status){
      this.orderDetail[index].purchase_status = status;
    },
    sumbitOrder(){
      
      updateList({list : this.orderDetail}).then( data =>{
        if (data.status) {
          this.orderDialogVisible = false;
          this.orderDetail = null;
          this.getList();
        }else {
          this.orderDialogVisible = false;
          this.orderDetail = null;
        }
      })
    }
  }
}
</script>
<style scoped>
.purchase-container{
    margin: 30px;
  
}
.pagination{
    float: right;
  }
</style>

