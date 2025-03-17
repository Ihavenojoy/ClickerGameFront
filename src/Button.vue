<template>
  <button @click="increment">Count is: {{ Math.trunc(displayedCount) }}</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const incrementAmount = 1000000; // Amount to increase per click
    const duration = 500; // Duration in milliseconds
    const count = ref(0); // Actual count
    const displayedCount = ref(0); // Count displayed to the user
    let startTime = null; // Start time of the animation
    let animationFrameId = null; // To store the requestAnimationFrame ID

    function increment() {
      const startCount = displayedCount.value;
      const endCount = count.value + incrementAmount;
      count.value = endCount; // Update the actual count
      startTime = performance.now(); // Reset the start time

      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 0.2);
        displayedCount.value = startCount + (endCount - startCount) * progress;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          displayedCount.value = endCount; // Ensure it reaches the exact target
          cancelAnimationFrame(animationFrameId); // Cancel the animation frame
        }
      }

      cancelAnimationFrame(animationFrameId); // Cancel any ongoing animation
      animationFrameId = requestAnimationFrame(animate); // Start new animation
    }

    return {
      displayedCount,
      increment,
    };
  },
};
</script>