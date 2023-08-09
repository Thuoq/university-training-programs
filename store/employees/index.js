import { make } from 'vuex-pathify';
import { updateEmployee, createEmployee, fetchListEmployees, fetchSearchListEmployees } from '~/models/employees.model';

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
  async searchListEmployees({ commit }, payload) {
    const employees = await fetchSearchListEmployees(payload);
    commit('SET_EMPLOYEES', employees);
  },
  async createEmployees({ commit, state }, payload) {
    await createEmployee(payload);
  },
  async updateEmployees({ commit, state }, payload) {
    await updateEmployee(payload);
  },
};
