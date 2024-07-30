import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../types/User";
import axiosClient from "../../axiosClient";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseAuth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";


export type AuthContextType = { // type pra o nosso contexto
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    googleSignin: (user: firebase.User) => void
    signout: () => void;
    register: (uid: string|null, source: string, email: string, name: string, password: string | null) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext)



export const AuthProvider = ({ children } : { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null); 
    const [initialized, setInitialized] = useState(false);

    const setAccessToken = (token: string) => { localStorage.setItem('authToken', token) }
    const setRefreshToken = (token: string) => { localStorage.setItem('refreshToken', token) }
    const setTokenOrigin = (tokenOrigin: string) => { localStorage.setItem('tokenOrigin', tokenOrigin) }
   

    // Esse bloco busca recuperar o usuário, seja por token do back-end, seja por meio do firestore. Enfim, ele é responsável pela permanência de usuário.
    useEffect(() => { 
        if (!initialized) {
            const validateToken = async () => { 
                const authToken = localStorage.getItem('authToken');
                const tokenOrigin = localStorage.getItem('tokenOrigin');
                if (authToken && tokenOrigin === 'backend' && authToken !== ''){
                    const response = await axiosClient.post('api/validate')
                    if (response.data.user) {
                        setUser(response.data.user)
                    }
                } else {
                    // Check if the user is logged in via Firebase
                    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
                        if (firebaseUser) {
                            setUser({
                                id: null,
                                firebaseId: firebaseUser.uid,
                                email: firebaseUser.email,
                                name: firebaseUser.displayName || 'Firebase User'
                            });
                        }
                    })
                }
                setInitialized(true)
            }
            validateToken();
        }
    }, [initialized]);



    const signin = async (email: string, password: string) => {
        try {
            const response = await axiosClient.post('api/signin', { email, password });
            if(response.data.user && response.data.token) {
                setUser(response.data.user);
                setAccessToken(response.data.token);
                setRefreshToken(response.data.refreshToken);
                setTokenOrigin('backend')
                return true
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
        return false
    }


    const googleSignin = async (firebaseUser: firebase.User) => {
        try {
            setTokenOrigin('firebase')
            setAccessToken(await firebaseUser.getIdToken())
            setUser({
                id: null,
                firebaseId: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || 'Firebase User'
            });
            await axiosClient.post('api/carts/create', {'uid': firebaseUser.uid} )
        } catch (error) {
            console.error('Google Signin failed:', error);
        }
    };


    const signout = async () => {
        if (localStorage.getItem('tokenOrigin') == 'backend'){
            const refreshToken = localStorage.getItem('refreshToken')
            await axiosClient.post('api/logout', {}, {headers: {'refresh_token': refreshToken}} )
            setUser(null);
            setAccessToken('');
            setRefreshToken('');
            setTokenOrigin('')
        } else if (localStorage.getItem('tokenOrigin') == 'firebase') {
            signOut(firebaseAuth)
            setUser(null);
            setTokenOrigin('')
            setAccessToken('');
        }
    }


    const register = async (uid: string | null, source: string, email: string, name: string, password: string | null) => {
        try {
            await axiosClient.post('api/register', { uid, source, email, fullName: name, password });

                return true
            
            
        } catch (error) {
            console.error("Error during register (useApi):", error);
            return false
        }
        
    }


    return (
        <AuthContext.Provider value={{ user, signin, signout, register, googleSignin }}>
            {children}
        </AuthContext.Provider>
    );
}