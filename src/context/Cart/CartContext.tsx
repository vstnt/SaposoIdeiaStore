import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '../../axiosClient';
import { useLocation } from 'react-router-dom';
import { Cart } from '../../types/Cart';
import { apiPath } from "../../developmentOrProductionVariables";



export interface CartContextData {
  cart: Cart | null;
  // loadCart: () => void;
  clearCart: () => void;
  updateItem: (product_id: number, quantity: number) => any;
  removeItem: (item_id: number) => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);
export const useCart = () => {
  return useContext(CartContext)
}


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const location = useLocation();
  const [cartFetched, setCartFetched] = useState(false);

  const loadCart = async () => {
    try {
      const response = await axiosClient.get(apiPath.getCart);
      setCart(response.data);
    } catch (error) {
      console.error('Erro ao recuperar carrinho:', error);
    } finally {
      setCartFetched(true);
    }
  }

  const updateItem = async (item_id: number, quantity: number) => {
    try {
      const response = await axiosClient.post(apiPath.updateItem, {product_id: item_id, quantity: quantity})
      setCart(response.data)
      console.log(response.data)
      return ('Item atualizado')
    } catch (error) {
      console.error('Erro ao alterar quantidade do item: ', error);
    }
  }

  const removeItem = async (item_id: number) => {
    try {
      await axiosClient.post(apiPath.deleteItem, {product_id: item_id})
    } catch (error) {
      console.error('Erro ao remover item do carrinho: ', error);
    }
    setCartFetched(false)
  }

  const clearCart = async () => {
    try {
      await axiosClient.get(apiPath.clearCart)
    } catch (error) {
      console.error('Erro ao limpar carrinho: ', error);
    }
    setCartFetched(false)
  }

   
  useEffect(() => {
    if (location.pathname === '/cart' || location.pathname === '/') {
      loadCart();
    }
  }, [cartFetched, location])

  
  return (
    <CartContext.Provider value={{ cart, removeItem, clearCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};