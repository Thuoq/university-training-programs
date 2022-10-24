import { make } from 'vuex-pathify';
import { createSubject,fetchListSubjects } from '~/models/subjects.model';

export const state = () => ({
  subjects: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListSubjects({ commit }) {
    const subjects = await fetchListSubjects();
    commit('SET_SUBJECTS', subjects);
  },
  async createSubjects({ commit, state }, payload) {
    await createSubject(payload);
  },
};
