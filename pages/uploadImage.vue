<script setup lang="ts">
import { ref } from 'vue';
import { useUserImage } from "~/services/image";

const {
  imageUrl,
  loadImage,
  handleuserUpload,
  loading,
  error,
} = useUserImage();


const userId = 3;
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('Test');
const onUpload = () => handleuserUpload(userId, fileInput, fileName);
const onLoad = () => {
  console.log('onLoad triggered'); // Debugging log
  loadImage(userId, fileName.value);
};

const triggerUpload = () => {
  handleuserUpload(userId, fileInput, fileName);
};

</script>

<template>
  <input type="file" ref="fileInput" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"/>
  <input v-model="fileName" placeholder="Filename" />
  <button @click="onUpload">Upload</button>
  <button @click="onLoad">Load Image</button>

  <p v-if="loading">Loading...</p>
  <p v-if="error">{{ error }}</p>
  <img v-if="imageUrl" :src="imageUrl" />
</template>

<style>

</style>