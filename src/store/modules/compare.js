const state = () => ({
  arrToCompare: []
});

const getters = {
  COMPARE_ARR: state => state.arrToCompare
};

const actions = {
  TOGGLE_TO_COMPARISON({commit}, city) {
    commit('TOGGLE_CITY_TO_STATE', city);
  }
};

const mutations = {
  TOGGLE_CITY_TO_STATE(state, city) {
    const tmp = state.arrToCompare.find(compCity => compCity.id === city.id);

    if (!tmp) {
      state.arrToCompare.push(city);
    } else {
      state.arrToCompare = state.arrToCompare.filter(compCity => compCity.id !== city.id);
    }
  },

  CLEAR_STATE(state) {
    state.arrToCompare = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
