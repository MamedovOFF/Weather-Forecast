import Vue from 'vue'
import Vuex from 'vuex'
import City from './Modules/City'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    City
  }
})
