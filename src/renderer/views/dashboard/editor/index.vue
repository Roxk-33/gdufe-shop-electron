<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      
      <el-card class="info-container">
        <span class="display_name">你好,{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;"></span>
      </el-card>
    </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'dashboard-editor',
  components: { PanThumb },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


	.dashboard-editor-container {
		// background-color: #e3e3e3;
		min-height: 100vh;
		margin-top: -50px;
		padding: 100px 60px 0px;
		.pan-info-roles {
			// font-size: 12px;
			font-weight: 700;
			// color: #333;
			display: block;
		}
		.info-container {
			position: relative;
			width:400px;
			height: 150px;
			line-height: 200px;
			.display_name {
				font-size: 28px;
				line-height: 48px;
				color: #212121;
				position: absolute;
				top: 25px;
			}
		}
	}
</style>
