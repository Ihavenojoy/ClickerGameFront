<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useToastStore } from '~/store/toast'

const toastStore = useToastStore()
const { toastMessage, toastType, toastDate } = storeToRefs(toastStore)

const showToast = (() => {
    if (toastMessage.value && toastType.value) {
        switch (toastType.value) {
            case 'error':
                toast.error(toastMessage.value)
                break
            case 'info':
                toast.info(toastMessage.value)
                break
            case 'warning':
                toast.warning(toastMessage.value)
                break
            default:
                toast.success(toastMessage.value)
        }
    }
})

watch(() => toastDate.value, (newDate, oldDate) => {
    setTimeout(() => {
        showToast()
    }, 100)
})
</script>

<template></template>