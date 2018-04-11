<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

      <div class="box-card">
        时间范围：<el-cascader
          :options="timeSpanOption"
          :show-all-levels="false"
          @change = 'handleSaleTimeSpan'
          placeholder="过往七天"
      ></el-cascader>
      </div>
      
      <sale-chart :chart-data="saleChartData" :time-span='saleTimeSpan'></sale-chart>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="box-card">
        时间范围：<el-cascader
          :options="timeSpanOption"
          :show-all-levels="false"
          @change = 'handleGoodTimeSpan'
          placeholder="过往七天"
          
      ></el-cascader>
      </div>
      

      <good-chart :chart-data="goodChartData"></good-chart>
    </el-row>


    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <box-card></box-card>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import SaleChart from './components/SaleChart'
import GoodChart from './components/GoodChart'
import BoxCard from './components/BoxCard'

import { getSale, getGood} from '@/api/statistics'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 170],
    actualData: [120, 82, 91, 154, 162, 140, 170]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  },
  sale:{
    
  },
}

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
      saleChartData: { 
          expectedData: [100, 120, 161, 134, 105, 160, 170],
          actualData: [120, 82, 91, 154, 162, 140, 170]
      },
      goodChartData: { 
          expectedData: [100, 120, 161, 134, 105, 160, 170],
          actualData: [120, 82, 91, 154, 162, 140, 170]
      },
      chartData : {},
      sql:'',
      saleTimeSpan : 7,
      goodTimeSpan : 7,
      
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
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleSaleTimeSpan(saleTimeSpan){
      this.saleTimeSpan = saleTimeSpan[1]
      this.saleChartData = {
            expectedData: [100, 120, 161, 134, 105, 160, 170,100, 120, 161, 134, 105, 160, 170],
            actualData: [120, 82, 91, 154, 162, 140, 170,100, 120, 161, 134, 105, 160, 170]
        }
    },
    handleGoodTimeSpan(saleTimeSpan){
      console.log(this.saleTimeSpan);
      this.goodChartData = {
            expectedData: [100, 220, 411, 134, 1405, 160, 170],
            actualData: [120, 82, 91, 154, 162, 140, 170]
        }
    },
  },
 
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
