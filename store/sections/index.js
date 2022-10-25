import { make } from 'vuex-pathify';
import { updateSection,createSection,fetchListSections } from '~/models/sections.model';

export const state = () => ({
  sections: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListSections({ commit }) {
    const sections = await fetchListSections();
    commit('SET_SECTIONS', sections);
  },
  async createSections({ commit, state }, payload) {
    await createSection(payload);
  },

  async updateSections({ commit, state }, payload) {
    await updateSection(payload);
  }
};
