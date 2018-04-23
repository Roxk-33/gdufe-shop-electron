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
    getDate(timeArr){
      console.log(timeArr);
      let date_arr = [];
      for (let i = 0; i < timeArr.length; i++) {
        const date = new Date(timeArr[i] );
        date_arr.push( `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
      }
      date_arr = date_arr.reverse()
      return date_arr;
      
    },
    setOptions({ price, time } = {}) {
      this.chart.setOption({
       
        xAxis: {
          data: this.getDate(time),
          boundaryGap: false,
          type: 'category',
           
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
        yAxis: {
          axisTick: {
            show: false
          },
          max:function(value){
            return parseInt(value.max + value.max/2)
          }
        },
        legend: {
          data: ['价格']
        },
        series: [{
          name: '价格', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: price,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
