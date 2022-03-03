import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leasData: {},
  },
  mutations: {
    setLeasData(state, payload) {
      state.leasData = payload;
    },
    addItem(state, payload) {
      state.leasData.leasItems.push(payload);
    },
    removeItem(state, payload) {
      state.leasData.leasItems.splice(payload, 1);
    },
    sumFinalLeasPrice(state, payload) {
      state.leasData.finalLeasPrice += payload;
    },
    sumFinalDepositPrice(state, payload) {
      state.leasData.finalDepositPrice += payload;
    },
    sumFinalPrice(state, payload) {
      state.leasData.finalPrice += payload;
    },
    subtractFinalLeasPrice(state, payload) {
      state.leasData.finalLeasPrice -= payload;
    },
    subtractFinalDepositPrice(state, payload) {
      state.leasData.finalDepositPrice -= payload;
    },
    subtractFinalPrice(state, payload) {
      state.leasData.finalPrice -= payload;
    },
  },
  // actions: {
  // },
  getters: {
    getLeasData(state) {
      return state.leasData;
    },
    getClientData(state) {
      return state.leasData.clientData;
    },
    getLeasItems(state) {
      return state.leasData.leasItems;
    },
  },
});
