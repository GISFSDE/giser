<!--  -->
<template>
  <div id="map-container"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import "proj4leaflet";
var esri = require("esri-leaflet");

export default {
  name: "leafletMap",
  props: {
    msg: String,
    sourceType: {
      type: Number,
      default: 1,
    },
    zyid: String,
    queryCondition: {
      type: String,
      default: "1=1",
    },
  },

  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // "区（县、市）界":
      // "出让土地（招拍挂出让）":
      // 批而未供土地消化:
      // 供而未用土地消化:
      // 低效用地再开发:
      mapUrls: [
        "http://1.1.1.1:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/SDE.R2021_LSXZQH.gis",
        "http://1.1.1.1:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/HZGIS.TDGY_ZPGCR.gis",
        "http://1.1.1.1:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/SDE.R2022_PEWGXH.gis",
        "http://1.1.1.1:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/SDE.R2022_GEWYXH.gis",
        "http://1.1.1.1:8083/512834d664a4d3407b4c18ba3e8b3b66373945ec/ArcGIS/MapService/Catalog/SDE.R2022_DXYDZKF.gis",
      ],
      clickLayers: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 经纬度位置互换
    handleGeo(rings) {
      // console.log("测试" + rings);
      return rings.map((ring) => ring.map((point) => [point[1], point[0]]));
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var self = this;

    // 初始化地图
    var res = [
      0.00549933137253187, // Level 0
      0.00274966568626595, // Level 1
      0.00137483284313297, // Level 2
      0.000687416421566485, // Level 3
      0.000343708210783242, // Level 4
      0.000171854105391621,
      8.59270526958104e-5,
      4.29635263479052e-5,
      2.14817631739526e-5,
      1.07408815869763e-5,
      5.37044079348816e-6,
      2.68522039674407e-6,
      1.34261019837204e-6,
    ];
    var crs = new L.Proj.CRS(
      "SR-ORG:7408",
      "+proj=longlat +ellps=GRS80 +no_defs",
      {
        resolutions: res,
        origin: [118.122911693886, 31.2869311022836],
      }
    );
    var southWest = [29.1304, 118.1217]; //地图西南点坐标
    var northEast = [30.6191, 120.7753]; //地图东北点坐标
    var bounds = L.latLngBounds(southWest, northEast); //地图边界
    // if (document.querySelector("#map-container").children.length > 0) return;
    document.getElementById("map-container")["_leaflet_id"] = undefined;
    self.map = L.map("map-container", {
      crs: crs,
      attributionControl: false,
      measureControl: true,
      zoomControl: true,
      zoom: 3,
      //minZoom: 9,
      //maxZoom: 17,
      maxBounds: bounds, //地图的边界
      center: [30.25, 120.145],
    });
    //self.map.invalidateSize(true);
    // self.map.eachLayer(function (layer) {
    //   if (
    //     !layer._container ||
    //     ("" + jQuery(layer._container).attr("class")).replace(/\s/g, "") !=
    //       "leaflet-layer"
    //   ) {
    //     layer.remove();
    //   }
    // });
    var basemap = new L.TileLayer( //    hzsyvector_dark
      //this.mapDzUrl+"/tile/{z}/{y}/{x}",
      "http://1.1.1.1:8080/7F6B37860FE86671CFEBFF88BB2D1C65F7C1216D9CF88722E4A623ABE09D5B6B6750E6D8E4F10588F8036F137E53FA33/PBS/rest/services/hzsyraster/Mapserver/tile/{z}/{y}/{x}",
      {
        tileSize: 256,
        minZoom: 0,
        maxZoom: 12,
      }
    );

    var basemap1 = new L.TileLayer( //    hzsyvector_dark
      "http://1.1.1.1:8080/7F6B37860FE86671CFEBFF88BB2D1C65F7C1216D9CF88722E4A623ABE09D5B6B6750E6D8E4F10588F8036F137E53FA33/PBS/rest/services/hzsyvector/Mapserver/tile/{z}/{y}/{x}",
      //this.mapYxUrl+"/tile/{z}/{y}/{x}",
      {
        tileSize: 256,
        minZoom: 0,
        maxZoom: 12,
      }
    );
    let overlayMaps = {};
    self.clickLayers = L.layerGroup();
    self.map.addLayer(self.clickLayers);

    // let layer = L.layerGroup([
    //   esri.dynamicMapLayer({
    //     url: "http://1.1.1.1:6080/arcgis/rest/services/hbzy/MapServer ",
    //     layers: [0],
    //   }),
    // ]);
    // self.map.addLayer(layer);
    console.log("组件内接受查询条件：", self.queryCondition);

    // self.$axios
    //   .get(self.mapUrls[self.sourceType] + "/query?where=1=1&f=json")
    //   .then((res) => {
    //     console.log("属性", res.data.features[0].attributes);
    //     console.log(
    //       "坐标",
    //       self.handleGeo(res.data.features[0].geometry.rings)
    //     );

    //     for (let i = 0; i < res.data.features.length; i++) {
    //       if (res.data.features[i].geometry.rings) {
    //         var latlngs = self.handleGeo(res.data.features[i].geometry.rings);
    //         var polygon = L.polygon(latlngs, { color: "yellow" }).addTo(
    //           self.map
    //         );
    //         polygon.on("click", (e) => {

    //           console.log("点击了坐标点：", e.latlng);
    //         });
    //       }
    //     }
    //     self.map.fitBounds(polygon.getBounds());
    //     L.geoJSON(geojsonFeature).addTo(self.map);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    var baseMaps = {
      电子地图: basemap1,
      影像地图: basemap,
    };
    self.map.addLayer(basemap1);
    L.control.layers(baseMaps, overlayMaps).addTo(self.map);
    console.log("地图加载完成");

    if (self.queryCondition != "1=1") {
      self.clickLayers.clearLayers();
      // var usaDynamicLayer = esri
      //   .dynamicMapLayer({
      //     url:
      //       self.mapUrls[self.sourceType] +
      //       "/query?where=" +
      //       self.queryCondition +
      //       "&f=json",
      //     f: "image",
      //     opacity: 1,
      //   })
      //   .addTo(self.map);
      self.$axios
        .get(
          self.mapUrls[self.sourceType] +
          "/query?where=" +
          self.queryCondition +
          "&f=json"
        )
        .then((res) => {
          console.log("属性", res.data.features[0].attributes);
          console.log(
            "坐标",
            self.handleGeo(res.data.features[0].geometry.rings)
          );

          for (let i = 0; i < res.data.features.length; i++) {
            if (res.data.features[i].geometry.rings) {
              var latlngs = self.handleGeo(res.data.features[i].geometry.rings);
              //var polygon = L.polygon(latlngs, { color: "red" }).addTo(self.map);
              var polygon = L.polygon(latlngs, { color: "red" });
              self.clickLayers.addLayer(polygon);
              polygon.on("click", (e) => {
                console.log("点击了坐标点：", e.latlng);
              });
            }
          }
          self.map.fitBounds(polygon.getBounds());
          //L.geoJSON(geojsonFeature).addTo(self.map);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(
      "sourceUrl",
      self.mapUrls[self.sourceType] +
      "/query?where=" +
      self.queryCondition +
      "&f=json"
    );

    console.log("地图加载完成");
    let gyquery = "";
    if (self.sourceType == 1) {
      gyquery = "0:YTFL in ( '工业')";
    }

    var usaDynamicLayer = esri
      .dynamicMapLayer({
        url: self.mapUrls[self.sourceType],
        f: "image",
        opacity: 1,
        layerDefs: gyquery,
      })
      .addTo(self.map);

    // self.$nextTick(() => {
    // });

    self.map.on("click", function (e) {
      usaDynamicLayer
        .identify()
        .layers("visible:all") // just the counties sublayer
        .on(self.map)
        .at(e.latlng)
        .run(function (error, featureCollection) {
          console.log("featureCollection", featureCollection);
          var latlngs = self.handleGeo(
            featureCollection.features[0].geometry.coordinates
          );
          let html = "";
          let property = featureCollection.features[0].properties;
          for (const key in property) {
            // console.log(key + ":" + property[key] + "<br>");
            if (property[key] != "Null") {
              html = html + key + ":" + property[key] + "<br>";
            } else {
              html = html + key + ":<br>";
            }
          }
          // L.marker(e.latlng).addTo(self.map)
          console.log("点击了坐标点：", e.latlng);
          self.$emit("child-event", property["资源ID"]);
          console.log("资源ID", property["资源ID"]);
          //var polygon = L.polygon(latlngs, { color: "red" }).addTo(self.map);
          self.clickLayers.clearLayers();
          var polygon = L.polygon(latlngs, { color: "red" });
          self.clickLayers.addLayer(polygon);
          polygon.bindPopup(html).openPopup();
          self.map.fitBounds(polygon.getBounds());
          if (error) {
            return;
          }
        });
    });

    console.log("usaDynamicLayer", usaDynamicLayer);
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
#map-container {
  height: 1000px;
  width: 100%;
}
</style>
