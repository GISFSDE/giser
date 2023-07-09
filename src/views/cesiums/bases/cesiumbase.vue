<template>
  <div>
    <div id="cesiumContainer">
      <!-- <el-input placeholder="请输入内容" v-model="params" class="params">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input> -->
    </div>
  </div>
</template>
 
<script>
import cesiumUtil from "@/utils/cesiumUtil/cesiumUtil.js";
export default {
  name: "cesiumContainer",
  data() {
    return { params: {}, select: "dddd" };
  },
  created() {},
  mounted() {
    cesiumUtil.cesiumInit();

    cesiumUtil.addModel(this.$cViewer, "firstEntity");
    cesiumUtil.flyTo(
      this.$cViewer,
      Cesium.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0)
    );
    cesiumUtil.doFlyOver(this.$cViewer);
  },
  destroyed() {},
  methods: {},
};
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
/* 隐藏cesium标志 */
/* .cesium-viewer .cesium-widget-credits {
  display: none;
} */
.params {
  position: fixed;
  width: 10%;
  top: 30px;
  left: 100px;
  z-index: 100;
}
</style>