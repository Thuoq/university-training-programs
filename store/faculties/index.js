import { make } from 'vuex-pathify';
import { createFaculty, deleteFacultyById, fetchListFaculties, updateFaculty } from '~/models/faculties.model';

export const state = () => ({
  faculties: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListFaculties({ commit }, searchParams = {}) {
    const search = new URLSearchParams(searchParams);
    const faculties = await fetchListFaculties(search.toString());
    commit('SET_FACULTIES', faculties);
  },
  async createFaculties({ commit, state }, payload) {
    await createFaculty(payload);
  },
  async updateFaculties({ commit, state }, payload) {
    await updateFaculty(payload);
  },
  async deleteFaculty({ commit, state }, payload) {
    await deleteFacultyById(payload);
  },
};
