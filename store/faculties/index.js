import { make } from 'vuex-pathify';
import { fetchListFaculties } from '~/models/faculties.model';

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
//   async createRoles({ commit, state }, payload) {
//     await createRole(payload);
//   },
};
