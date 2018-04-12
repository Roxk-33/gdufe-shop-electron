<template>
<div class="shop-container " style="width:1100px;">
        <p class='shop-title'>商品价格设置</p>
        <el-tabs type="border-card">
          <el-tab-pane label="正常价格设置"><normal-setting></normal-setting></el-tab-pane>
          <el-tab-pane label="活动价格设置"><single-setting></single-setting></el-tab-pane>
          <el-tab-pane label="活动价格设置(捆绑)"><multiple-setting></multiple-setting></el-tab-pane>
        </el-tabs>
</div>
</template>

<script>
import NormalSetting  from "./normal";
import SingleSetting  from "./activity/single";
import MultipleSetting  from "./activity/multiple";

const defaultForm = {
  goodId: "",
  price: 0
};
export default {
  name: "priceSetting",
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(null);
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      listLoading: false,
      dialogVisible: false,
      showBox:false,
      importance: 1,
      note:'',
      rules: {
        goodId: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "change"
          }
        ],
        price: [
          {
            type: "number",
            required: true,
            message: "输入数字",
            trigger: "change"
          }
        ]
      }
    };
  },
  components : {
    SingleSetting,
    MultipleSetting,
    NormalSetting
  },
  methods: {
  }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
