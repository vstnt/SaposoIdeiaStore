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


        const [initialized, setInitialized] = useState(false);
    useEffect(() => {  // esse useEffect serve para checar se há um token no localStorage, valida-lo e manter a sessão desse usuário
        if (!initialized) { // adicionei essa condição por indicação do GPT. Tava dando um problema de loop de renderização
            // infinita. Ficava chamando constantemente o RequireAuth. Não entendi bem o pq e nem exatamente pq isso resolveu... 
            //Agora voltei a ver isso, não lembrava, mas acho que tudo que tem esse "initialized" foi a solução do gpt. 
            // Lembrando que o problema surgiu na implementação instruida pelo video que assisti (aquele que a dé tinha mandado, e não por criação do gpt)
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
        
        const data = await api.signin(email, password);

        if(data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true
        }
        return false;
    }


    const signout = async () => {
        setUser(null);
        setToken('');
        await api.logout();
    }



    return (
        <AuthContext.Provider value={{user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}