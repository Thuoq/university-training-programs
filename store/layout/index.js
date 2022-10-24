import { make } from 'vuex-pathify';

export const state = () => ({
  isLoading: false,
});

export const getters = {
  ...make.getters(state),
};

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  setLoading({ commit }, payload) {
    commit('SET_IS_LOADING', payload);
  },
};
