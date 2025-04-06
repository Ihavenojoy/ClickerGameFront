<template>
  <NuxtLayout>
    <v-app>
      <NavBar/>
      <v-main>
        <NuxtPage/>
      </v-main>
      <Toast/>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavbarComponent.vue';

useHead({
  meta: [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=0'
  }]
});
</script>
