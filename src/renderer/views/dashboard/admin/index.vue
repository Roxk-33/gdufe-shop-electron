<template>
  <div class="dashboard-editor-container">

    <panel-group  :sale-data='saleToday' :order-data='orderToday'></panel-group>

     <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

      <div class="box-card">
        时间范围：
       
        <!-- <el-date-picker v-model="saleTimeSpan" type="daterange" align="right" readonly unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format='timestamp'>
        </el-date-picker> -->

        <el-select v-model="saleTimeType" @change="getSale">
          <el-option label="过去一周" value="week">过去一周</el-option>
          <el-option label="过去一月" value="month">过去一月</el-option>
        </el-select>
        
      </div>
      
      <sale-chart :chart-data="saleChartData"></sale-chart>
    </el-row> 
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="box-card">
        时间范围：
        <!-- <el-cascader
          :options="timeSpanOption"
          :show-all-levels="false"
          @change = 'handleGoodTimeSpan'
          placeholder="过往七天"
          
      ></el-cascader> -->
      <el-select v-model="goodTimeType" @change="getGood">
          <el-option label="过去一周" value="week">过去一周</el-option>
          <el-option label="过去一月" value="month">过去一月</el-option>
        </el-select>
        </div>
      <div class="box-card">
        种类：
          <el-select v-model="type" placeholder="请选择" @change='getGood'>
            <el-option
              v-for="item in Types"
              :key="item.good_divide"
              :label="item.good_divide"
              :value="item.good_divide">
            </el-option>
          </el-select>
      </div>
      <good-chart :chart-data="goodChartData"></good-chart>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <box-card></box-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import SaleChart from './components/SaleChart'
import GoodChart from './components/GoodChart'
import BoxCard from './components/BoxCard'
import {  fetchGoodType } from "@/api/stock";
import { getSale, getGood} from '@/api/statistics'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    GoodChart,
    SaleChart,
    BoxCard,
  },
  data() {
    return {
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      saleChartData: { 
        time:[],
        revenue:[], 
        profit:[]
      },
      goodChartData: { 
          goodNum:[],
          goodName:[]
      },
      saleToday:0,
      saleTimeSpan : [],
      saleTimeType : 'week',
      goodTimeSpan : 7,
      goodTimeType : 'week',
      type:'全部',
      Types:[],
      timeSpanOption : [
        {
          value: 'day',
          label: '天数',
          children: [{
            value: 7,
            label: '过往七天',
            },
            {
            value: 14,
            label: '过往十四天',
            }
          ]
        },
        {
          value: 'week',
          label: '周数',
          children: [{
            value: 4,
            label: '过往四周',
            },
            {
              value: 8,
              label: '过往八周',
            }
          ]
        }]
    }
  },
  methods: {
    fetchGoodType() {
        fetchGoodType().then(data => {
            this.Types = data.info
            this.Types.unshift({ good_divide: '全部' })
        })
    },
    handleSaleTimeSpan(saleTimeSpan){
      this.saleTimeType = saleTimeSpan[0];
      this.saleTimeSpan = saleTimeSpan[1];
      this.getSale();
    },
    handleGoodTimeSpan(goodTimeSpan){
      this.goodTimeType = goodTimeSpan[0];
      this.goodTimeSpan = goodTimeSpan[1];
      this.getGood();
    },
    getSale(){
      getSale({type:this.saleTimeType,span:this.saleTimeSpan}).then(data=>{
        this.saleChartData.time = data.info.time;
        this.saleChartData.revenue = data.info.revenue;
        this.saleChartData.profit = data.info.profit;
        this.saleToday = data.info.all;
        this.orderToday = data.info.orders;

      })
    },
    getGood(){
      let type = this.type === '全部' ? '' : this.type;
      getGood({type:this.goodTimeType,target : type}).then(data=>{
        this.goodChartData.goodName = data.goodName;
        this.goodChartData.goodNum = data.goodNum;

      })
    },
  },

  created(){
    this.getSale();
    this.getGood();
    this.fetchGoodType();
  }
 
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .box-card{
    width:25rem;
    padding: 5 10px;
    margin: 10px;
  }
  
}

</style>
