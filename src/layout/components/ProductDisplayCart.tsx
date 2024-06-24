import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Product } from "../../types/Product";
import { useTheme } from '../../context/Theme/ThemeContext';
import { ProductDisplayProps } from "../../types/ProductDisplayProps";
import { truncateCharacters } from "../../helpers/truncate";


const ProductDisplayCart: React.FC<ProductDisplayProps> = ({ productId, truncationName }) => {
  const { theme } = useTheme()
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    axiosClient.get(`/api/products/${ productId }`)
    .then(response => setProduct(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, [productId]);


  function redirect() {
    if (product){
      navigate(`/product/${product.id}`);
    }
  }



  return (
    <div id="caixa completa" className={`  text-black  rounded flex items-center gap-2 pl-2 py-[2px]
    ${theme === 'dark' ? '  text-neutral-200 ' : ''}`}>
      
      <div id="área img" className="basis-1/5 ml-5 h-32 flex justify-center">
        {product?.id == null ? 
            <img id='img not found' className="cursor-pointer object-scale-down max-w-full max-h-full rounded-md" src='/assets/notFound.jpg'></img>
          : <img id='img produto' className="cursor-pointer object-scale-down max-w-full max-h-full rounded-md" src={product.imageUrl} onClick={() => redirect()}></img> 
        }
      </div>
      
      {product?.id == null ?
        <div id="nome produto" className="cursor-pointer ml-8 text-lg font-semibold tracking-wider">Produto não encontrado</div>
      : <div id="nome produto" className="cursor-pointer ml-8 text-lg font-semibold tracking-wider" onClick={() => redirect()}>{truncateCharacters(product.name, truncationName)}</div>
      }

    </div>
  );
};

export default ProductDisplayCart;