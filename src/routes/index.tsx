import { RequireAuth } from "./RequireAuth";
import { RequireNotAuth } from "./RequireNotAuth";

import Home from "../pages/home";
import Login from "../pages/login";
import Products from "../pages/products";
import Register from "../pages/register";
import ProductDetails from "../pages/productDetails";
import UserPreferences from "../pages/userPreferences";
import Cart from "../pages/cart";
import PurchaseCompleted from "../pages/purchaseCompleted";




export const routes = [
    {
        link:'/', 
        component:<Home/>
    },
    {
        link:'/products', 
        component:<Products/>
    },
    {
        link: '/product/:id',
        component:<ProductDetails/>
    },
    {
        link:'/register', 
        component:<RequireNotAuth><Register/></RequireNotAuth>
    },
    {
        link:'/login', 
        component:<RequireNotAuth><Login/></RequireNotAuth>
    },
    {
        link: '/userpreferences',
        component:<RequireAuth><UserPreferences/></RequireAuth>
    },
    {
        link: '/cart',
        component:<RequireAuth><Cart/></RequireAuth>
    },
    {
        link: '/purchasecompleted',
        component:<RequireAuth><PurchaseCompleted/></RequireAuth>
    },
]