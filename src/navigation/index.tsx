import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { AuthProvider } from "../context/Auth/AuthProvider";
import { CartProvider } from "../context/Cart/CartContext";

export default function Navigation() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {routes.map((route) => (
                <Route key={route.link} element={route.component} path={route.link} />
            ))}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
