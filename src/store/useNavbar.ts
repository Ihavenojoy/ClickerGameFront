// src/store/useNavbar.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export const useNavbar = defineStore('navbar', () => {
    const router = useRouter();

    // Navigation items
    const navigationItems = ref([
        { to: '/', label: 'Home' },
        { to: '/GameDefault', label: 'Game' },
    ]);

    // Sign-in function
    const signIn = () => {
        router.push('/auth/login');
    };

    // Sign-out function
    const signOut = () => {
        router.push('/auth/login');
    };

    return {
        navigationItems,
        signIn,
        signOut,
    };
});
