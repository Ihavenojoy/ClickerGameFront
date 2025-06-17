import { ref, onMounted } from 'vue';
import { getClickData, getStartData } from '~/services/api.js';
import { usePassiveIncomeSocket } from '@/composables/usePassiveIncomeSocket';  // <-- Import WS composable

export function useClickAnimation(userId: number) {
    const duration = 50;
    const displayedCount = ref<number | null>(null);
    const isCrit = ref(false);
    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    async function fetchInitialCount() {
        try {
            const data = await getStartData(userId);
            console.log('Fetched start data:', data);

            if (data && typeof data.Click_Value === 'number') {
                displayedCount.value = data.Click_Value;
            } else {
                console.warn('Start data was missing Click_Value or invalid:', data);
                displayedCount.value = 0; // Set default to avoid being stuck at null
            }
        } catch (error) {
            console.error('Error fetching initial count:', error);
            displayedCount.value = 0; // Critical to avoid infinite loading
        }
    }

    async function fetchNewCount(): Promise<number> {
        try {
            const data = await getClickData(userId);
            if (data?.Crit) {
                isCrit.value = true;
                setTimeout(() => {
                    isCrit.value = false;
                }, 200);
            }
            return data?.Click_Value ?? (displayedCount.value ?? 0);
        } catch (error) {
            console.error('Error fetching new count:', error);
            return displayedCount.value ?? 0;
        }
    }

    function animateUpdate(startCount: number, endCount: number) {
        function animate(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            displayedCount.value = startCount + (endCount - startCount) * progress;

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                displayedCount.value = endCount;
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        }

        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }

        startTime = null;
        animationFrameId = requestAnimationFrame(animate);
    }

    async function fetchAndUpdate() {
        const newCount = await fetchNewCount();
        animateUpdate(displayedCount.value ?? 0, newCount);
    }

    usePassiveIncomeSocket((newCount: number) => {
        animateUpdate(displayedCount.value ?? 0, newCount);
    });


    usePassiveIncomeSocket((newCount: number) => {
        animateUpdate(displayedCount.value ?? 0, newCount);
    });

    return {
        displayedCount,
        isCrit,
        fetchAndUpdate,
        animateUpdate,
    };
}
