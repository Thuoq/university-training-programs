import { make } from 'vuex-pathify';
import { updateMajor, createMajor, fetchListMajors, deleteMajorById } from '~/models/majors.model';

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
  async getListMajors({ commit }, query = {}) {
    const search = new URLSearchParams(query);
    const majors = await fetchListMajors(search.toString());
    commit('SET_MAJORS', majors);
  },
  async createMajors({ commit, state }, payload) {
    await createMajor(payload);
  },
  async updateMajors({ commit, state }, payload) {
    await updateMajor(payload);
  },
  async deleteMajor({ commit, state }, payload) {
    await deleteMajorById(payload);
  },
};
