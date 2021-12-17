import axios from 'axios';

const API_BASE = 'api/'

class requestService {
    static getClients(){
       return this.fetchBase(`${API_BASE}clients`);
    }

    static getTrainers(){
        return this.fetchBase(`${API_BASE}trainers`);
    }

    static fetchBase(url){
        return axios.get(url).then(res => {
            return res.data;
        }).catch((e) => { return e});
    }

    static postBase(url,data){
        return axios.post(url,data).catch(() => { throw new Error('There was an error trying to post your data')});
    }
}

export default requestService;