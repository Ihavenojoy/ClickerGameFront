<template>
  <NuxtLayout>
    <v-app>
      <NavBar/>
      <v-main class="ma-2">
        <NuxtPage/>
      </v-main>
      <Toast/>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import NavBar from '~/components/layout/NavBar.vue';
import Toast from "~/components/Toast.vue";

useHead({
  meta: [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=0'
  }]
});
</script>
