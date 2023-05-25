import Vue from "vue";
import store from "@/store/index";

class cesiumUtil {
    constructor() {

    }
    cesiumInit() {
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZWFlYjAyYS0xN2JlLTQ0OTItOGNkOC05YWJlNGY0MjI2NmQiLCJpZCI6NDkyMjYsImlhdCI6MTYxNzM0NjA3N30.crkTg0Logk_JUA7BROy0r9RqTJWCi8NZpTyu4qI11Fo";
        let viewer = new Cesium.Viewer("cesiumContainer", {
            // https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
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
            homeButton: true, // 是否显示返回主视角控件
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
            // https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html
            polygon: {
                // Cartesian3  3D坐标  （x，y，z）  https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html
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
                height: 4000,//  altitude 
                material: Cesium.Color.RED.withAlpha(0.5),//specifying the material  https://cesium.com/learn/cesiumjs/ref-doc/Material.html
                outline: true,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 90,
                // show: false
            }
        });

        viewer.zoomTo(entity);
        return entity;
    }

    flyTo(viewer, destination) {
        // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html
        // const camera = new Cesium.Camera(viewer.scene);
        // const camera = viewer.camera;
        // camera.position = new Cesium.Cartesian3();
        // camera.direction = Cesium.Cartesian3.negate(Cesium.Cartesian3.UNIT_Z, new Cesium.Cartesian3());
        // camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y);
        // camera.frustum.fov = Cesium.Math.PI_OVER_THREE;
        // camera.frustum.near = 1.0;
        // camera.frustum.far = 2.0;

        viewer.camera.flyTo({
            // 摄像机在WGS84(世界)坐标中的最终位置或从自上而下的视图中可见的矩形。
            destination: destination,
            // 包含方向和向上属性或航向、俯仰和滚动属性的对象。默认情况下，方向在3D中指向帧的中心，在哥伦布视图中指向负z方向。在3D中向上的方向指向当地的北方，在哥伦布视角中指向正y方向。在无限滚动模式下，二维中不使用方向。
            orientation: {
                direction: new Cesium.Cartesian3(-0.04231243104240401, -0.20123236049443421, -0.97862924300734),
                up: new Cesium.Cartesian3(-0.47934589305293746, -0.8553216253114552, 0.1966022179118339)
            },
            duration: 3,
            complete: this.flyOver,
            cancel: this.flyCancel
        });

    }
    doFlyOver(viewer) {
        viewer.scene.camera.completeFlight();
    }
    doFlyCancel(viewer) {
        viewer.scene.camera.cancelFlight();
    }
    flyOver() {
        console.log('飞行完毕')
    }
    flyCancel() {
        console.log('飞行取消')
    }
}
export default new cesiumUtil();