import { make } from 'vuex-pathify';
import { updateSubject, createSubject, fetchListSubjects, fetchSearchListSubjects } from '~/models/subjects.model';

export const state = () => ({
  subjects: null,
});
// export const getters = {
//   ...make.getters(state),
// };
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListSubjects({ commit }) {
    const subjects = await fetchListSubjects();
    commit('SET_SUBJECTS', subjects);
  },
  async searchListSubjects({ commit }, payload) {
    const subjects = await fetchSearchListSubjects(payload);
    commit('SET_SUBJECTS', subjects);
  },
  async createSubjects({ commit, state }, payload) {
    await createSubject(payload);
  },
  async updateSubjects({ commit, state }, payload) {
    await updateSubject(payload);
  },
};
