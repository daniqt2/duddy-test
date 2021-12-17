import Vue from "vue";
import VueRouter from 'vue-router'

import EditPage from '../components/EditPage.vue'
import Asignation from '../components/Asignation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: EditPage
  },
  {
    path: "/asign",
    name: "asign",
    component: Asignation
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;