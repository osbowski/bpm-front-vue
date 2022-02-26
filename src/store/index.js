import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leasData:{
    }
  },
  mutations: {
    setClientData(state,payload){
      state.leasData.ClientData = payload;
    }
  },
  actions: {
  },
  getters: {
    getClientData(state){
      return state.leasData.ClientData;
    }
  }
})
