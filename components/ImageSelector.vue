<template>
  <teleport to="body">
    <div
        v-if="showModal"
        class="image-selector-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="imageSelectorTitle"
    >
      <div class="image-selector-modal">
        <h3 id="imageSelectorTitle">Select an Image</h3>

        <div v-if="loading" class="info">Loading images...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="images.length === 0" class="info">No images found.</div>
        <div v-else class="image-grid">
          <div
              v-for="(img, index) in images"
              :key="index"
              class="image-card"
              tabindex="0"
              role="button"
              :aria-label="img.name || 'Unnamed image'"
              @click="selectImage(img.url, img.name)"
              @keydown.enter.prevent="selectImage(img.url, img.name)"
              @keydown.space.prevent="selectImage(img.url, img.name)"
          >
            <img :src="img.url" :alt="img.name || 'User image'" />
            <span class="filename">{{ img.name }}</span>
          </div>
        </div>

        <button class="cancel-button" @click="cancel">Cancel</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { loadUserImages } from '@/services/image'
import { fileName } from '@/composables/useSharedFileName'

const props = defineProps<{ userId: number }>()
const emit = defineEmits<{
  (e: 'select', url: string, filename: string): void
  (e: 'cancel'): void
}>()

const showModal = ref(true)
const loading = ref(false)
const error = ref<string | null>(null)
const images = ref<{ name: string; url: string }[]>([])

function cleanupBlobUrls() {
  images.value.forEach((img) => URL.revokeObjectURL(img.url))
  images.value = []
}

function selectImage(url: string, filename: string) {
  emit('select', url, filename)
  fileName.value = filename
  showModal.value = false
  cleanupBlobUrls()
}

function cancel() {
  emit('cancel')
  showModal.value = false
  cleanupBlobUrls()
}

async function fetchImages(userId: number) {
  loading.value = true;
  error.value = null;

  try {
    const rawImages = await loadUserImages(userId);

    images.value = rawImages.map(img => ({
      name: img.name,
      url: `data:image/png;base64,${img.imageData}`
    }));
  } catch (err: any) {
    error.value = err.message || 'Unknown error';
  } finally {
    loading.value = false;
  }
}


onMounted(() => fetchImages(props.userId))
onUnmounted(cleanupBlobUrls)
</script>

<style scoped>
.image-selector-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
}

.image-selector-modal {
  background: #fff;
  padding: 1.5rem;
  max-width: 90%;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

.image-card {
  width: 100px;
  cursor: pointer;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0.25rem;
  transition: all 0.2s ease-in-out;
}

.image-card:hover,
.image-card:focus {
  border-color: #007bff;
  background-color: #eef5ff;
}

.image-card img {
  max-width: 100%;
  max-height: 80px;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
}

.filename {
  margin-top: 4px;
  font-size: 0.75rem;
  color: #333;
  word-break: break-word;
}

.cancel-button {
  margin-top: 1rem;
  background: #f0f0f0;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.cancel-button:hover {
  background: #e0e0e0;
}

.info,
.error {
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
  color: #555;
}

.error {
  color: red;
}
</style>
