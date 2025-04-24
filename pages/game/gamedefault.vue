<template>
  <div class="button-wrapper">
    <p
        v-if="displayedCount !== null"
        :class="['count-text', { critText: isCrit }]">
      Count is: {{ Math.trunc(displayedCount) }}
    </p>

    <button
        class="ClickButton"
        @click="fetchAndUpdate"
        :class="{ critEffect: isCrit }"
        :style="{
        backgroundImage: imageUrl ? `url('${imageUrl}')` : '',
        backgroundSize: 'cover',
        backgroundColor: !imageUrl && isCrit ? 'red' : '#f0f0f0',
        color: imageUrl ? 'transparent' : '#000',
      }">
      <span
          class="button-text"
          :class="{ redText: isCrit }"
          v-if="!imageUrl">
        {{ displayedCount !== null ? `Count is: ${Math.trunc(displayedCount)}` : "Loading..." }}
      </span>
    </button>

    <!-- Button to open the modal -->
    <button @click="openUpdateModal">Select Image</button>

    <!-- Modal (Overlay) to display images -->
    <div class="overlay" v-if="isModalOpen">
      <div class="modal">
        <h3>Select an Image</h3>
        <div v-if="loading">Loading images...</div>
        <div v-else class="image-list">
          <div
              v-for="(url, index) in imageUrls"
              :key="index"
              class="img-option">
            <img :src="url" alt="User image" @click="selectImage(url, imageNames[index])" />
          </div>
        </div>
        <button @click="closeModal" class="cancel-button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useClickAnimation } from '@/composables/ClickAnimations';
import { useUserImage } from '@/services/image';

const userId = 3;
const fileName = ref('Test');
const fileInput = ref<HTMLInputElement | null>(null);
const isModalOpen = ref(false);
const selectedImageUrl = ref<string | null>(null);
const selectedImageName = ref<string | null>(null);

const { displayedCount, isCrit, fetchAndUpdate } = useClickAnimation(userId);
const {
  imageUrl,
  loadImage,
  loading,
  imageUrls,
  imageNames,
} = useUserImage();

// Open the modal
const openUpdateModal = () => {
  isModalOpen.value = true;
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Handle the image selection
const selectImage = (url: string, imageName: string) => {
  // Store the selected image URL and name
  selectedImageUrl.value = url;
  selectedImageName.value = imageName;

  // You can use this information to update your UI or send it to a parent component
  console.log("Selected Image URL:", selectedImageUrl.value);
  console.log("Selected Image Name:", selectedImageName.value);

  // Close the modal after selection
  closeModal();
};

// Load the image on component mount (optional, depending on your use case)
onMounted(() => {
  loadImage(userId, fileName.value);
});
</script>

<style scoped>
/* Styling for modal */
.overlay {
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
