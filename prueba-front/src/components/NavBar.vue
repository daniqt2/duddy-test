<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand font-weight-bold" href="#">Prueba DuddyFit</a>
  <div>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" :class="{'active': this.$route.name === 'home'}">
          <router-link class="nav-link" to="/">Configuracion</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/asign" :class="{'active': this.$route.name === 'asign'}">Resultados</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>