import Navbar from "../../layout/components/Navbar";
//import ConteinerProduto from "../../layout/components/ConteinersProdutos";
import Footer from "../../layout/components/Footer";
import { useTheme } from "../../context/useTheme";
import ProductDisplay from "../../layout/ProductsDisplay/ProductDisplay";
import NewestProducts from "../../layout/ProductsDisplay/NewestProducts";
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Product } from "../../types/Product";



export default function Home() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosClient.get('/api/products')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

 

  return (
    <>
      <Navbar/>
      <div id='background' 
      className={` min-h-[550px] min-w-[600px] w-full flex flex-col gap-5 items-center justify-center bg-gradient-to-b 
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-gray-200 via-emerald-100 to-gray-400 text-stone-900'}  `}>
        
        <div id="grande caixa que contém a grade" className="mt-48  gap-5 grid grid-cols-3 justify-items-center items-start w-11/12 h-5/6 min-h-[800px]">

          <div id="novidades" className="col-span-3 w-full h-40 "><NewestProducts/></div>

          <div id="conteiner boas vindas" className="flex flex-col justify-center w-full h-full col-span-2 row-span-5 rounded">
            <div className="text-7xl text-black p-4">
              <img src="assets/saposoideiastore.png"></img>
            </div>
          </div>          
          
          <div className="relative">
            <div id="caixa mais vendidos" 
            className={` flex font-mono text-xl justify-center border row-span-5 w-full h-full rounded mt-14 py-5
            ${theme === 'dark' ? 'bg-black/30  border-slate-400' 
            : 'bg-white/30 border-zinc-800'} `}>
              
              <div id="mais vendidos texto superior" 
                className={`absolute z-50 right-8 -mt-7 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-black/50 border border-emerald-100' 
                : 'bg-zinc-100  border border-black'} `}>
                mais vendidos</div>
              <div id="mais vendidos texto inferior" 
                className={`absolute z-50 right-8 bottom-0 -mb-3 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-zinc-900/50 border border-emerald-100' 
                : 'bg-zinc-100  border border-black'} `}>
                mais vendidos</div>

              <div id="lista mais vendidos" className=" col-start-3 container rounded-lg flex flex-col gap-4 mx-4 my-4 w-full h-full">
                {products.slice(0, 5).map(product => (
                  <div key={product.id} className=""><ProductDisplay productId={product.id} /></div>
                ))}
              </div>
            </div>
          </div>

          
        </div>

        <div id="big saposo" className="flex justify-center"><img src="assets/saposobig.png" className="w-[60%]"></img></div>
        <div id="caixa do aviso misterioso" 
        className={` mb-10 flex flex-col items-center gap-6 shadow-lg shadow-[#874e96] rounded-t-md rounded-bl-[100px] border-t border-r border-[#73ff00] 
        ${theme === 'dark' ? 'bg-[#1d1d1d]' 
        : 'bg-slate-400/30 shadow-inner border-b border-[6px]'}`}>
          
          <div id="grande sapo de chapéu" className="mx-6 mt-14 mb-4">o grande sapo te viu</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-10">.</div>

        </div>

      </div>
      <Footer/>
    </>
  )
}

 


