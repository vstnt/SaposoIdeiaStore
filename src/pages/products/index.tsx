import { useTheme } from '../../context/Theme/ThemeContext';
import ProductDisplay from "../../layout/components/ProductsDisplays/ProductDisplay";
import NewestProducts from "../../layout/components/ProductsDisplays/NewestProducts";
import { useState, useEffect } from "react";
import { Product } from '../../types/Product';
import axiosClient from "../../axiosClient";



export default function Products() {
  const { theme } = useTheme()
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    axiosClient.get('/api/products')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Erro ao obter os produtos:', error));
  }, []);



    return (
      <>
        <div id='bg' className={` pt-16 flex items-center justify-center bg-gradient-to-b 
        ${theme === 'dark' ? 'from-indigo-950 to-indigo-500/80 to-90% text-neutral-200' 
      : 'from-slate-300  via-slate-200 via-10% to-slate-100 to-100% text-stone-900'}  `}> 
          
          <div id='grande conteiner' className=" w-11/12 h-5/6 mt-10 mb-20 md:mt-20  min-h-[600px] flex flex-col justify-between items-center">
            
            <div id="pesquisa e menu de categorias" className="mb-8 w-full flex flex-col items-center justify-center">
              
              <input id="caixa de pesquisa" type="search" 
                className={` md:w-[40%] mt-5 bg-slate-100 
                ${theme === 'dark' ? '' 
                : 'border border-black'}  rounded `} 
                  placeholder=" Busque em nossos produtos">
              </input>

              <div id="menu de categorias" className='text-center'>menu de categorias | menu de categorias | categorias | categorias </div>
            </div>
            
            <div id="grade de produtos" className="font-mono text-xl mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id}><ProductDisplay productId={product.id}/></div>
              ))}
            </div>

            <div>páginas. 1, 2, 3 ... </div>
            
            <div id="carrossel novidades" className="mt-5 col-span-3 w-full h-[60vh] lg:h-40"><NewestProducts/></div>
          
          </div>
        </div>
      </>
    )
  }