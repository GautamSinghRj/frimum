import { auth, provider } from './firebase';
import { signInWithRedirect } from 'firebase/auth';

export const loginWithGoogle = async () => {
    try {
        await signInWithRedirect(auth, provider); 
    } catch (error) {
        console.error("Error during redirect: ", error);
    }
};
