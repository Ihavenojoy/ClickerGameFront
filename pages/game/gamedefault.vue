<template>
  <button
      @click="fetchAndUpdate"
      :class="{ critEffect: isCrit }"
      :style="{ backgroundColor: isCrit ? 'red' : '' }"
  >
    {{ displayedCount !== null ? `Count is: ${Math.trunc(displayedCount)}` : "Loading..." }}
  </button>
</template>

<script setup lang="ts">
import { useClickAnimation } from '@/composables/ClickAnimations';

const { displayedCount, isCrit, fetchAndUpdate } = useClickAnimation(3);
</script>

<style>
button {
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  padding: 10px 20px;
  font-size: 16px;
}

@keyframes critAnimation {
  0% { transform: scale(1.3) rotate(-25deg); }
  50% { transform: scale(0.8) rotate(25deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.critEffect {
  animation: critAnimation 0.2s ease-in-out;
}

</style>
