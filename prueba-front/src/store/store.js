import Vue from 'vue'
import Vuex from 'vuex'
import RequestService from '../api/requests';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    trainers: [],
    clients: []
  },
  actions: {
    getClients({commit}){
        return RequestService.getClients().then(data=> {
            commit('saveClients',data.clients);
        })
    },
    setClients({commit},data){
        commit('saveClients',data);
    },
    getTrainers({commit}){
        return RequestService.getTrainers().then(data=> {
            commit('saveTrainers',data.trainers);
            console.log(data)
            return data;
        })
    },
    setTrainers({commit},data){
        commit('saveTrainers',data);
    },
  },
  mutations: {
    saveClients (state,data) {
      state.clients= data;
    },
    saveTrainers (state,data) {
        console.log("saving")
      state.trainers= data;
    }
  },
})
export default store