import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { Product } from "../../types/Product";



interface ProductDisplayProps {
  productId: number;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);

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
    <div className="col-span-1 bg-slate-100/90 border-2 border-lime-400 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]">
      <div className="rounded basis-1/5 flex items-center justify-center"><img id='img produto' className="py-1 object-scale-down max-w-full max-h-full basis-1/4 rounded-md" src={product.imageUrl}></img></div>
      <div className="px-1 basis-3/6 h-full grid text-sm ">
        <p className="text-md font-bold ">{product.name}</p>
        <p className="text-[9px] italic leading-tight">{truncateDescription(product.description, 13)}</p>
        <p className="mb-1 font-semibold flex items-end ">R$ {product.price}</p>
      </div>
      <div className="basis-2/6 mr-1 flex items-end mb-1 text-xs"><button onClick={() => redirect()} className="bg-gray-800 rounded-md px-2 py-1 text-white mx-auto shadow-lg ">Ver produto</button></div>
    </div>
  );
};

export default ProductDisplay;
