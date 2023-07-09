import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/Index'
import mapboxbase from '@/views/mapboxs/bases/mapboxbase.vue'
import cesiumbase from '@/views/cesiums/bases/cesiumbase.vue'
import leafletbase from '@/views/leaflets/bases/leafletbase.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mapboxbase',
      name: 'mapboxbase',
      component: mapboxbase
    },
    {
      path: '/cesiumbase',
      name: 'cesiumbase',
      component: cesiumbase
    },
    {
      path: '/leafletbase',
      name: 'leafletbase',
      component: leafletbase
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
