import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(Vue3Toastify, {
        autoClose: 2000,
        position: "top-right",
        pauseOnHover: true,
        theme: "colored"
    } as ToastContainerOptions);
})