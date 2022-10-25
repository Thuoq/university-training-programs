import { make } from 'vuex-pathify';
import {updatePosition, createPosition,fetchListPositions } from '~/models/positions.model';

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
  async updatePositions({ commit, state }, payload) {
    await updatePosition(payload);
  },
};
