import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Product } from "../../types/Product";
import { useTheme } from "../../hooks/useTheme";

interface ProductDisplayProps {
  productId: number;
  truncationN: number;
  truncationD: number;
}



const ProductDisplayCart: React.FC<ProductDisplayProps> = ({ productId, truncationN }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { theme } = useTheme()

  useEffect(() => {
    axiosClient.get(`/api/products/${ productId }`)
    .then(response => setProduct(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, [productId]);


  const navigate = useNavigate();
  function redirect() {
    if (product){
      navigate(`/product/${product.id}`);
    }
  }


  if (product?.id==null) {
    return (
      <div className=" col-span-1 bg-slate-100/90 border-2 border-lime-400 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]">
          <div className="px-1 h-full w-full flex justify-center items-center text-sm  ">
            <p className="text-md font-bold ">Produto não encontrado.</p>
          </div>
    </div>    );
  }



  const truncateCharacters = (description: string, maxChars: number) => {
    if (description.length > maxChars) {
      return description.slice(0, maxChars) + '...'; // Limita a descrição pelo número de caracteres
    }
    return description; // Retorna a descrição completa se estiver dentro do limite de caracteres
  };





  return (
    <div id="caixa completa" className={`  text-black  rounded flex items-center gap-2 pl-2 py-[2px]
    ${theme === 'dark' ? '  text-neutral-200 ' 
    : ''}`}>
      
      <div id="área img" className="basis-1/5 ml-5 h-32 flex justify-center">
        <img id='img produto' className=" object-scale-down max-w-full max-h-full rounded-md" src={product.imageUrl} onClick={() => redirect()}></img>
      </div>

      <div id="nome produto" className="ml-8 text-lg font-semibold tracking-wider" onClick={() => redirect()}>{truncateCharacters(product.name, truncationN)}</div>
    
    </div>
  );
};

export default ProductDisplayCart;
