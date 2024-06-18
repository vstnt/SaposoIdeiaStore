import { useContext } from 'react';
import { CartContext } from '../context/Cart/CartContext';


export const useCart = () => {
  return useContext(CartContext)
}
