<template>

  <div id="app">
    <NavBar/>
    <div class="container-fluid bg-light py-5 d-flex text-center min">
    <div class="container bg-white rounded-lg shadow p-4 my-auto mb-5">
         <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
// import EditPage from './components/EditPage.vue'
import NavBar from './components/NavBar.vue'
// import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    // EditPage,
    NavBar
  },
  created(){
        console.log(this.$store)
       this.$store.dispatch('getTrainers');
       this.$store.dispatch('getClients');
    }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  height: 100vh;
}

.min {min-height: 100%;}
</style>
