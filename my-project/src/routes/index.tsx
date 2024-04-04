import Home from "../pages/home";
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
]