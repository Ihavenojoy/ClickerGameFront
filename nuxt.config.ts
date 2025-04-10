import { readFileSync } from 'fs';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.css',
    ],

    build: {
        transpile: ['vuetify'], // Make sure Vuetify is transpiled by Nuxt
    },

    vite: {
        server: {
            https: {
                key: readFileSync('./cert/localhost-key.pem'),  // Path to your private key
                cert: readFileSync('./cert/localhost.pem'),     // Path to your certificate
            },
            port: 3000,
            host: 'localhost',
        },
    },
});
