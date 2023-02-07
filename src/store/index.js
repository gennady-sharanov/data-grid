import Vue from 'vue';
import Vuex from 'vuex';
import dataGrid from './dataGrid';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dataGrid
  }
});