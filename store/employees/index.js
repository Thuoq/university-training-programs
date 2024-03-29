import { make } from 'vuex-pathify';
import { updateEmployee, createEmployee, fetchListEmployees } from '~/models/employees.model';

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
  async getListEmployees({ commit }, searchParams = {}) {
    const search = new URLSearchParams(searchParams);
    const employees = await fetchListEmployees(search.toString());
    commit('SET_EMPLOYEES', employees);
  },
  async createEmployees({ commit, state }, payload) {
    await createEmployee(payload);
  },
  async updateEmployees({ commit, state }, payload) {
    await updateEmployee(payload);
  },
};
