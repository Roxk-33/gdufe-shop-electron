<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
        <keep-alive>
          <tab-pane v-if='activeName==item.key' :type='item.key' @create='showCreatedTimes'></tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/tabPane'

export default {
  name: 'tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: '未采购清单', key: 'not' },
        { label: '已采购清单', key: 'done' },
      ],
      activeName: 'CN',
      createdTimes: 0
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
