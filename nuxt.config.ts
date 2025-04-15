import {defineNuxtConfig} from 'nuxt/config';
import fs from 'fs'

export default defineNuxtConfig({
    css: [
        'bootstrap/dist/css/bootstrap.min.css'
    ],

    ssr: false,

    modules: [
        'vuetify-nuxt-module',
        '@nuxt/image',
        '@nuxt/icon',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    vuetify: {
        // Vuetify-specific options
        vuetifyOptions: {
            // Add your Vuetify options here
        }
    },

    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'] // <!--- this
        }
    },



    build: {
        transpile: ['vuetify', 'vue-i18n'],
    },

    compatibilityDate: '2025-03-28',
});