import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        '@/assets/css/main.scss' // your custom styles
    ],

    ssr: false, // This disables server-side rendering

    vite: {
        define: {
            global: 'window',  // Define `global` as `window` globally for all modules
        },
    },


    modules: [
        'vuetify-nuxt-module',
        '@nuxt/image',
        '@nuxt/icon',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    vuetify: {
        vuetifyOptions: {
            // Add your Vuetify options here
        }
    },

    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'] // Icon collections
        }
    },

    plugins: [
        { src: '~/plugins/global.js', mode: 'client' } // Load custom global plugin only on the client side
    ],

    build: {
        transpile: ['vuetify', 'vue-i18n'], // Ensure Vuetify and Vue i18n are transpiled
    },

    compatibilityDate: '2025-03-28', // Set compatibility date
});
