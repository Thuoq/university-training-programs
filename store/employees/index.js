import { make } from 'vuex-pathify';
import {fetchListEmployees } from '~/models/employees.model';

export const state = () => ({
  employees: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListEmployees({ commit }) {
    const employees = await fetchListEmployees();
    commit('SET_EMPLOYEES', employees);
  },
//   async createemployees({ commit, state }, payload) {
//     await createRole(payload);
//   },
};