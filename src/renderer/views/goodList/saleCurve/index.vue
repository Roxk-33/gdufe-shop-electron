<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'
import resize from './mixins/resize'

export default {
  mixins: [resize],  
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    timeSpan: {
      type: Number,
      default: 7
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    timeSpan:{
      deep: true,
      handler(val) {
        this.setOptions(this.chartData)
      }
    }
  },
  
  methods: {
    
     setOptions({ sale, time  } = {}) {
      this.chart.setOption({
        color:  ['#5793f3', '#d14a61', '#675bba'],

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data:['销售额']
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 30,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: 
            {   
              name:'时间',
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#5793f3'
                    }
                },
                data: time
            },
        yAxis: [
            {   
              name:'销售量/个',
                type: 'value'
            }
        ],
        series: [
            {
                name:'营业额',
                type:'line',
                smooth: true,
                data: sale
            },
           
        ]})
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
