import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { Product } from "../../types/Product";
import { useTheme } from "../../context/Theme/useTheme";



interface ProductDisplayProps {
  productId: number;
}

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

  if (product?.id==null) {
    return (
      <div className=" col-span-1 bg-slate-100/90 border-2 border-lime-400 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]">
          <div className="px-1 h-full w-full flex justify-center items-center text-sm  ">
            <p className="text-md font-bold ">Produto não encontrado.</p>
          </div>
    </div>    );
  }

  const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' [...]';
    }
    return description;
  };

  return (
    <div id="caixa" className={`col-span-1  border-x-2 border-b-2 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]
    ${theme === 'dark' ? 'bg-black/30 border-slate-400 text-neutral-200 border-t' 
    : 'border-slate-300 bg-slate-100/90'}`}>
      <div className="rounded basis-1/5 flex items-center justify-center"><img id='img produto' className="py-1 object-scale-down max-w-full max-h-full basis-1/4 rounded-md" src={product.imageUrl}></img></div>
      <div className="px-1 basis-3/6 h-full grid text-sm ">
        <p className="text-md font-bold ">{product.name}</p>
        <p className="text-[10px] italic leading-tight">{truncateDescription(product.description, 13)}</p>
      </div>
      <div className="basis-2/6 flex flex-col items-end justify-between text-xs">
        
        <div id="preço" className="mt-2 mr-3 font-semibold flex"><div className="w-20">R$ {product.price}</div></div>
        
        <button id="botão ver mais" onClick={() => redirect()} 
        className={` rounded px-1 py-1 shadow-lg hover:underline
        ${theme === 'dark' ? 'bg-slate-500/50 text-white ' 
        : ' text-black bg-slate-200'}`}>ver mais</button></div>
    
    </div>
  );
};

export default ProductDisplay;
