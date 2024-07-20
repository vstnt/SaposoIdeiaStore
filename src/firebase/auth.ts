import { firebaseAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup/* , sendPasswordResetEmail, updatePassword, sendEmailVerification */ } from "firebase/auth";

// me parece que aqui fazemos uso dos métodos do auth do firebase.

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider)
    // result.user pode ser usado aqui pra salvar o usuário na firestore, por exemplo 
    return result
};

export const doSignOut = () => {
    return firebaseAuth.signOut();
}



// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };
// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };
// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };