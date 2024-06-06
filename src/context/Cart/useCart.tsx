import { useContext } from 'react';
import { CartContextData, CartContext } from './CartContext';


export const useCart = (): CartContextData => {
  return useContext(CartContext);
};
