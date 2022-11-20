import { make } from 'vuex-pathify';
import {
  createTrainingProgramContent,
  updateTrainingProgram,
  createTrainingProgram,
  fetchListTrainingPrograms,
} from '~/models/trainingPrograms.model';

export const state = () => ({
  trainingPrograms: null,
});
export const getters = {
  ...make.getters(state),
};
export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  async getListTrainingPrograms({ commit }) {
    const trainingPrograms = await fetchListTrainingPrograms();
    commit('SET_TRAINING_PROGRAMS', trainingPrograms);
  },
  async createTrainingPrograms({ commit, state }, payload) {
    await createTrainingProgram(payload);
  },
  async createTrainingProgramsContent({ commit, state }, payload) {
    await createTrainingProgramContent(payload);
  },
  async updateTrainingPrograms({ commit, state }, payload) {
    await updateTrainingProgram(payload);
  },
};
