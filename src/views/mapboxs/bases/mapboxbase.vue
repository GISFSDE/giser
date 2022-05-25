<template>
  <div id="map-container"></div>
</template>
<script>
//import mapMethods from "../utils/map";
//import mapboxgl from "mapbox-gl"; 不支持国家2000坐标系
import mapboxgl from "@cgcs2000/mapbox-gl";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "mapboxbase",
  data() {
    return {
      mapclass: null,
      mapboxLayers: [],
      map: null,
    };
  },
  watch: {
    // "$store.state.baseLayer": {
    //   deep: false,
    //   handler: function (newval, oldval) {
    //     let map = this.$store.state.map;
    //     console.log(map + "临时");
    //     if (oldval == "wmsss") {
    //       for (let i in map.style._layers) {
    //         map.setLayoutProperty(i, "visibility", "none");
    //       }
    //       map.addLayer({
    //         id: newval,
    //         type: "raster",
    //         source: newval,
    //       });
    //     } else {
    //       map.removeLayer(oldval);
    //       if (newval == "wmsss") {
    //         for (let i in map.style._layers) {
    //           map.setLayoutProperty(i, "visibility", "visible");
    //         }
    //       } else {
    //         map.addLayer({
    //           id: newval,
    //           type: "raster",
    //           source: newval,
    //         });
    //       }
    //     }
    //   },
    // },
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ2FtZWtpbmcwMDAwIiwiYSI6ImNrcG54MWMwNjBnMDEycHA0NHp6YmRyazIifQ.P_IRZNFJbyr1eTvn4NqKxA";
    this.initMap(); //方式一：内置加载
    console.log("this.map", this.map);

    window.onmessage = function (e) {
      console.log(e.data);
    };
  },

  methods: {
    // ...mapActions(["setTreeData"]),
    // async loadTree() {
    //   var tree = await this.setTreeData();
    //   console.log("我是" + tree);
    // },
    // createMap(divId) {
    //   let map = new mapboxgl.Map({
    //     container: divId, //地图容器的id
    //     center: [113.2, 23.4], //中心点
    //     zoom: 17, //地图初始化时的层级
    //     minzoom: 0,
    //     maxzoom: 16,
    //   });
    // },
    async initMap() {
      var self = this;
      await axios
        .get(
          "http://172.18.109.232:8080/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/hz_dark.json"
        )
        .then((res) => {
          console.log("res", res);
          self.mapboxLayers = res.data.layers;
          console.log(" this.mapboxLayers", self.mapboxLayers);
        })
        .catch((err) => {
          console.log(err);
          console.log("获取MAPBOX图层配置文件错误");
        });

      self.map = new mapboxgl.Map({
        attributionControl: false,
        container: "map-container",
        minzoom: 0,
        maxzoom: 16,
        style: {
          sprite:
            "http://172.18.109.232:8080/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/sprite", //检索子画面图片和元数据
          glyphs:
            "http://172.18.109.232:8080/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/Droid Sans Fallback I Regular/{fontstack}/{range}.pbf", //字体的地址,以PBF格式加载有符号距离字段的字形集
          version: 8,
          version: 8,
          layers: self.mapboxLayers,
          sources: {
            //支持数据类型 vector, raster, raster-dem, geojson, image, video，canvas
            xvvc: {
              type: "vector",
              tiles: [
                "http://172.18.109.232:8080/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/{z}/{x}/{y}",
              ],
            },
            // test: {
            //   type: "vector",
            //   tiles: [
            //     "http://172.18.109.232:8080/B8EBAF81285E9247EB8C8945C2D27FA4/PBS/rest/services/hzsyraster/Mapserver/{z}/{x}/{y}",
            //   ],
            // },
          },
          center: [120.20628080154421, 30.26861163772292],
          zoom: 17,
        },
      });
      // self.map.on("load", function () {
      //   self.map.addLayer({
      //     id: "test1111",
      //     type: "raster",
      //     source: {
      //       type: "raster",
      //       tiles: [
      //         "http://172.18.109.232:8080/api/B8EBAF81285E9247EB8C8945C2D27FA4/PBS/rest/services/hzsyraster/Mapserver/{z}/{x}/{y}",
      //       ],
      //       tileSize: 256,
      //       zoomOffset: 1,
      //     },
      //     layout: {
      //       visibility: true ? "visible" : "none",
      //     },
      //     minzoom: 0,
      //     maxzoom: 16,
      //   });
      // });

      return self.map;
    },
  },
};
</script>
<style scoped>
#map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  /* z-index: -1; */
  z-index: 1;
}
.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>