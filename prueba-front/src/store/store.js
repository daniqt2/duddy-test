import Vue from 'vue';
import Vuex from 'vuex';

import RequestService from '../api/requests';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        trainers: [],
        clients: [],
    },
    actions: {
        getClients({ commit }) {
            return RequestService.getClients().then((data) => {
                commit('saveClients', data.clients);
            });
        },
        setClients({ commit }, data) {
            //  POST ACTION would be here
            commit('saveClients', data);
        },
        getTrainers({ commit }) {
            return RequestService.getTrainers().then((data) => {
                commit('saveTrainers', data.trainers);
                return data;
            });
        },
        updateTrainers({ commit }, data) {
            // Where api would be called to do a POST on data
            new Promise((resolve) => {
                commit('saveTrainers', data);
                resolve(data);
            });
        },
    },
    mutations: {
        // save new data on store
        saveClients(state, data) {
            state.clients = data;
        },
        saveTrainers(state, data) {
            state.trainers = data;
        },
    },
});
export default store;
