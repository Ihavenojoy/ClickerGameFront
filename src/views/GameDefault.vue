<template>
  <button
      @click="fetchAndUpdate"
      :class="{ critEffect: isCrit }"
      :style="{ backgroundColor: isCrit ? 'red' : '' }"
  >
    {{ displayedCount !== null ? `Count is: ${Math.trunc(displayedCount)}` : "Loading..." }}
  </button>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getClickData, getStartData } from "../services/api.js";

export default {
  setup() {
    const duration = 50;
    const displayedCount = ref(null);
    const isCrit = ref(false);
    let startTime = null;

    let animationFrameId = null;

    async function fetchInitialCount() {
      try {
        const data = await getStartData(3);
        if (data) {
          displayedCount.value = data.Click_Value ?? 0;
        } else {
          displayedCount.value = 0;
        }
      } catch (error) {
        console.error("Error fetching initial count:", error);
        displayedCount.value = 0;
      }
    }

    async function fetchNewCount() {
      try {
        const data = await getClickData(3);
        if (data) {
          if (data.Crit) {
            isCrit.value = true;
            setTimeout(() => {
              isCrit.value = false;
            }, 200);
          }
          return data.Click_Value;
        }
        return displayedCount.value ?? 0;
      } catch (error) {
        console.error("Error fetching new count:", error);
        return displayedCount.value ?? 0;
      }
    }


    function animateUpdate(startCount, endCount) {
      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        displayedCount.value = startCount + (endCount - startCount) * progress;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          displayedCount.value = endCount;
          cancelAnimationFrame(animationFrameId);
        }
      }

      cancelAnimationFrame(animationFrameId);
      startTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }

    async function fetchAndUpdate() {
      const newCount = await fetchNewCount();
      animateUpdate(displayedCount.value, newCount);
    }

    onMounted(async () => {
      await fetchInitialCount();
    });

    return {
      displayedCount,
      isCrit,
      fetchAndUpdate,
    };
  },
};
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
