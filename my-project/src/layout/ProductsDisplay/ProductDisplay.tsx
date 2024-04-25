import React from "react";
import { getProducts } from "../../services/localStorageServices";
import { useNavigate } from "react-router-dom";


interface ProductDisplayProps {
  productId: number;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ productId }) => {
  const product = getProducts().find((p) => p.id === productId);

  console.log(product ? product.imageUrl : "Produto não encontrado");

  const navigate = useNavigate();
  function redirect() {
    navigate(`/product/${product.id}`);
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="col-span-1 bg-slate-100/90 border-2 border-lime-400 to-slate-500/80 text-black shadow-md rounded flex h-20 gap-2 pl-2 py-[2px]">
      <div className="rounded basis-1/5 flex items-center justify-center"><img id='img produto' className="py-1 object-scale-down max-w-full max-h-full basis-1/4 rounded-md" src={product.imageUrl}></img></div>
      <div className="px-1 basis-3/6 h-full grid text-sm ">
        <p className="text-md font-bold ">{product.name}</p>
        <p className="text-[9px] italic leading-tight">{product.description}</p>
        <p className="mb-1 font-semibold flex items-end ">R$ {product.price.toFixed(2)}</p>
      </div>
      <div className="basis-2/6 mr-1 flex items-end mb-1 text-xs"><button onClick={() => redirect()} className="bg-gray-800 rounded-md px-2 py-1 text-white mx-auto shadow-lg ">Ver produto</button></div>
    </div>
  );
};

export default ProductDisplay;
