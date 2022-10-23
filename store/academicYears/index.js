import { make } from 'vuex-pathify';
import { createAcademicYear,fetchListAcademicYears } from '~/models/academicYears.model';

export const state = () => ({
    academicYears: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListAcademicYears({ commit }) {
    const academicYears = await fetchListAcademicYears();
    commit('SET_ACADEMIC_YEARS', academicYears);
  },
  async createAcademicYears({ commit, state }, payload) {
    await createAcademicYear(payload);
  },
};