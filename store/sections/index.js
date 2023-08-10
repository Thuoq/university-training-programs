import { make } from 'vuex-pathify';
import { updateSection, createSection, fetchListSections, deleteSection } from '~/models/sections.model';

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
  async getListSections({ commit }, query = {}) {
    const search = new URLSearchParams(query);
    const sections = await fetchListSections(search.toString());
    commit('SET_SECTIONS', sections);
  },
  async createSections({ commit, state }, payload) {
    await createSection(payload);
  },

  async updateSections({ commit, state }, payload) {
    await updateSection(payload);
  },
  async onDeleteSection({ commit, state }, payload) {
    await deleteSection(payload);
  },
};
