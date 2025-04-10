import { createApp } from 'vue';
import App from './app.vue';
import { createRouter, createWebHistory } from 'vue-router';
import GameDefault from '../pages/Game/GameDefault.vue';
import { createPinia } from 'pinia';

// Vue Router Setup
const routes = [
    { path: '/', component: Home },
    { path: '/GameDefault', component: GameDefault }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
