import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null,
  },
  mutations: {

    setMap: function (state, map) {
      state.map = map;
    }
  },
  actions: {

  },
  modules: {
  }
})
