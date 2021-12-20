<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div class="container-fluid bg-light py-5 d-flex text-center min">
            <div class="container bg-white rounded-lg shadow p-4 my-auto mb-5">
                <router-view></router-view>
            </div>
        </div>
        <mobile-menu class="d-block d-sm-none"></mobile-menu>
    </div>
</template>

<script>
import MobileMenu from './components/MobileMenu.vue';
import NavBar from './components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
        MobileMenu,
    },
    created() {
        this.$store.dispatch('getTrainers');
        this.$store.dispatch('getClients');
    },
};
</script>

<style lang="scss">
@import '~@/assets/scss/vendors/bootstrap-vue/index';
#app {
    height: 100vh;
}

.min {
    min-height: 100%;
}
</style>
