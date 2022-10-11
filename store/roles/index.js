import { make } from 'vuex-pathify';
import { fetchListRoles } from '~/models/roles.model';

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
    console.log(roles);
    commit('SET_ROLES', roles);
  },
};