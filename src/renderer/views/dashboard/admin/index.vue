<template>
  <div class="dashboard-editor-container">

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">

      <div class="box-card">
        时间范围：
       
        <el-date-picker v-model="saleTimeSpan" type="daterange" align="right" readonly unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format='timestamp'>
        </el-date-picker>

        <el-select v-model="saleTimeType" @change="getSale">
          <el-option label="过去一周" value="week">过去一周</el-option>
          <el-option label="过去一月" value="month">过去一月</el-option>
        </el-select>
      </div>
      
      <sale-chart :chart-data="saleChartData"></sale-chart>
    </el-row> -->
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
        time:[],
        revenue:[], 
        profit:[]
      },
      goodChartData: { 
          goodNum:[],
          goodName:[]
      },
      sql:'',
      saleTimeSpan : 7,
      saleTimeType : 'week',
      goodTimeSpan : 7,
      goodTimeType : 'week',
      
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
        this.saleChartData = data.info;
        console.log(1);
      })
    },
    getGood(){
      getGood({type:this.goodTimeType}).then(data=>{
        this.goodChartData.goodName = data.goodName;
        this.goodChartData.goodNum = data.goodNum;

        console.log(this.goodChartData);
      })
    },
  },

  created(){
    this.getSale();
    this.getGood();
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
