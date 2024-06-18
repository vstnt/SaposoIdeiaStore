import { createContext, useState, ReactNode } from 'react';


type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};



export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => { // essa função funciona como um botão. "Quando chamada, mude o tema"
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
  
};

