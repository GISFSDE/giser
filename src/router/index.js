import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/Index'
import mapboxbase from '@/views/mapboxs/bases/mapboxbase.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mapboxbase',
      name: 'mapboxbase',
      component: mapboxbase
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
