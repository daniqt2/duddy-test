<template>
    <div>
        <b-tabs content-class="mt-3" class="d-none d-md-block">
            <b-tab
                v-for="opt in options"
                :key="opt.button"
                :title="opt.button"
                :active="selected == opt.emit"
                @click="$emit('select', opt.emit)"
            >
                <h2>{{ opt.title }}</h2>
            </b-tab>

            <!-- <b-tab title="Entrenadores" :active="!showTrainers" @click="$emit('entrenadores')">
                <h2>Asignación cliente-entrenador</h2>
            </b-tab>
            <b-tab title="Valoración de Conjunto" :active="!showTrainers" @click="$emit('entrenadores')">
                <h2>Satisfacción del conjunto</h2>
            </b-tab> -->
        </b-tabs>
        <div class="d-sm-none d-block">
            <div class="d-flex">
                <b-button
                    v-for="opt in options"
                    :key="opt.button"
                    @click="$emit('select', opt.emit)"
                    class="mx-1 border p-2 bg-transparent"
                    :class="{
                        'text-dark  font-weight-bold': selected == opt.emit,
                        'text-dark': selected != opt.emit,
                    }"
                >
                    {{ opt.button }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabsComponent',
    props: {
        selected: {
            type: String,
            default: 'entrenadores',
        },
    },
    data() {
        return {
            options: [
                {
                    button: 'Entrenadores',
                    title: 'Asignación cliente-entrenador',
                    emit: 'entrenadores',
                },
                {
                    button: 'Valoración de Conjunto',
                    title: 'Satisfacción del conjunto',
                    emit: 'valoracion',
                },
            ],
        };
    },
};
</script>

<style scoped>
b-button:focus {
    outline: none;
}
</style>
