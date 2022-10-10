import { make } from 'vuex-pathify';
import { signIn } from '~/models/user.model';
import { resetPass } from '~/models/user.model';

export const state = () => ({
  currentUser: JSON.parse(window.localStorage.getItem('user')) || null,
});

export const mutations = {
  ...make.mutations(state),
};
export const getters = {
  ...make.getters(state),
};

export const actions = {
  async signIn({ commit }, credentials) {
    const currentUser = await signIn(credentials);
    commit('SET_CURRENT_USER', currentUser);
  },
  async resetPass({ commit }, pass) {
    const currentUser = await resetPass(pass);
    commit('SET_CURRENT_USER', currentUser);
  },
};
