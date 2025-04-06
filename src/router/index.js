import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import GameDefault from '../views/GameDefault.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/GameDefault', component: GameDefault },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
