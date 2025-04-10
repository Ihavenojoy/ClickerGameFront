import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useNavbar = () => {
    const router = useRouter();



    const navigationItems = ref([
        { to: ('/'), label: ('Home') },
        { to: ('/product/dashboard'), label: ('Products') },
        { to: ('/quotations/dashboard'), label: ('Quotations') },
    ]);

    const signIn = () => {
        //signIn function
    };

    const signOut = () => {
        //signOut function
    };



    return {
        navigationItems,
        signIn,
        signOut,
    };
};
