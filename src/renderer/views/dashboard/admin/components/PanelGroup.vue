<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon name="shoppingCard" class="card-panel-icon" scale="6" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日营销额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="saleData" :duration="4600"></count-to>
        </div>
      </div>
      
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-orderCard">
          <svg-icon name="orderNum" class="card-panel-icon" scale="6" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日订单数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="orderData" :duration="4600"></count-to>
        </div>
      </div>
      
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props:{
    saleData:{
      type: Number,
      default: 0
    },
    orderData:{
      type: Number,
      default: 0
    },
  },
  methods: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    
    .icon-people {
      color: #40c9c6;
    }
    .icon-orderCard {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
