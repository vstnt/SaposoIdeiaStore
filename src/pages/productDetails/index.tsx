import Navbar from "../../layout/components/Navbar";
import { useParams } from "react-router-dom";
// import { getProducts } from "../../services/localStorageServices";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Product } from "../../types/Product";
import AddToCartButton from "../Cart/AddToCartButton";
import Footer from "../../layout/components/Footer";
import { useTheme } from "../../context/Theme/useTheme";

const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : null;
  const { theme } = useTheme();


  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    console.log('Fetching product', productId);
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/api/products/${productId}`)
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
      <Footer/>
    </>
    )
  }

  if (product.id == null) {
    return (
      <>
        <Navbar/>
        <p className="pt-32">Produto não encontrado</p>
        <Footer/>
      </>
      )
  }

  

  return (
    <>
      <Navbar/>
      <div id="bg" 
      className={` pb-24 pt-44 bg-gradient-to-r from-slate-400 to-violet-950 px-5
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>
        
        <div id="flex com tudo dessa página" 
        className="flex gap-5 mt-7">
          
          <div id="espaço p/ imagem" 
          className="basis-5/12 h-[400px] flex justify-center items-start ">
            <img id="imgproduto" 
            className="max-h-full h-auto object-contain w-full rounded-lg" src={product.imageUrl}></img>
          </div>
          

          <div id="caixa com infos" 
          className={` bg-slate-900/60 border border-zinc-600 basis-7/12 rounded-lg p-2 grid content-start h-fit mr-5
            ${theme === 'dark' ? 'text-green-400' 
            : 'text-emerald-300'} `}>
            <h2 className="text-[60px] mb-12  justify-self-center mr-24">{product.name}</h2>
            <p className="text-white italic px-2">{product.description}</p>
            <p className="justify-self-end mt-12 mr-4">R$ {product.price}</p>    
            <div className="shadow-lg mt-2 mb-2 mr-1 justify-self-end">

              <button id="botão adicionar ao carrinho"
              className={`shadow-inner px-3 py-1 text-sm text-green-900 italic duration-300 rounded
              ${theme === 'dark' ? 'bg-slate-500/50 hover:bg-slate-500/80 text-white shadow-green-400/20 hover:shadow-green-400/5' 
              : 'bg-slate-200 text-black hover:bg-gray-300 ' }`}>
                <AddToCartButton product_id={product.id} />
              </button>
              


            </div>      
          </div>
          
          
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetails;
    


	