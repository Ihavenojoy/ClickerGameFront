<template>
  <div class="button-wrapper">
    <p v-if="displayedCount !== null" :class="['count-text', { critText: isCrit }]">
      Count is: {{ Math.trunc(displayedCount) }}
    </p>
    <p v-else>Loading...</p>

    <button
        class="ClickButton"
        @click="fetchAndUpdate"
        :class="{ critEffect: isCrit }"
        :style="{
          backgroundImage: imageUrl ? `url('${imageUrl}')` : '',
          backgroundSize: 'cover',
          backgroundColor: !imageUrl && isCrit ? 'red' : '#f0f0f0',
          color: imageUrl ? 'transparent' : '#000',
        }"
    >
      <span
          class="button-text"
          :class="{ redText: isCrit }"
          v-if="!imageUrl"
      >
        {{ displayedCount !== null ? `Count is: ${Math.trunc(displayedCount)}` : "Loading..." }}
      </span>
    </button>

    <button @click="openUpdateModal">Select Image</button>

    <!-- Use only this component as modal -->
    <ImageSelectionModal
        v-if="isModalOpen"
        :user-id="userId"
        @select="selectImage"
        @cancel="closeModal"
    />
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserImage } from '@/services/image';
import { useClickAnimation } from '@/composables/ClickAnimations';
import { useClickUpdate } from '@/composables/useClickUpdate';
import ImageSelectionModal from '@/components/ImageSelector.vue';
import { fileName } from '@/composables/useSharedFileName';


const userId = 3;
const fileInput = ref<HTMLInputElement | null>(null);
const isModalOpen = ref(false);
const selectedImageUrl = ref<string | null>(null);
const selectedImageName = ref<string | null>(null);

const { displayedCount, isCrit, fetchAndUpdate, animateUpdate } = useClickAnimation(userId);
const { imageUrl, loadImage, loading, imageUrls, imageNames } = useUserImage();
const { setUpdateHandler } = useClickUpdate();



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
  selectedImageUrl.value = url;
  selectedImageName.value = imageName;

  console.log("Selected Image URL:", selectedImageUrl.value);
  console.log("Selected Image Name:", selectedImageName.value);

  closeModal();
};

// Load the image on component mount
onMounted(() => {
  loadImage(userId, fileName.value);
});

function updateUserImage(param: () => void) {
  loadImage(userId, fileName.value);
}

watch(fileName, () => {
  updateUserImage(() => {});
});

setUpdateHandler((value) => {
  animateUpdate(displayedCount.value ?? 0, (displayedCount.value ?? 0) + value);
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
