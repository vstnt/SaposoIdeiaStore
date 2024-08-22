import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Product } from "../../types/Product";
import { useTheme } from '../../context/Theme/ThemeContext';
import { ProductDisplayProps } from "../../types/ProductDisplayProps";


const ProductDisplayCart: React.FC<ProductDisplayProps> = ({ productId }) => {
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
    <div id="caixa completa" className={`justify-between md:justify-start text-black flex h-full md:items-center md:gap-2 md:pl-2 md:py-[2px] 
    ${theme === 'dark' ? '  text-neutral-200 ' : ''}`}>
      
      <div id="área img" className=" md:ml-5 md:h-32 flex items-center justify-center w-[37%] md:w-[20%]">
        {product?.id == null ? 
            <img id='img not found' className="cursor-pointer object-scale-down max-w-full max-h-full rounded-md" src='/assets/notFound.jpg'></img>
          : <img id='img produto' className="cursor-pointer object-scale-down max-w-full max-h-full rounded-md" src={product.imageUrl} onClick={() => redirect()}></img> 
        }
      </div>
      
      {product?.id == null ?
        <div id="nome produto" className=" w-[60%] cursor-pointer md:ml-8 md:text-lg font-semibold tracking-wider">Produto não encontrado</div>
      : <div id="nome produto" className=" w-[60%] mt-5 md:mt-0 cursor-pointer md:ml-8 md:text-lg font-semibold tracking-wider" onClick={() => redirect()}>{product.name}</div>
      }

    </div>
  );
};

export default ProductDisplayCart;