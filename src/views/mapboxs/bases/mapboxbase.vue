<template>
  <div id="map-container"></div>
</template>
<script>
//import mapMethods from "../utils/map";
//import mapboxgl from "mapbox-gl"; 不支持国家2000坐标系
import mapboxgl from "@cgcs2000/mapbox-gl";
import "@cgcs2000/mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
// npm install vuex@next --save
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
export default {
  name: "mapboxbase",
  data() {
    return {
      mapclass: null,
      mapboxLayers: [],
    };
  },
  watch: {},
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ2FtZWtpbmcwMDAwIiwiYSI6ImNrcG54MWMwNjBnMDEycHA0NHp6YmRyazIifQ.P_IRZNFJbyr1eTvn4NqKxA";
    this.initMap();

    window.onmessage = function (e) {
      console.log(e.data);
    };
  },

  methods: {
    async initMap(
      layerUrl = "https://zlbkjzz.hzsgis.com:8090/C1DC5DAA62D342D7B5395525C7AD4BB96EB680B39B9DE1B4DA44307B9450FC5700C42E754F5CC4A6071252ECD95372D8/PBS/rest/services/hzsyvectortile/VectorTileMapServer/hzNormal.json"
      // "https://zlbkjzz.hzsgis.com:8090/C1DC5DAA62D342D7B5395525C7AD4BB96EB680B39B9DE1B4DA44307B9450FC5700C42E754F5CC4A6071252ECD95372D8/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/hz_dark.json"
    ) {
      var self = this;
      await axios
        .get(layerUrl)
        .then((res) => {
          console.log("res", res);
          this.mapboxLayers = res.data.layers;
          console.log(" this.mapboxLayers", self.mapboxLayers);
        })
        .catch((err) => {
          console.log(err);
          console.log("获取MAPBOX图层配置文件错误");
        });

      let map = new mapboxgl.Map({
        attributionControl: false,
        container: "map-container",
        attributionControl: false,
        minzoom: 0,
        maxzoom: 16,
        style: {
          sprite:
            "https://zlbkjzz.hzsgis.com:8090/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/sprite", //检索子画面图片和元数据
          glyphs:
            "https://zlbkjzz.hzsgis.com:8090/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/Droid Sans Fallback I Regular/{fontstack}/{range}.pbf", //字体的地址,以PBF格式加载有符号距离字段的字形集
          version: 8,
          layers: self.mapboxLayers,
          sources: {
            geojsonlayer: {
              type: "raster",
              tiles: [
                "http://172.18.33.198:6080/arcgis/rest/services/hbzy/MapServer/export?dpi=96&transparent=true&format=png8&layers=show:4&bbox={bbox-epsg-4490}&bboxSR=4490&imageSR=4490&f=image",
              ],
              tileSize: 256,
              bounds: [
                118.197749127458, 29.0775494026713, 120.838874975684,
                30.6709641336959,
              ],
            },

            hzwms: {
              type: "raster",
              tiles: [
                "http://localhost:8080/service?LAYERS=image2014&SRS=EPSG%3A4326&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&" +
                  "&bbox={bbox-epsg-4490}" +
                  "&BGCOLOR=f27c58" + //生成的图片背景颜色
                  "&TRANSPARENT=TRUE" +
                  "&format=image/png" + //返回的图片格式
                  "&WIDTH=256&HEIGHT=256",
              ],
              tileSize: 256, //图片显示的大小，最好和上面大小保持一致
            },
            hangzhouTDT: {
              type: "raster",
              tiles: [
                "http://t.hangzhoumap.gov.cn/a10d71fdf646e8bc0866df899ab1f24437dc1627/Tile/ArcGISREST/hztdtvectorblend.gis/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
            },
            //标准版本矢量切片
            xvvc: {
              type: "vector",
              tiles: [
                "https://zlbkjzz.hzsgis.com:8090/74BE05BE36C461F08EA7859024C39F066FB514275DED0D9FAC4CE1BAED6D92EC9529582104A0FB7853D7FF676462FB40/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/{z}/{x}/{y}",
              ],
            },
            worldimage: {
              type: "raster",
              tiles: [
                "https://zlbkjzz.hzsgis.com:8094/citybrain/service?LAYERS=raster&SRS=EPSG%3A4326&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&" +
                  "&bbox={bbox-epsg-4490}" +
                  "&BGCOLOR=f27c58" + //生成的图片背景颜色
                  "&TRANSPARENT=TRUE" +
                  "&format=image/png" + //返回的图片格式
                  "&WIDTH=256&HEIGHT=256",
              ],
              tileSize: 256, //图片显示的大小，最好和上面大小保持一致
            },
            worldmap: {
              type: "raster",
              tiles: [
                "https://zlbkjzz.hzsgis.com:8094/citybrain/service?LAYERS=vector&SRS=EPSG%3A4326&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&" +
                  "&bbox={bbox-epsg-4490}" +
                  "&BGCOLOR=f27c58" + //生成的图片背景颜色
                  "&TRANSPARENT=TRUE" +
                  "&format=image/png" + //返回的图片格式
                  "&WIDTH=256&HEIGHT=256",
              ],
              tileSize: 256, //图片显示的大小，最好和上面大小保持一致
            },

            cvvx: {
              type: "vector", //vector, raster, raster-dem, geojson, video, image
              tiles: [
                "https://zlbkjzz.hzsgis.com:8090/C1DC5DAA62D342D7B5395525C7AD4BB96EB680B39B9DE1B4DA44307B9450FC5700C42E754F5CC4A6071252ECD95372D8/PBS/rest/services/hzsyvectortile/VectorTileMapServer/{z}/{x}/{y}",
              ],
            },
            hzsyvectorcache: {
              type: "raster", //vector, raster, raster-dem, geojson, video, image
              tiles: [
                "https://zlbkjzz.hzsgis.com:8090/C1DC5DAA62D342D7B5395525C7AD4BB96EB680B39B9DE1B4DA44307B9450FC5700C42E754F5CC4A6071252ECD95372D8/PBS/rest/services/hzsyvectorcache/VectorTileMapServer/{z}/{y}/{x}",
              ],
              //切片的图片大小
              tileSize: 256,
              //切片请求的范围，不在这个范围的话  就不进行切片请求
              bounds: [-180, -90, 180, 90],
            },
          },
          center: [120.20628080154421, 30.26861163772292],
          zoom: 11,
        },
      });

      // npm install @mapbox/mapbox-gl-draw
      var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      map.addControl(draw);
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: false,
        })
      );
      map.addControl(
        new mapboxgl.NavigationControl({
          showZoom: true,
          showCompass: true,
          visualizePitch: true,
        })
      );
      map.addControl(
        new mapboxgl.FullscreenControl({
          container: document.querySelector("body"),
        })
      );
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "imperial",
      });
      map.addControl(scale);

      scale.setUnit("metric");
      map.addControl(
        new mapboxgl.AttributionControl({
          compact: true,
        })
      );
      map.on("click", (e) => {
        var markerHeight = 50,
          markerRadius = 10,
          linearOffset = 25;
        var popupOffsets = {
          top: [0, 0],
          "top-left": [0, 0],
          "top-right": [0, 0],
          bottom: [0, -markerHeight],
          "bottom-left": [
            linearOffset,
            (markerHeight - markerRadius + linearOffset) * -1,
          ],
          "bottom-right": [
            -linearOffset,
            (markerHeight - markerRadius + linearOffset) * -1,
          ],
          left: [markerRadius, (markerHeight - markerRadius) * -1],
          right: [-markerRadius, (markerHeight - markerRadius) * -1],
        };
        var popup = new mapboxgl.Popup({
          offset: popupOffsets,
          className: "my-class",
        })
          .setLngLat(e.lngLat)
          .setHTML("<h1>Hello World!</h1>")
          .setMaxWidth("300px")
          .addTo(map);
      });
      this.$store.commit("setMap", map); //map缓存到Vuex进行管理
      map = this.$store.state.map;
      return map;
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