<template>
  <v-app-bar app color="primary" dark>
    <span class="NavBarTitle">Clicker</span>

    <v-spacer></v-spacer>

    <!-- Navigation Items Container using Bootstrap -->
    <div class="position-absolute top-50 start-50 translate-middle d-flex gap-2">
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

    <template>
      <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signIn">
        SignOut
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useNavbar } from '~/store/useNavbar';

const { navigationItems, signIn, signOut } = useNavbar();

</script>

<style>
.language-list {
  background-color: transparent !important; /* Make the background transparent */
  box-shadow: none !important; /* Remove any shadow */
  border: none !important; /* Remove any border */
}

.flag-btn {
  background-color: transparent !important; /* Remove button background */
  box-shadow: none !important; /* Remove shadow */
  border: none !important; /* Remove border */
}

.flag-btn .v-btn__overlay,
.flag-btn .v-btn__underlay {
  display: none !important; /* Hide any overlay effects */
}

.flag-btn .v-btn__content {
  padding: 0 !important; /* Remove unnecessary padding */
}

.flag-img {
  object-fit: contain; /* Ensures the image retains aspect ratio */
  display: block; /* Prevents inline spacing issues */
  width: 60px !important; /* Ensures consistent width */
  height: 40px !important; /* Ensures consistent height */
}

.profile-btn .v-btn__overlay,
.profile-btn .v-btn__underlay {
  display: none !important;
}

.NavBarTitle {
  display: inline-block;
  width: 200px; /* Set your desired width */
}
</style>
