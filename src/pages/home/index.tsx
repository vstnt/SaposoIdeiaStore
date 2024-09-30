import { useTheme } from '../../context/Theme/ThemeContext';
import ProductDisplay from "../../layout/components/ProductsDisplays/ProductDisplay";
import NewestProducts from "../../layout/components/ProductsDisplays/NewestProducts";
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
      ${theme === 'dark' ? 'from-indigo-950 to-bgdarkblue/80 to-90% text-neutral-200' 
      : 'from-slate-300  via-slate-200 via-10% to-slate-100 to-100% text-stone-900'}  `}>
        
        <div id='área vazia espaço header' className='h-[80px]'></div>

        <div id="área com: novidades, Saposoideiastore, mais vendidos" 
        className="mt-[5vw] gap-5 grid grid-cols-3 justify-items-center items-start w-11/12 ">

          <div id="novidades" className="col-span-3 w-full h-[60vh] lg:h-40 ">
            <NewestProducts/>
          </div>
                  
          <div title="dá pra imaginar?" 
          className={`flex mt-10  -mr-3 ml-3 lg:h-[50%] md:mr-5 col-span-3 row-span-5 rounded-lg md:col-span-2 md:mt-32
          ${theme=='dark'?' md:border-transparent md:from-transparent '
          :''}`}>
            <div className="mt-5 mr-[3vw]  h-full">
              {theme === 'dark' ? <img className='h-full' src='assets/imaginar-white-green.png'></img> 
              : <img className='h-full' src='assets/imaginar-white-blue.png'></img>}
            </div>
          </div>          
          
          <div id="caixa mais vendidos relative" className='hidden md:block relative'>
            <div id="caixa mais vendidos" 
            className={`min-h-80 min-w-60 flex font-mono text-xl shadow-md justify-center border row-span-5 w-full h-full rounded mt-14 py-5
            ${theme === 'dark' ? 'bg-black/30  border-slate-500' 
            : 'bg-slate-300 border-zinc-500'} `}>
              
              <div id="caixinha mais vendidos superior" 
                className={`text-sm absolute z-50 right-8 -mt-7 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-zinc-900/60 border border-emerald-400/70' 
        : 'bg-slate-200 text-stone-900 border border-zinc-500'} `}>
                mais vendidos</div>

              <div id="caixinha mais vendidos inferior" 
                className={`text-sm absolute z-50 right-8 bottom-0 -mb-3 flex items-center rounded px-4 h-6 transition-colors duration-300 
                ${theme === 'dark' ? ' bg-zinc-900/60 border border-emerald-400/70' 
        : 'bg-slate-200 text-stone-900 border border-zinc-500'} `}>
                mais vendidos</div>

              <div id="lista mais vendidos" className=" col-start-3 container rounded-lg flex flex-col gap-4 mx-4 my-4 w-full h-full">
                {products.slice(0, 5).map(product => (
                  <div key={product.id} className=""><ProductDisplay productId={product.id}/></div>
                ))}
              </div>

              
            </div>
          </div>

        </div>


        <div id="big saposo" className=" -mt-7 md:-mt-[15vh] flex justify-center"><img src="assets/saposobig.png" className="w-[85%] md:w-[50%]"></img></div>
        
        <div id="caixa do aviso misterioso" 
        className={` mb-10 flex flex-col items-center gap-6 shadow-lg shadow-[#874e96] rounded-t-md rounded-bl-[100px] border-t border-r border-[#73ff00] 
        ${theme === 'dark' ? 'bg-[#1d1d1d]' 
        : 'bg-slate-400/30 shadow-inner border-b border-[6px]'}`}>
          
          <div id="grande sapo de chapéu" className="mx-6 mt-14 mb-4">o grande sapo te viu</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
          <div id="grande sapo de chapéu" className="mb-10">.</div>

        </div>

      </div>
    </>
  )
}

 


