<template>
  <div class="stock-container">
        <el-table border   :data="goods" v-loading="listLoading" highlight-current-row style="width: 90%; margin:50px auto;">
            
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="" label="商品编号" width="200" filter-placement="bottom-end" :filters="filter" :filter-method="filterTag">
            </el-table-column>
            <el-table-column align='center' prop="" label="商品名" width="200" >
            </el-table-column>
            <el-table-column align='center' prop="" label="库存" width="200">
            </el-table-column>
            
            <el-table-column align='center' label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="medium" @click="handleStay(scope.$index, scope.row)"
                               icon="el-icon-edit" v-if="scope.row.stuNum < 4">入住
                    </el-button>
                  
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>

    export default {
      name: 'login',
      data() {

        return {
          goods:[],
          loading: false
        }
      },
      methods: {
        
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  
   
</style>
