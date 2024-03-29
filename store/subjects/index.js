import { make } from 'vuex-pathify';
import { updateSubject, createSubject, fetchListSubjects, deleteSubjectById } from '~/models/subjects.model';

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
  async getListSubjects({ commit }, query = {}) {
    const search = new URLSearchParams(query);
    const subjects = await fetchListSubjects(search.toString());
    commit('SET_SUBJECTS', subjects);
  },
  async createSubjects({ commit, state }, payload) {
    await createSubject(payload);
  },
  async updateSubjects({ commit, state }, payload) {
    await updateSubject(payload);
  },

  async deleteSubject({ commit, state }, payload) {
    await deleteSubjectById(payload);
  },
};
