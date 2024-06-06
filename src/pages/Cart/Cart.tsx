import React from 'react';
import { useCart } from '../../context/Cart/useCart';
import Navbar from '../../layout/components/Navbar';
import Footer from '../../layout/components/Footer';

const Cart: React.FC = () => {
  const { items, removeItem, clearCart } = useCart();



  return (
    <>
        <Navbar/>
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Carrinho de Compras</h2>
        {items.length === 0 ? (
            <div className="flex justify-center items-center h-32">
            <p className="text-lg text-gray-500">Seu carrinho está vazio</p>
            </div>
        ) : (
            <ul className="space-y-4">
            {items.map((item) => (
                <li key={item.product_id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <div>
                    <p className="text-lg font-medium">Produto ID: {item.product_id}</p>
                    <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                </div>
                <button 
                    onClick={() => removeItem(item.product_id)} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Remover
                </button>
                </li>
            ))}
            </ul>
        )}
        {items.length > 0 && (
            <div className="mt-8 flex justify-end">
            <button 
                onClick={clearCart} 
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Limpar Carrinho
            </button>
            </div>
        )}
        </div>
        <Footer/>    
    </>

  );
};

export default Cart;