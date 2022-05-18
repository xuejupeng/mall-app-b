import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    formData: {
      page: 1,
      size: 7,
      searchWord: '',
      category: '',
    },
    categoryList: [],
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    logOut(state) {
      state.userInfo = {};
    },
    setFormData(state, payload) {
      state.formData = {
        ...state.formData,
        ...payload,
      };
    },
    setCategory(state, payload) {
      state.categoryList = payload;
    },
  },
  actions: {
    setUserInfo({ state, commit }, payload) {
      commit('setUserInfo', payload);
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    logOut({ commit }) {
      commit('logOut');
      window.localStorage.removeItem('userInfo');
    },
    setFormData({ commit }, payload) {
      commit('setFormData', payload);
    },
    setCategory({ commit }, payload) {
      commit('setCategory', payload);
    },
  },
  modules: {
  },
});
