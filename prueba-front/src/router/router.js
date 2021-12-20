import Vue from 'vue';
import VueRouter from 'vue-router';

import Assignation from '../components/Assignation.vue';
import EditPage from '../components/EditPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: EditPage,
    },
    {
        path: '/asign',
        name: 'asign',
        component: Assignation,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
