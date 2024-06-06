import React from 'react';
import { useCart } from '../../context/Cart/useCart';
import { useAuth } from '../../context/Auth/useAuth';

interface AddToCartButtonProps {
  product_id: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product_id }) => {
  const { addItem } = useCart();
  const user = useAuth();

  const handleAddToCart = () => {
    if (user) {
      addItem(product_id, 1); // Adiciona um item com quantidade 1
    } else {
      alert('Você precisa estar logado para adicionar itens ao carrinho');
    }
  };

  return <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>;
};

export default AddToCartButton;