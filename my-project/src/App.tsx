import Navigation from "./navigation";
import { initializeDatabase } from "./services/localStorageServices";
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Navigation/>
  )
}
