// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false


// Cesium  Dependence --------------
// import Cesium from 'cesium/Cesium'
// import 'cesium/Widgets/widgets.css'
// Vue.prototype.Cesium = Cesium
// 这里不能使用 import Cesium from 'cesium/Cesium' 导入模块，因为Cesium 1.63 版本以后使用的是ES6。应该使用以下方式
// import { Viewer } from "cesium/Cesium";
// import * as Cesium from "cesium/Cesium"; //正确
// import "cesium/Widgets/widgets.css";
// Vue.prototype.Cesium = Cesium
// import * as Cesium from 'cesium/Cesium'
// import * as widgets from 'cesium/Widgets/widgets.css'
// Vue.prototype.Cesium = Cesium
// Vue.prototype.widgets = widgets

import VueCesium from 'vue-cesium'
// VueCesium 默认使用 `https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js`
Vue.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
  // cesiumPath: /static/Cesium/Cesium.js
  // 个人在线Cesium Build包：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // 官方在线Cesium Build包，有CDN加速，推荐用这个：
  cesiumPath: 'https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js',
  // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 Cesium 在线影像加载不了
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNmVjNTk0ZC0xYzY1LTQ0ZWUtOWI2Ny1hMjRiNWI1Y2QwZDAiLCJpZCI6OTAxMywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MzIxOTM3Mn0.qi5nscj1ebAxZ0qQX35bKk3c71gBnIUhBmq8wEo3JLY'
})


//Leaflet  Dependence  ----------------
// npm install leaflet
// npm install esri-leaflet
// npm i leaflet.chinatmsproviders --save
//引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import 'leaflet/dist/leaflet.css'
//引用vue-控件中的leaflet
import * as L from 'leaflet'
Vue.L = Vue.prototype.$L = L;
//引用esri-leaflet
let esri = require("esri-leaflet");
import proj4 from 'proj4';
window.proj4 = proj4; // 用于leaflet切片
import 'leaflet.chinatmsproviders' // 用于leaflet   引用天地图
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
