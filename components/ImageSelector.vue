<template>
  <div class="update-overlay" v-if="showModal">
    <div class="modal">
      <h3>Select an Image to Update</h3>
      <div v-if="loading">Loading images...</div>
      <div v-else class="image-list">
        <div
            v-for="(url, index) in imageUrls"
            :key="index"
            class="img-option"
        >
          <img :src="url" alt="User image" @click="selectImage(url, imageNames[index])" />
        </div>
      </div>
      <button @click="cancelUpdate" class="cancel-button">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserImage } from '@/services/image';

const props = defineProps<{ userId: number }>();
const emit = defineEmits<{
  (e: 'select', url: string, filename: string): void;
  (e: 'cancel'): void;
}>();

// Reactive state
const showModal = ref(true);
const {
  loadUserImages,
  loading,
  imageUrls,
  imageNames,
} = useUserImage();

// Load images on component mount
onMounted(() => {
  loadUserImages(props.userId);
});

// Select an image and pass the URL and its filename back to the parent component
const selectImage = (url: string, filename: string) => {
  emit('select', url, filename);
  showModal.value = false;  // Close the modal after selection
};

// Cancel the update and close the modal
const cancelUpdate = () => {
  emit('cancel');
  showModal.value = false;
};
</script>

<style scoped>
.update-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.image-list {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.img-option img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s;
}

.img-option img:hover {
  border-color: #2196f3;
}

.cancel-button {
  margin-top: 20px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
