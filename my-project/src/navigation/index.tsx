import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { AuthProvider } from "../context/Auth/AuthProvider";

export default function Navigation() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routes.map((route) => (
              <Route key={route.link} element={route.component} path={route.link} />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
