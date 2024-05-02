import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";




export const AuthProvider = ({ children } : { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
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


    const signin = async (email: string, password: string) => {
        console.log("signin chamado")
        const data = await api.signin(email, password);
        console.log("valor de data criado com api.signin")

        if(data.user && data.token) {
            console.log("data.user e data.token existem")
            setUser(data.user);
            setToken(data.token);
            console.log("setUser e setToken aplicados")
            return true
        }
        return false;
    }


    const signout = async () => {
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}