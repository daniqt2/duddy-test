<template>
    <div>
        <h1 class="text-center">Pantalla de configuración</h1>
        <div v-if="trainersClone">
            <div
                v-for="(trainer, i) in trainersClone"
                :key="trainer.name"
                class="row py-5 px-4"
                :class="{ 'border-bottom': i < trainers.length - 1 }"
            >
                <div class="col-sm my-2">
                    Nombre
                    <input v-model="trainer.name" class="ml-2 border-gray-light p-2" />
                </div>
                <div class="col-sm my-2">
                    Valoracion
                    <input
                        v-model="trainer.rank"
                        class="ml-2 border-gray-light p-2"
                        :class="{ 'border-danger text-danger': !rankValidity[i] }"
                    />
                    <p v-if="!rankValidity[i]" class="text-danger small mt-2">Value should be between 0-5</p>
                </div>
                <div class="col-sm my-2">
                    Máximo número de clientes
                    <select v-model="trainer.slots" class="p-2 border-gray-light">
                        <option v-for="num in 10" :key="num">{{ num }}</option>
                    </select>
                </div>
            </div>
            <div>
                <b-button v-b-modal.modal-1 variant="info" class="mr-2">Ver Tabla de Clientes</b-button>
                <b-button variant="primary" @click="updateTrainers" :disabled="!allValid">Calcular Resultados</b-button>
            </div>
            <b-modal id="modal-1" title="Clientes">
                <modal></modal>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Modal from './Modal.vue';
export default {
    components: { Modal },
    data() {
        return {
            trainersClone: null,
            lolo: 'dsadas',
        };
    },
    computed: {
        ...mapState(['trainers']),
        rankValidity() {
            return this.trainersClone.map((f) => f.rank <= 5 && f.rank >= 0);
        },
        allValid() {
            return this.trainersClone.every((f) => f.rank <= 5 && f.rank >= 0);
        },
    },
    watch: {
        trainers(newVal) {
            this.trainersClone = newVal;
        },
    },
    created() {
        this.trainersClone = JSON.parse(JSON.stringify(this.trainers));
    },
    methods: {
        updateTrainers() {
            this.$store.dispatch('updateTrainers', this.trainersClone).then(() => {
                // control errors
                //...
                this.$router.push({ name: 'asign' });
            });
        },
    },
};
</script>

<style>
.fill {
    min-height: 100%;
    height: 100%;
}
.border-gray-light {
    border: solid 1px #e4e9f1;
}

.small {
    font-size: 10px;
}
</style>
