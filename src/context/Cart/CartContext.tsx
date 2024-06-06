import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../Auth/useAuth'; // Supondo que você tenha um contexto de autenticação



interface CartItem {
  product_id: number;
  quantity: number;
}

export interface CartContextData {
  items: CartItem[];
  addItem: (product_id: number, quantity: number) => void;
  removeItem: (product_id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);



export const CartProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuth(); // Para verificar se o usuário está autenticado
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } else {
      localStorage.removeItem('cartItems');
      setItems([]);
    }
  }, [items, user]);

  const addItem = (product_id: number, quantity: number) => {
    setItems((prevItems) => [...prevItems, { product_id, quantity }]);
  };

  const removeItem = (product_id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.product_id !== product_id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

