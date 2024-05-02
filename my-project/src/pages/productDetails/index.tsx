import Navbar from "../../layout/components/Navbar";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/localStorageServices";

const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : null;

  const product = productId ? getProducts().find((p) => p.id === productId) : null;

  if (!product) {
    return <p>Produto não encontrado</p>
  }
  
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-r from-slate-400 to-violet-950 px-5 pt-28">
        
        <div className=" flex gap-5 mt-7">
          
          <div className="basis-5/12 h-[400px] flex justify-center items-start ">
            <img id="imgproduto" className="max-h-full h-auto object-contain w-full rounded-lg" src={product.imageUrl}></img>
          </div>
          

          <div className="text-green-400 bg-slate-900/50 border border-zinc-600 basis-7/12 rounded-lg p-2 grid content-start h-fit mr-5"> 
            <h2 className="text-[60px] mb-12  justify-self-center mr-24">{product.name}</h2>
            <p className="text-white italic px-2">{product.description}</p>
            <p className="justify-self-end mt-12 mr-4">R$ {product.price.toFixed(2)}</p>    
            <div className="shadow-lg mt-2 mb-2 mr-1 justify-self-end"><button className="shadow-inner shadow-green-400 text-sm text-green-900 italic bg-indigo-300 hover:bg-indigo-100 hover:shadow-white duration-300 rounded px-3">add carrinho</button></div>      
          </div>
          
          
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
    


	