<template>
    <div class="container px-5">
        <div
            v-for="(client, i) in clients"
            :key="client.name"
            class="row py-4"
            :class="{ 'border-bottom': i < clients.length - 1 }"
        >
            <div class="col-sm">
                <b>Nombre:</b>
                {{ client.name }}
            </div>
            <div class="col-sm">
                <b>Importancia:</b>
                {{ client.importance }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['clients']),
    },
};
</script>

<style>
.absolute {
    position: absolute;
    z-index: 10;
}

#modal-1___BV_modal_footer_ > .btn-secondary {
    display: none;
}
</style>
