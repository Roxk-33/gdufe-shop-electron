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
    }
  },
  
  methods: {
   
    setOptions({ profit, time, revenue } = {}) {
      this.chart.setOption({
        color:  ['#5793f3', '#d14a61', '#675bba'],

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data:['营业额', '利润']
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
              name:'营业额',
              position: 'left',
              type: 'value'
            },
            {
            type: 'value',
            name: '利润',
            min: 0,
            // max: 250,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#d14a61'
                }
            },
            axisLabel: {
                formatter: '{value} '
            }
        },
        ],
        series: [
            {
                name:'营业额',
                type:'line',
                smooth: true,
                data: revenue
            },
            {
                name:'利润',
                type:'line',
                smooth: false,
                data: profit
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
