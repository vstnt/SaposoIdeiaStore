import { createContext } from "react";
import { useContext } from 'react';
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";


export type AuthContextType = { // type pra o nosso contexto
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    register: (email: string, name: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => {
    return useContext(AuthContext)
}



// lembrando que, dado que o axios client já envia sempre o token, caso exista, 
// não precisamos enviar o token diretamente via validateToken ou logout
export const AuthProvider = ({ children } : { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null); 
    const setAccessToken = (token: string) => { localStorage.setItem('authToken', token) }
    const setRefreshToken = (token: string) => { localStorage.setItem('refreshToken', token) }
   

    const [initialized, setInitialized] = useState(false);
    useEffect(() => {  // esse useEffect serve para checar se há um token no localStorage, valida-lo e manter a sessão desse usuário
        if (!initialized) { // adicionei essa condição por indicação do GPT. Tava dando um problema de loop de renderização infinita. Ficava chamando constantemente o RequireAuth (que agr está na pasta routes).
            const validateToken = async () => {
                const response = await axiosClient.post('api/validate')
                if (response.data.user) {
                    setUser(response.data.user)
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
                return true
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
        return false
    }


    const signout = async () => {
        const refreshToken = localStorage.getItem('refreshToken')
        await axiosClient.post('api/logout', {}, {headers: {'refresh_token': refreshToken}} )
        setUser(null);
        setAccessToken('');
        setRefreshToken('');
    }


    const register = async (email: string, name: string, password: string) => {
        try {
            const response = await axiosClient.post('api/register', { email, fullName: name, password });
            if (response.data) {
                return true
            }
            return false
        } catch (error) {
            console.error("Error during register (useApi):", error);
            throw error; // Propaga o erro para ser capturado pelo chamador
        }
        
    }


    return (
        <AuthContext.Provider value={{user, signin, signout, register }}>
            {children}
        </AuthContext.Provider>
    );
}