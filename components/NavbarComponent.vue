<template>
  <v-app-bar app color="primary" dark>

    <!-- Navbar Title -->
    <span class="NavBarTitle">Clicker game</span>

    <v-spacer></v-spacer>

    <!-- Navigation Items Container -->
    <div class="d-flex gap-2">
      <v-btn
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          variant="text"
          class="text-white"
      >
        {{ item.label }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <!-- Sign-in/Sign-out and Profile Button (based on condition) -->
    <template v-if=false>
      <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signIn">
        Sign in
      </v-btn>
    </template>
    <template v-else>
      <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signOut">
        Sign out
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useNavbar } from '~/store/useNavbar';

// Retrieve necessary store properties
const { navigationItems, signIn, signOut } = useNavbar();
</script>

<style scoped>
.NavBarTitle {
  display: inline-block;
  width: 200px;
}

/* Profile image styling (adjust if you need) */
.profile-btn .v-btn__overlay,
.profile-btn .v-btn__underlay {
  display: none !important;
}
</style>
