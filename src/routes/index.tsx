import { RequireAuth } from "../context/Auth/RequireAuth";
import { RequireNotAuth } from "../context/Auth/RequireNotAuth";
import Home from "../pages/home";
import Login from "../pages/login";
import Products from "../pages/products";
import Register from "../pages/register";
import ProductDetails from "../pages/productDetails";
import UserPreferences from "../pages/userPreferences";
import Cart from "../pages/Cart/Cart";




export const routes = [
    {
        link:'/', 
        component:<Home/>
    },
    {
        link:'/register', 
        component:<RequireNotAuth><Register/></RequireNotAuth>
    },
    {
        link:'/products', 
        component:<Products/>
    },
    {
        link:'/login', 
        component:<RequireNotAuth><Login/></RequireNotAuth>
    },
    {
        link: '/product/:id',
        component:<ProductDetails/>
    },
    {
        link: '/userpreferences',
        component:<RequireAuth><UserPreferences/></RequireAuth>
    },
    {
        link: '/cart',
        component:<RequireAuth><Cart/></RequireAuth>
    }
]