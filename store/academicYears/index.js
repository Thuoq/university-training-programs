import { make } from 'vuex-pathify';
import {
  updateAcademicYear,
  createAcademicYear,
  fetchListAcademicYears,
  deleteAcademicYearById,
} from '~/models/academicYears.model';

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
  async getListAcademicYears({ commit }, query = {}) {
    const searchParams = new URLSearchParams(query);
    const academicYears = await fetchListAcademicYears(searchParams.toString());
    commit('SET_ACADEMIC_YEARS', academicYears);
  },
  async createAcademicYears({ commit, state }, payload) {
    await createAcademicYear(payload);
  },
  async updateAcademicYears({ commit, state }, payload) {
    await updateAcademicYear(payload);
  },
  async deleteAcademicYear({ commit, state }, payload) {
    await deleteAcademicYearById(payload);
  },
};
