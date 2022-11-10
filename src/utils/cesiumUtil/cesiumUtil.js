import Vue from "vue";
import store from "@/store/index";

class cesiumUtil {
    constructor() {

    }
    cesiumInit() {
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZWFlYjAyYS0xN2JlLTQ0OTItOGNkOC05YWJlNGY0MjI2NmQiLCJpZCI6NDkyMjYsImlhdCI6MTYxNzM0NjA3N30.crkTg0Logk_JUA7BROy0r9RqTJWCi8NZpTyu4qI11Fo";
        let viewer = new Cesium.Viewer("cesiumContainer", {
            animation: true, // 是否显示动画控件
            baseLayerPicker: true, // 是否显示图层选择控件
            vrButton: true, // 是否显示VR控件
            geocoder: true, // 是否显示地名查找控件
            timeline: true, // 是否显示时间线控件
            sceneModePicker: true, // 是否显示投影方式控件
            navigationHelpButton: true, // 是否显示帮助信息控件
            navigationInstructionsInitiallyVisible: false, // 帮助按钮，初始化的时候是否展开
            infoBox: true, // 是否显示点击要素之后显示的信息
            fullscreenButton: true, // 是否显示全屏按钮
            selectionIndicator: true, // 是否显示选中指示框
            homeButton: false, // 是否显示返回主视角控件
            scene3DOnly: false, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
            terrainProvider: Cesium.createWorldTerrain({
                // 光照阴影
                requestVertexNormals: true,
                // 水流效果
                requestWaterMask: true,
            }), // 显示地形
            // terrainProvider: new Cesium.EllipsoidTerrainProvider({}) // 不显示地形
        });


        Vue.prototype.$cViewer = viewer;
    }
    // 添加实体   https://cesium.com/learn/cesiumjs/ref-doc/Entity.html
    addModel(viewer, entity) {
        entity = viewer.entities.add({

            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    -109.080842, 45.002073,
                    -105.91517, 45.002073,
                    -104.058488, 44.996596,
                    -104.053011, 43.002989,
                    -104.053011, 41.003906,
                    -105.728954, 40.998429,
                    -107.919731, 41.003906,
                    -109.04798, 40.998429,
                    -111.047063, 40.998429,
                    -111.047063, 42.000709,
                    -111.047063, 44.476286,
                    -111.05254, 45.002073]),
                height: 0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        });

        viewer.zoomTo(entity);
        return entity;
    }

}
export default new cesiumUtil();