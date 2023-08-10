import { make } from 'vuex-pathify';
import { updatePosition, createPosition, fetchListPositions, deletePositionById } from '~/models/positions.model';

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
  async getListPositions({ commit }, query = {}) {
    const search = new URLSearchParams(query || {});
    const positions = await fetchListPositions(search.toString());
    commit('SET_POSITIONS', positions);
  },
  async createPositions({ commit, state }, payload) {
    await createPosition(payload);
  },
  async updatePositions({ commit, state }, payload) {
    await updatePosition(payload);
  },
  async deletePosition({ commit, state }, payload) {
    await deletePositionById(payload);
  },
};
