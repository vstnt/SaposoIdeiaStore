import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';


export const useTheme = () => {  // useTheme é um hook personalizado! Ele retorna o contexto (o tema e o toggleTheme para alterá-lo)
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
