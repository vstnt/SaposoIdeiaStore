import { useTheme } from '../../context/Theme/ThemeContext';
import ProductDisplay from "../../layout/components/ProductDisplay";
import NewestProducts from "../../layout/components/NewestProducts";
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
        ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
        : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}> 
          
          <div id='grande conteiner' className=" w-11/12 h-5/6 mb-20 mt-20  min-h-[600px] flex flex-col justify-between items-center">
            
            <div id="pesquisa e menu de categorias" className="mb-8 w-full flex flex-col items-center justify-center">
              
              <input id="caixa de pesquisa" type="search" 
                className={` w-[40%] mt-5 bg-slate-100 
                ${theme === 'dark' ? '' 
                : 'border border-black'}  rounded `} 
                  placeholder=" Busque em nossos produtos">
              </input>

              <div id="menu de categorias">menu de categorias | menu de categorias | categorias | categorias </div>
            </div>
            
            <div id="grade de produtos" className="font-mono text-xl mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className=""><ProductDisplay productId={product.id} truncationName={22} truncationDescription={15} /></div>
              ))}
            </div>

            <div>páginas. 1, 2, 3 ... </div>
            
            <div id="carrossel novidades" className="col-span-3 w-full h-40 mt-8 mb-8"><NewestProducts/></div>
          
          </div>
        </div>
      </>
    )
  }