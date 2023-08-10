import { make } from 'vuex-pathify';
import {
  createTrainingProgramContent,
  updateTrainingProgram,
  createTrainingProgram,
  fetchListTrainingPrograms,
  deleteTrainingProgramContentByTPId,
  deleteTrainingProgram,
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
  async getListTrainingPrograms({ commit }, query = {}) {
    const search = new URLSearchParams(query || {});
    const trainingPrograms = await fetchListTrainingPrograms(search.toString());
    commit('SET_TRAINING_PROGRAMS', trainingPrograms);
  },
  async createTrainingPrograms({ commit, state }, payload) {
    await createTrainingProgram(payload);
  },
  async createTrainingProgramsContent({ commit, state }, payload) {
    await createTrainingProgramContent(payload);
  },
  async deleteTrainingProgramContentByTPId({ commit, state }, payload) {
    await deleteTrainingProgramContentByTPId(payload);
  },
  async updateTrainingPrograms({ commit, state }, payload) {
    await updateTrainingProgram(payload);
  },
  async deleteTrainingProgram({ commit, state }, id) {
    await deleteTrainingProgram(id);
  },
};
