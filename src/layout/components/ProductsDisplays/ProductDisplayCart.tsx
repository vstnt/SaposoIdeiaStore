import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import { Product } from "../../../types/Product";
import { useTheme } from '../../../context/Theme/ThemeContext';
import { ProductDisplayProps } from "../../../types/ProductDisplayProps";


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
    <div id="caixa completa" className={`flex py-2 justify-start md:items-center text-black h-full  
    ${theme === 'dark' ? '  text-neutral-200 ' : ''}`}>
      
      <div id="área img" 
      className={` rounded p-[3px] ml-2 flex items-center justify-center max-h-14 w-[35%] max-w-[120px]  
        ${theme=='dark'? 'bg-slate-900/70 ':'bg-slate-100/60'}`}>
        {product?.id == null ? 
            <img id='img not found' className="cursor-pointer max-w-full max-h-full rounded-md" src='/assets/notFound.jpg'></img>
          : <img id='img produto' className="cursor-pointer max-h-12 rounded-md" src={product.imageUrl} onClick={() => redirect()}></img> 
        }
      </div>
      
      <div title='nome produto' className="ml-[2vw] max-w-[44vw] italic">
        {product?.id == null ?
          <div id="nome produto" className="cursor-pointer md:text-lg font-semibold tracking-wider">Produto não encontrado</div>
        : <div id="nome produto" onClick={() => redirect()}
          className={`mt-4 cursor-pointer  font-semibold line-clamp-2
            ${theme=='dark'? 'text-emerald-400 ':'text-slate-800'}`}>{product.name}</div>
        }
      </div>

    </div>
  );
};

export default ProductDisplayCart;