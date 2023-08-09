import { make } from 'vuex-pathify';
import {
  updatePosition,
  createPosition,
  fetchListPositions,
  deletePositionById,
  fetchSearchListPositions,
} from '~/models/positions.model';

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
  async searchListPositions({ commit }, payload) {
    const positions = await fetchSearchListPositions(payload);
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
