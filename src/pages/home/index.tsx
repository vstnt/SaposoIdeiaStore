import { useTheme } from '../../context/Theme/ThemeContext';
import ProductDisplay from "../../layout/components/ProductDisplay";
import NewestProducts from "../../layout/components/NewestProducts";
import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Product } from "../../types/Product";



export default function Home() {
  const { theme } = useTheme();

  /* essa recuperação simples da lista de produtos teria de ser substituida por uma que obtivesse apenas o id
  dos produtos mais vendidos, quando essa função nna api for implementada. */
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosClient.get('/api/products')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

 

  return (
    <>
      <div id='background' 
      className={` min-h-[550px] w-full flex flex-col gap-5 items-center justify-center bg-gradient-to-b 
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>
        
        <div id='área vazia espaço header' className='h-[80px]'></div>

        <div id="área com: novidades, Saposoideiastore, mais vendidos" 
        className="mt-[5vw] gap-5 grid grid-cols-3 justify-items-center items-start w-11/12">

          <div id="novidades" className="col-span-3 w-full h-[60vh] lg:h-40 ">
            <NewestProducts/>
          </div>
                  
          <div id="texto grande SAPOSO IDEIA STORE" className=" flex flex-col mt-14 justify-start w-[100vw] md:w-full h-full col-span-3 md:col-span-2 row-span-5 md:mt-32">
            <div className="md:-mx-2 md:-ml-10 ">
              {theme === 'dark' ? <img src='assets/saposoideiastore2.png'></img> 
              : <img src='assets/saposoideiastore.png' className='w-[100%]'></img>}
            </div>
          </div>          
          
          <div id="caixa mais vendidos relative" className='hidden md:block'>
            <div id="caixa mais vendidos" 
            className={`min-h-80 min-w-60 flex font-mono text-xl shadow-md justify-center border row-span-5 w-full h-full rounded mt-14 py-5
            ${theme === 'dark' ? 'bg-black/30  border-slate-500' 
            : 'bg-white/30 border-zinc-500'} `}>
              
              <div id="caixinha mais vendidos superior" 
                className={`absolute z-50 right-8 -mt-7 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-black/70 border border-emerald-100' 
                : 'bg-zinc-100  border border-black'} `}>
                mais vendidos</div>
              <div id="caixinha mais vendidos inferior" 
                className={`absolute z-50 right-8 bottom-0 -mb-3 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-zinc-900/70 border border-emerald-100' 
                : 'bg-zinc-100  border border-black'} `}>
                mais vendidos</div>

              <div id="lista mais vendidos" className=" col-start-3 container rounded-lg flex flex-col gap-4 mx-4 my-4 w-full h-full">
                {products.slice(0, 5).map(product => (
                  <div key={product.id} className=""><ProductDisplay productId={product.id}/></div>
                ))}
              </div>
            </div>
          </div>

        </div>


        <div id="big saposo" className="flex justify-center"><img src="assets/saposobig.png" className="w-[100%] md:w-[60%]"></img></div>
        
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
    </>
  )
}

 


