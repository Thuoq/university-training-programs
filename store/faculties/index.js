import { make } from 'vuex-pathify';
import {
  createFaculty,
  deleteFacultyById,
  fetchListFaculties,
  updateFaculty,
  fetchSearchListFaculties,
} from '~/models/faculties.model';

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
  async getListFaculties({ commit }) {
    const faculties = await fetchListFaculties();
    commit('SET_FACULTIES', faculties);
  },
  async searchListFaculties({ commit }, payload) {
    const faculties = await fetchSearchListFaculties(payload);
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
