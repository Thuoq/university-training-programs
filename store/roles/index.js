import { make } from 'vuex-pathify';
import { createRole, fetchListRoles, fetchSearchListRoles } from '~/models/roles.model';

export const state = () => ({
  roles: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListRoles({ commit }) {
    const roles = await fetchListRoles();
    commit('SET_ROLES', roles);
  },
  async searchListRoles({ commit }, payload) {
    const roles = await fetchSearchListRoles(payload);
    commit('SET_ROLES', roles);
  },
  async createRoles({ commit, state }, payload) {
    await createRole(payload);
  },
};
