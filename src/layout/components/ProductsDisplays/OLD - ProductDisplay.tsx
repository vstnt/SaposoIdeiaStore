import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import { Product } from "../../../types/Product";
import { useTheme } from '../../../context/Theme/ThemeContext';
import { ProductDisplayProps } from "../../../types/ProductDisplayProps";


const ProductDisplay: React.FC<ProductDisplayProps> = ({ productId }) => {
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




  if (product == null) {
    return (
      <div id="caixa completa" className={` col-span-1  border-x-2 border-b-2 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]
        ${theme === 'dark' ? 'bg-black/30 border-slate-400 text-neutral-200 border-t' 
        : 'border-slate-300 bg-slate-100/90'}`}>
          
          <div id="área img" className=" rounded basis-1/5 flex items-center justify-center"><img id='img produto' className="py-1 object-scale-down max-w-full max-h-full basis-1/4 rounded-md" src='/assets/notFound.jpg'></img></div>
          
          <div id="área Nome + Descrição" className="basis-3/5 h-full flex flex-col gap-1 text-sm text-justify pr-3">
            <p className=" text-md font-bold ">Buscando produto</p>
            <p className="text-[10px] italic leading-tight overflow-hidden line-clamp-3 md:line-clamp-4">será que esse produto existe mesmo?</p>
          </div>
    
          <div id="área valor + botão ver mais" className="basis-1/5 flex flex-col items-end justify-between text-xs self">
            <div id="preço" className="mt-2 font-semibold flex w-20">R$ -----</div> 
            <button id="botão ver mais" 
            onClick={() => redirect()} 
              className={` rounded px-1 py-1 shadow-lg hover:underline
              ${theme === 'dark' ? 'bg-slate-500/50 text-white ' 
              : ' text-black bg-slate-200'}`}>
              ver mais
            </button>
          </div>
        
        </div>  
    );
  }

  return (
    <div id="caixa completa" className={` col-span-1  border-2 to-slate-500/80 text-black shadow-inner  rounded flex h-20 gap-2 pl-2 py-[2px]
    ${theme === 'dark' ? 'bg-black/30 border-slate-400 text-neutral-200 border-t' 
    : 'border-slate-400/70  bg-slate-200/90'}`}>
      
      <div id="área img" className=" rounded basis-1/5 flex items-center justify-center"><img id='img produto' className="py-1 object-scale-down max-w-full max-h-full basis-1/4 rounded-md" src={product.imageUrl}></img></div>
      
      <div id="área Nome + Descrição" className="basis-3/5 h-full flex flex-col gap-1 text-sm text-justify pr-3">
        <p className=" text-md font-bold ">{product.name}</p>
        <p className="text-[10px] font-sans leading-none overflow-hidden line-clamp-3 md:line-clamp-4 ml-2 mr-1">{product.description}</p>
      </div>

      <div id="área valor + botão ver mais" className="basis-1/5 flex flex-col items-end justify-between text-xs self">
        <div id="preço" className="mt-2 font-semibold flex w-20">R$ {product.price}</div> 
        <button id="botão ver mais" 
        onClick={() => redirect()} 
          className={`bg-slate-400/70 rounded m-[2px] px-1 py-1 shadow-lg hover:underline
          ${theme === 'dark' ? 'bg-emerald-400/50 text-white ' 
          : ' text-black bg-emerald-200'}`}>
          ver mais
        </button>
      </div>
    
    </div>
  );
};

export default ProductDisplay;
