import { make } from 'vuex-pathify';
import { createPosition,fetchListPositions } from '~/models/positions';

export const state = () => ({
  positions: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListPositions({ commit }) {
    const positions = await fetchListPositions();
    commit('SET_POSITIONS', positions);
  },
  async createPositions({ commit, state }, payload) {
    await createPosition(payload);
  },
};
