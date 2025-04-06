import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import GameDefault from './views/GameDefault.vue';
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
