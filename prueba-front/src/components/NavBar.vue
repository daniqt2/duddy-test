<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand font-weight-bold" to="/">Prueba DuddyFit</router-link>
        <div class="d-none d-md-block">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" :class="{ 'font-weight-bold': this.$route.name === 'home' }">
                    <router-link class="nav-link" to="/">Configuración</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link text-dark"
                        to="/asign"
                        :class="{ 'font-weight-bold': this.$route.name === 'asign' }"
                    >
                        Resultados
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
a {
    color: black !important;
}
</style>
