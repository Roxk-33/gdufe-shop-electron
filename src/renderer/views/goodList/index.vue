<template>
  <div class="shop-container">

    <p class='shop-title'>商品列表</p>
        <div class='stock-select-box'>
          种类：
          <el-select v-model="type" placeholder="请选择" @change='getList'>
            <el-option
              v-for="item in Types"
              :key="item.good_divide"
              :label="item.good_divide"
              :value="item.good_divide">
            </el-option>
          </el-select>
        <el-button icon='el-icon-refresh' @click="getList" style="margin:5px" type='success '></el-button>
        </div>
        
        <el-table border   :data="goodList"  highlight-current-row style="width: 90%; margin:20px auto;">
            <el-table-column align='center' prop="good_id" label="商品编号" width='100'>
            </el-table-column>
            <el-table-column align='center' prop="good_name" label="商品名">
            </el-table-column>
            <el-table-column align='center' prop="good_divide" label="商品种类">
            </el-table-column>
            <el-table-column align='center' prop="good_stock" label="库存">
            </el-table-column>
            <el-table-column align='center' prop="good_price" label="当前价格">
            </el-table-column>
            <el-table-column align='center'  label="操作" width='300'>
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="getPriceCurve(scope.row.good_id)"
                            icon="el-icon-zoom-in" >历史价格曲线
                  </el-button>
                  <el-button type="success" size="small" @click="getGoordDetail(scope.row)"
                            icon="el-icon-zoom-in" >查看/修改 详情
                  </el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="商品价格历史曲线图"
            :visible.sync="dialogVisible"
            width="50%">
          <price-curve :chart-data="curveData"></price-curve>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
            title="商品详情"
            :visible.sync="goodInfoVisible"
            width="40%">
          <el-form  :model="goodInfo"  ref="goodInfo"  class='postForm' label-width="100px">
                    <el-form-item label="商品名称：" prop="good_name">
                        <el-input v-model="goodInfo.good_name"  ></el-input>                        
                    </el-form-item>
                    <el-form-item label="商品价格：" prop="good_price">
                        <el-input v-model.number="goodInfo.good_price" placeholder="电话" required></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存：" prop="good_stock">
                        <el-input type="text" v-model="goodInfo.good_stock"  required></el-input>
                    </el-form-item>
                    <el-form-item label="供应商：" prop="good_supplier">
                        <el-input type="text" v-model="goodInfo.good_supplier" placeholder="密码" required></el-input>
                    </el-form-item>
                    <el-form-item label="库存警告值：" prop="instock_price">
                        <el-input type="text" v-model="goodInfo.instock_price"  auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="分类：" prop="good_divide">
                         <el-select v-model="goodInfo.good_divide" placeholder="请选择" @change='getList'>
                              <el-option
                                v-for="item in Types"
                                :key="item.good_divide"
                                :label="item.good_divide"
                                :value="item.good_divide">
                              </el-option>
                            </el-select>
                    </el-form-item> -->
                    <el-form-item label="商品描述：" prop="good_describe">
                          <el-input type="textarea" :rows="2" v-model="goodInfo.instock_price"  auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goodInfoVisible = false">关 闭</el-button>
            <el-button type="primary" @click="editGoodInfo">修改</el-button>
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
    import PriceCurve from "./priceCurve";
    import {  fetchGoodType } from "@/api/stock";
    import { fetchGoodList, getPriceCurve, editGoodInfo } from "@/api/good";
    export default {
      name: 'goodCatalog',
      data() {

        return {
          goodList:[],
          goodInfo:{},
          loading: false,
          dialogVisible:false,
          goodInfoVisible:false,
          currentPage:1,
          size:20,
          curveData:{},
          total_page : 100,
          type:'',
          Types:[]
        }
      },
      components: {
        PriceCurve
      },
      methods: {
        editGood(target){

        },
        getList(){
          this.goodList = [];
          fetchGoodList({page:this.currentPage,size:this.size}).then(data => {
              this.goodList = data.goods;
              this.total_page = data.total;
           
          })
        },
        getPriceCurve(id){
          getPriceCurve({goodId:id}).then(data=>{
            this.curveData.time = data.time;
            this.curveData.price = data.price;
            this.dialogVisible = true;
          })
        },
        getGoordDetail(target){
          this.goodInfo = target;
          this.goodInfoVisible = true;
        },
        editGoodInfo(){
          editGoodInfo(this.goodInfo).then( data=>{
            if(data.status){
              this.goodInfoVisible = false;
              this.$message({
                tyoe:'success',
                message:'修改成功'
              })
            }
          })
          
        }
      },
      created(){
         this.getList();
         fetchGoodType().then( data =>{
           this.Types = data.info;
         })
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
