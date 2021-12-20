<template>
    <b-card no-body v-if="trainer.clients" tag="article" class="mx-1 mb-4 text-left w-100 shadow border-0">
        <b-card-header class="d-flex border-bottom-0 bg-blue">
            <p class="mr-auto my-auto">Entrenador {{ index + 1 }}</p>
            <div
                class="float-right"
                v-b-tooltip.hover.bottom
                custom-class="tooltip-class"
                :title="`
                                Valoración: ${trainer.rank} --        Max clientes: ${trainer.slots}`"
            >
                <b-icon icon="info-circle-fill" variant="white" class="btn mb-2" v-b-tooltip.hover></b-icon>
            </div>
        </b-card-header>
        <b-card-body>
            <div v-if="!showSatis">
                <b-card-title class="pb-2">
                    <div class="row">
                        <div class="col size emoji-smile-fill">
                            <div class="bg-light text-center float-left p-2 px-4 rounded">
                                <b-icon icon="emoji-smile-fill" variant="warning" class="p-0"></b-icon>
                            </div>
                        </div>
                        <div class="col align-self-center d-flex">
                            <h4>{{ trainer.name }}</h4>
                        </div>
                    </div>
                </b-card-title>
                <b-card-text class="bg-light p-4 text-center mt-2">
                    <p>
                        <b>
                            {{ trainer.clients.length ? ' Clientes asignados' : 'Ningún Cliente Asignado' }}
                        </b>
                    </p>
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
                <p class="mb-0">Satisfacción de grupo</p>
                <p v-if="trainer.clients.length">
                    <span class="text-info">{{ satis }}</span>
                </p>
                <p v-else>--Ningún cliente asignado--</p>
            </div>
        </b-card-body>
        <b-card-footer class="border-top-0 text-secondary text-center">
            <p class="my-0">{{ trainer.clients.length }} clientes asignados</p>
        </b-card-footer>
    </b-card>
</template>

<script>
export default {
    name: 'TrainerCards',
    props: {
        trainer: {
            type: Object,
            requiered: true,
        },
        showSatis: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            requiered: true,
        },
        satis: {
            type: String,
            defualt: '0',
        },
    },
};
</script>

<style>
.emoji-smile-fill {
    font-size: 30px;
}
</style>
