import { createContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '../../api/axiosClient';


interface Cart {
  total: number;
  items: CartItem[];
}

interface CartItem {
  productId: number;
  quantity: number;
  price: number
}

export interface CartContextData {
  cart: Cart | null;
  //addItem: (product_id: number, quantity: number) => void;
  //removeItem: (item_id: number) => void;
  loadCart: () => void;
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

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

