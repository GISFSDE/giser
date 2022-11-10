<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import cesiumUtil from "@/utils/cesiumUtil/cesiumUtil.js";
export default {
  name: "cesiumContainer",
  data() {
    return {};
  },
  created() {},
  mounted() {
    cesiumUtil.cesiumInit();
    cesiumUtil.addModel(this.$cViewer, "firstEntity");
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
</style>