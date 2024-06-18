import { useContext } from 'react';
import { ThemeContext } from '../context/Theme/ThemeContext';


// nesse hook aqui não consegui só fazer o retorno direto, como nos outros. Pq? creio que é pelo tipo definido no outro. Talvez se eu criar a permanencia do tema com localstorage, conseguirei resolver isso.
export const useTheme = () => {  // useTheme é um hook personalizado! Ele retorna o contexto (o tema e o toggleTheme para alterá-lo)
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
