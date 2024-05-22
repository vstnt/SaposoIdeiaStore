import Navbar from "../../layout/components/Navbar";
import { useParams } from "react-router-dom";
// import { getProducts } from "../../services/localStorageServices";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Product } from "../../types/Product";

const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : null;

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    console.log('Fetching product', productId);
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/api/products/${productId}`)
        console.log('Product data', response.data);
        setProduct(response.data)
      } catch (error) {
        console.error('Falha em recuperar produto', error)
      }
    }

    fetchProduct()
  }, [productId])

  // const product = productId ? getProducts().find((p) => p.id === productId) : null;

  if (!product) {
    return (
    <>
      <Navbar/>
      <p className="pt-32">Produto não encontrado</p>
    </>
    )
  }

  if (product.id == null) {
    return (
      <>
        <Navbar/>
        <p className="pt-32">Produto não encontrado</p>
      </>
      )
  }

  console.log('Rendering product', product);
  
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
            <p className="justify-self-end mt-12 mr-4">R$ {product.price}</p>    
            <div className="shadow-lg mt-2 mb-2 mr-1 justify-self-end"><button className="shadow-inner shadow-green-400 text-sm text-green-900 italic bg-indigo-300 hover:bg-indigo-100 hover:shadow-white duration-300 rounded px-3">add carrinho</button></div>      
          </div>
          
          
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
    


	