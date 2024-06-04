import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";



// esse provider envolve as páginas renderizadas (veja em navigation)
export const AuthProvider = ({ children } : { children: JSX.Element }) => {
    const api = useApi();
    const [user, setUser] = useState<User | null>(null);
    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }
   

    const signin = async (email: string, password: string) => {
        try {
            const data = await api.signin(email, password);
            if(data.user && data.token) {
                setUser(data.user);
                setToken(data.token);
                return true
            }
        } catch (error) {
            console.error("Error during login (Provider):", error);
        }
        return false
    }

    
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {  // esse useEffect serve para checar se há um token no localStorage, valida-lo e manter a sessão desse usuário
        if (!initialized) { // adicionei essa condição por indicação do GPT. Tava dando um problema de loop de renderização infinita. Ficava chamando constantemente o RequireAuth.
            const validateToken = async () => {
                const storageData = localStorage.getItem('authToken');
                if(storageData) {
                    const data = await api.validateToken(storageData);
                    if (data.user) {
                        setUser(data.user)
                    }
                }
                setInitialized(true)
            }
            validateToken();
        }
    }, [api, initialized]);


    const signout = async () => {
        const storageData = localStorage.getItem('authToken');
        if(storageData) {
            await api.logout(storageData);
        }
        setUser(null);
        setToken('');
    }



    return (
        <AuthContext.Provider value={{user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}