<template>
    <div>
        <div>
            <tabs :selected="selected" @select="selected = $event"></tabs>
        </div>
        <div v-if="notAsignedClients.length" class="p-2 w-25 mx-auto bg-light">
            <h5>Clientes no asignados</h5>
            <p>{{ notAsignedClients }}</p>
        </div>
        <div class="container-fluid">
            <div class="row row-cols-3 mt-5 justify-content-center">
                <div
                    v-for="(trainer, i) in sortedTrainers"
                    :key="trainer.name"
                    class="col-md-4 col-12 d-flex align-items-stretch"
                >
                    <trainer-card
                        :trainer="trainer"
                        :show-satis="selected == TABS.VALORACION"
                        :index="i"
                        :satis="getS(satisfaccion[i])"
                    ></trainer-card>
                </div>
            </div>

            <b-button class="float-right d-none d-md-block" v-if="selected == TABS.ENTRENADORES">
                <router-link class="nav-link text-white" to="/">Volver a configuración</router-link>
            </b-button>
        </div>
        <explanation
            v-if="selected == TABS.VALORACION"
            :chart-data="chartData"
            :general="generalSatisfaction"
        ></explanation>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Explanation from './Explanation.vue';
import Tabs from './Tabs.vue';
import TrainerCard from './TrainerCard.vue';

const TABS = {
    ENTRENADORES: 'entrenadores',
    VALORACION: 'valoracion',
};

export default {
    name: 'AssignationLogic',
    components: { Explanation, TrainerCard, Tabs },
    computed: {
        ...mapState(['trainers', 'clients']),
        sortedTrainers() {
            return this.sort('rank', this.trainers);
        },
        sortedClients() {
            return this.sort('importance', this.clients);
        },
        satisfaccion() {
            return (
                this.sortedTrainers.map((trainer) => {
                    const sum = trainer.clients.reduce(
                        (summ, { satisfactation }) => summ + parseFloat(satisfactation),
                        0,
                    );
                    const div = sum / trainer.clients.length;
                    const a = div.toFixed(2);
                    return a;
                }) || []
            );
        },
        satisfactationSum() {
            if (this.satisfaccion) return this.satisfaccion.reduce(this.add, 0);
            else return null;
        },
        chartData() {
            const data = {};
            for (let row = 0; row <= this.maxClientRank; row++) {
                data[row] = {};
                data[row].index = row;
                for (let col = 0; col <= this.maxTrainerRank; col++) {
                    data[row][col] = this.calc(row, col);
                }
            }
            return Object.values(data);
        },
        generalSatisfaction() {
            const a = this.clients.reduce((summ, { satisfactation }) => summ + parseFloat(satisfactation), 0);
            return a;
        },
        notAsignedClients() {
            return this.notAsigned.map((c) => c.name).join(',');
        },
    },
    data() {
        return {
            selected: TABS.ENTRENADORES,
            TABS,
            maxTrainerRank: 5,
            maxClientRank: 10,
            notAsigned: [],
        };
    },
    watch: {
        sortedTrainers() {
            this.asign();
        },
        sortedClients() {
            this.asign();
        },
    },
    created() {
        this.asign();
    },
    methods: {
        sort(key, list) {
            // Method used to sort lists out (Highest->lowest)
            const copy = [...list];
            return copy
                .sort((a, b) => {
                    return a[key] - b[key];
                })
                .reverse();
        },
        asign() {
            // Asign clients to each trainer
            const arrClone = [...this.sortedClients];
            this.sortedTrainers.forEach((trainer) => {
                trainer;
                const num = trainer.slots;
                const clients = arrClone.slice(0, num);
                arrClone.splice(0, num);
                clients.forEach((c) => (c.satisfactation = this.calc(c.importance, trainer.rank)));
                this.$set(trainer, 'clients', clients);
            });
            this.notAsigned = [...arrClone];
        },
        calc(clientImp, rank) {
            // Satisfactation formula
            return (1 - (this.maxTrainerRank - rank) * clientImp * 0.02).toFixed(2);
        },
        add(accumulator, n) {
            return accumulator + parseFloat(n);
        },
        getS(n) {
            // Format satisfactation val
            return (parseFloat(n) * 10).toFixed(2);
        },
    },
};
</script>

<style>
.bg-blue {
    background-color: #334257 !important;
    color: white;
}
</style>
