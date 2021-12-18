<template>
    <div>
        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="Entrenadores" :active="selected === TABS[0]" @click="selected = TABS[0]">
                    <h2>Asignación cliente-entrenador</h2>
                </b-tab>
                <b-tab title="Valoracion de Conjunto" :active="selected === TABS[1]" @click="selected = TABS[1]">
                    <h2>Satisfacción del conjunto</h2>
                </b-tab>
            </b-tabs>
        </div>
        <p v-if="notAsignedClients.length">Clients missing assigment: {{ notAsignedClients }}</p>
        <div class="row row-cols-3 mt-5 justify-content-center">
            <div v-for="(trainer, i) in sortedTrainers" :key="trainer.name" class="col-auto d-flex align-items-stretch">
                <b-card
                    no-body
                    v-if="trainer.clients"
                    :footer="`${trainer.clients.length} clientes asignados`"
                    tag="article"
                    style="max-width: 20rem"
                    class="mb-2 text-left"
                >
                    <b-card-header class="d-flex">
                        <p class="mr-auto">Entrenador {{ i + 1 }}</p>
                        <div
                            class="float-right"
                            v-b-tooltip.hover.bottom
                            custom-class="tooltip-class"
                            :title="`
                                Valoración: ${trainer.rank} --        Max clientes: ${trainer.slots}`"
                        >
                            <b-icon icon="info-circle-fill" variant="info" v-b-tooltip.hover></b-icon>
                        </div>
                    </b-card-header>
                    <b-card-body>
                        <div v-if="selected == TABS[0]">
                            <b-card-title>
                                <div class="row">
                                    <div class="col size emoji-smile-fill text-darl">
                                        <div class="bg-light text-center float-left p-2 px-4 rounded">
                                            <b-icon icon="emoji-smile-fill" variant="warning" class="p-0"></b-icon>
                                        </div>
                                    </div>
                                    <div class="col">{{ trainer.name }}</div>
                                </div>
                            </b-card-title>
                            <b-card-text class="ml-4">
                                <p
                                    v-for="client in trainer.clients"
                                    :key="client.name"
                                    v-b-tooltip.hover.right
                                    :title="`Satisfacción: ${client.satisfactation ? client.satisfactation : ''}`"
                                >
                                    {{ client.name }}
                                </p>
                            </b-card-text>
                        </div>
                        <div v-else class="text-center">
                            <p class="mb-0">Satisfaccion de grupo</p>
                            <p>
                                <span class="text-info">{{ getS(satisfaccion[i]) }}</span>
                            </p>
                        </div>
                    </b-card-body>
                </b-card>
            </div>
        </div>
        <explanation v-if="selected == TABS[1]" :chart-data="chartData" :general="generalSatisfaction"></explanation>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Explanation from './Explanation.vue';
const TABS = ['entrenadores', 'valoracion'];
export default {
    components: { Explanation },
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
            console.log('aaa', a);
            return a;
        },
        notAsignedClients() {
            return this.notAsigned.map((c) => c.name).join(',');
        },
    },
    data() {
        return {
            clonedClients: [],
            selected: TABS[0],
            TABS,
            maxSatisValue: 50,
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
            const copy = [...list];
            return copy
                .sort((a, b) => {
                    return a[key] - b[key];
                })
                .reverse();
        },
        asign() {
            // let count = 0
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
            return (1 - (this.maxTrainerRank - rank) * clientImp * 0.01).toFixed(2);
        },
        add(accumulator, n) {
            return accumulator + parseFloat(n);
        },
        getS(n) {
            console.log(n, typeof n);
            return (parseFloat(n) * 10).toFixed(2);
        },
    },
};
</script>

<style>
.emoji-smile-fill {
    font-size: 25px;
}
</style>
