<template>
    <div class="fixed-bottom bg-light border-top d-flex justify-content-center bg-blue py-2">
        <router-link
            class="nav-link text-white px-5"
            :class="{ 'font-weight-bold bg-info rounded': this.$route.name === 'home' }"
            to="/"
        >
            Configuración
        </router-link>
        <router-link
            class="nav-link text-white px-5"
            to="/asign"
            :class="{ 'font-weight-bold bg-info rounded': this.$route.name === 'asign' }"
        >
            Resultados
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'MobileMenu',
};
</script>

<style>
.bg-blue {
    background-color: #334257 !important;
    color: white;
}
</style>
