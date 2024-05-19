import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./navigation";
import { initializeDatabase } from "./services/localStorageServices";
import { useEffect } from "react";


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
