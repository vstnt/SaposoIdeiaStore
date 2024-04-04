import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../routes";

export default function Navigation() {
    return (
      <BrowserRouter>
        <Routes>
            {routes.map((route) => (
                <Route element={route.component} index path={route.link}/>
            ))}
        </Routes>
      </BrowserRouter>
    )
  }
  