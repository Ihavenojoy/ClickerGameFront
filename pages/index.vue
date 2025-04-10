<script setup lang="ts">
import { onMounted } from 'vue'
import { navigateTo } from '#app'
onMounted(() => {
  setTimeout(() => {
    navigateTo('/Game/GameDefault')
  }, 1000) // Optional delay to show the spinner (1 second)
})
</script>

<template>
  <div class="loading-container">
    <v-progress-circular
        indeterminate
        color="primary"
        size="64"
    />
    <p>Redirecting to your game...</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
  font-size: 1.2rem;
  color: #1976d2;
}
</style>