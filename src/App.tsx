import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./navigation";
import { initializeDatabase } from "./services/localStorageServices";
import { useEffect } from "react";

// Importa a função para registrar os elementos customizados do Swiper
import { register } from 'swiper/element/bundle';
// Registra os elementos customizados do Swiper
register();


export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <ThemeProvider>
      <Navigation/>
    </ThemeProvider>
  )
}
