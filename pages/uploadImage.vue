<script setup lang="ts">
import { ref } from 'vue';
import { handleuserUpload } from "~/services/image";

const userId = 3;
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('');

const triggerUpload = () => {
  handleuserUpload(userId, fileInput, fileName);
};

</script>

<template>
  <input type="file" ref="fileInput" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif" />
  <input type="text" v-model="fileName" placeholder="Enter filename" />
  <button @click="triggerUpload">Upload</button>
</template>

<style scoped>

</style>