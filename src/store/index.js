import Vue from 'vue';
import Vuex from 'vuex';
import compare from "./modules/compare";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    compare
  }
});
