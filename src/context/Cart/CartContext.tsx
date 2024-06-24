import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '../../axiosClient';
import { useLocation } from 'react-router-dom';
import { Cart } from '../../types/Cart';


export interface CartContextData {
  cart: Cart | null;
  loadCart: () => void;
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

  // useEffect pra carregar o carrinho no contexto.
  /* aqui sinto que fiz um chuncho. Se deixo a chamada de loadCart apenas quando no caminho /cart,
   isso leva a um leak de dados do usuário anterior. Então adicionei a chamada para a home também, e isso resolveu.
   Como seria um melhor jeito de lidar com esse problema? Perguntar pra a dé.
   Talvez algo como realizar a chamada quando do login de um usuário, e tbm limpar esses dados quando do logout.
   Porém, não entendo ainda onde esses dados ficam salvos após o logout. */
  useEffect(() => {
    if (location.pathname === '/cart' || location.pathname === '/' ) { 
      loadCart();
    }
  }, [location, cart]);


  const loadCart = async () => {
    try {
      const response = await axiosClient.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Erro ao recuperar carrinho:', error);
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
      console.error('Erro ao alterar quantidade do item: ', error);
    }
  }


  const removeItem = async (item_id: number) => {
    try {
      await axiosClient.post('/api/cart/deleteitem', {product_id: item_id})
    } catch (error) {
      console.error('Erro ao remover item do carrinho: ', error);
    }
  }


  return (
    <CartContext.Provider value={{ cart, loadCart, removeItem, clearCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};