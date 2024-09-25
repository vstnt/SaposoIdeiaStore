import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/Auth/AuthContext";
import { CartProvider } from "./context/Cart/CartContext";
import { ThemeProvider } from "./context/Theme/ThemeContext";
import Navbar from "./layout/components/Navbar";
import Footer from "./layout/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { register } from 'swiper/element/bundle'; // Importa a função para registrar os elementos customizados do Swiper. Pelo que entendi é um registro para com o navegador...
register(); // Registra os elementos customizados do Swiper

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Navbar/>
            <ToastContainer
              newestOnTop
            />
            <Routes>
              {routes.map((route) => (
                  <Route key={route.link} element={route.component} path={route.link} />
              ))}
            </Routes>
            <Footer/>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
