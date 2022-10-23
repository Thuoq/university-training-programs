import { make } from 'vuex-pathify';
import { createKnowledgeBlock, fetchListKnowledgeBlock } from '~/models/knowledge-block.model';

export const state = () => ({
  knowledgeBlocks: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListKnowLedgeBlock({ commit }) {
    const knowledgeBlocks = await fetchListKnowledgeBlock();
    commit('SET_KNOWLEDGE_BLOCKS', knowledgeBlocks);
  },
  async createKnowLedgeBlock({ commit }, payload) {
    await createKnowledgeBlock(payload);
  },
};