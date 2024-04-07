import Home from "../pages/home";
import Login from "../pages/login";
import Products from "../pages/products";
import Register from "../pages/register";

export const routes = [
    {
        link:'/', 
        component:<Home/>
    },
    {
        link:'/register', 
        component:<Register/>
    },
    {
        link:'/products', 
        component:<Products/>
    },
    {
        link:'/login', 
        component:<Login/>
    },
]