import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useNavbar = () => {
    const router = useRouter();


    const navigationItems = ref([
        { to: ('/game/gamedefault'), label: ('game') },
        { to: ('/uploadimage'), label: ('image') },
    ]);


    const signIn = () => {
        router.push('/');
    };

    const signOut = () => {
        router.push('/');
    };

    return {
        navigationItems,
        signIn,
        signOut,
    };
};
