import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import { Product } from "../../../types/Product";
//import { useTheme } from '../../../context/Theme/ThemeContext';
import { ProductDisplayProps } from "../../../types/ProductDisplayProps";


const ProductDisplay: React.FC<ProductDisplayProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  //const { theme } = useTheme()

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



  if (product == null) {
    return (
      <div id="caixa completa" className={`h-full w-full flex flex-col gap-1`}>
      
      <div title="img" className="h-[80%] max-h-[80%] w-[99%]">
        <div className="w-full h-full bg-slate-300"></div>
      </div>

      <div title="nome e valor" className="text-xs text-center bg-slate-400 h-[20%] w-[99%]">
      </div>
    
    </div>
    );
  }

  return (
    <div id="caixa completa" onClick={() => redirect()} className={`h-full w-full `}>

      <div className="hidden md:block absolute w-full h-full hover:bg-cinzahover/10 transition-colors duration-[320ms]"></div>
      
      <div title="img" className="h-[80%] max-h-[80%] w-[99%]">
        <img src={product.imageUrl} className="h-full w-full max-w-full max-h-full object-contain"></img>
      </div>

      <div title="nome e valor" className="text-xs text-center">
        <div>{product.name}</div>
        <div className="text-laranjapreços">R${parseFloat(Number(product.price).toPrecision(2))}</div>
      </div>
    
    </div>
  );
};

export default ProductDisplay;
