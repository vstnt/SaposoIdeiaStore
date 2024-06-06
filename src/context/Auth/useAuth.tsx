import { useContext } from 'react';
import { AuthContext } from './AuthContext';


export const useAuth = () => {  // useTheme é um hook personalizado! Ele retorna o contexto (o tema e o toggleTheme para alterá-lo)
    const context = useContext(AuthContext);
    return context;
};
