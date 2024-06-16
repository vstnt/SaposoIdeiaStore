import { createContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '../../api/axiosClient';


interface CartItem {
  productId: number;
  quantity: number;
  price: number
}

interface Cart {
  total: number;
  items: CartItem[];
}

export interface CartContextData {
  cart: Cart | null;
  updateItem: (product_id: number, quantity: number) => any;
  removeItem: (item_id: number) => void;
  loadCart: () => void;
  clearCart: () => void;
}


export const CartContext = createContext<CartContextData>({} as CartContextData);



export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);



  const loadCart = async () => {
    try {
      const response = await axiosClient.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosClient.get('/api/cart/clear')
    } catch (error) {
      console.error('Erro ao limpar carrinho: ', error);
    }
  }
  
  const updateItem = async (item_id: number, quantity: number) => {
    try {
      const response = await axiosClient.post('/api/cart/updateitem', {product_id: item_id, quantity: quantity})
      return response.data.message
    } catch (error) {
      console.error('Erro ao alterar quantidade de do item: ', error);
    }
  }

  const removeItem = async (item_id: number) => {
    try {
      await axiosClient.post('/api/cart/deleteitem', {product_id: item_id})
    } catch (error) {
      console.error('Erro ao remover item do carrinho: ', error);
    }
  }



  useEffect(() => {
    loadCart();
  }, [localStorage.getItem('authToken'), cart, updateItem]);

  
  return (
    <CartContext.Provider value={{ cart, loadCart, removeItem, clearCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

