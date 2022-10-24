import { make } from 'vuex-pathify';
import { createMajor,fetchListMajors } from '~/models/majors.model';

export const state = () => ({
  majors: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListMajors({ commit }) {
    const majors = await fetchListMajors();
    commit('SET_MAJORS', majors);
  },
  async createMajors({ commit, state }, payload) {
    await createMajor(payload);
  },
};
