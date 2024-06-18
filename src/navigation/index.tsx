import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { AuthProvider } from "../context/Auth/AuthContext";
import { CartProvider } from "../context/Cart/CartContext";
import { ThemeProvider } from "../context/Theme/ThemeContext";
import Navbar from "../layout/components/Navbar";
import Footer from "../layout/components/Footer";

// decidi fazer o envelopamento dos contextos aqui. Me parece que também funcionaria fazer em App.tsx. Porém, a navbar só funcionou
// aqui, creio que por precisar do router para o uso de links. Então decidi que tudo ia ficar aqui.

export default function Navigation() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Navbar/>
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
  );
}
