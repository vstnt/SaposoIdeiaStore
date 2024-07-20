import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null!);
export function useAuth2() {
    return useContext(AuthContext);
}

export function AuthProvider({children}: { children: JSX.Element }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // true significa que nosso código está tentando carregar qual é o estado de auth atual do usuário em nosso projeto

    useEffect(() =>{ // nos subescreve no authStateChanged. Prove uma função callback que será chamada quando recebermos qualquer imformação de usuário
        const unsubscribe = onAuthStateChanged(firebaseAuth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser(user) {
        if(user) {
            setCurrentUser({ ...user })
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}