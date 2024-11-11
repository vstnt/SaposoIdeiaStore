//import { useTheme } from '../../context/Theme/ThemeContext';
import ProductDisplay from "../../layout/components/ProductsDisplays/ProductDisplay";
import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Product } from "../../types/Product";
import BannersHomepage from '../../layout/components/Sliders/BannersHomepage';
import { Link } from 'react-router-dom';
import ForYou from '../../layout/components/Sliders/ForYou';



export default function Home() {
  //const { theme } = useTheme();

  /* Para recuperar os produtos.
  essa recuperação simples da lista de produtos teria de ser substituida por uma que obtivesse apenas o id
  dos produtos mais vendidos, quando essa função for implementada na api. */
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axiosClient.get('/api/products')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

 

  return (
    <>
      <div id='background' 
      className={` min-h-[550px] w-full flex flex-col bg-white text-black font-tenorsans`}>
        <div id='área vazia espaço header' className='h-[40px]'></div>

        <div title="sliderBanners mobile" className="w-full h-[75vh] md:hidden">
            <BannersHomepage/>
        </div>

        <div title='banner desktop' className='hidden md:block w-full h-[20rem] bg-slate-900 relative'>
          
          <img  src='/assets/grandCanal.jpg' className='h-full w-full'></img>
          
          <Link to={'/products'} title='Botão Explore nossa coleção' className='font-tenorsans absolute right-[15vw] bottom-[20vh]'>
            <img src='/assets/explore nossa coleção.png' className='h-20'></img>
          </Link>

        </div>
        
        <div title='sessão Novos Produtos' className='flex flex-col gap-2 items-center w-full mb-5 mt-5'>
          
          <div title='novelties + separador' className='flex flex-col items-center md:self-start md:ml-10 '>
            <div title='texto novidades.nouvelles' className='mt-10 text-lg'>NOVELTIES.NOUVELLES</div>
            <img src='/assets/separador.png' className="w-[8rem]"></img>
          </div>

          <div title='fila novos produtos' className='flex h-[30rem] md:h-[15rem] w-full '>
            
            <div title='mobile' className='md:hidden grid grid-cols-2 gap-x-3 gap-y-1 p-5 items-center justify-items-center  w-full h-full'>
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="w-[9rem] h-[15rem]"><ProductDisplay productId={product.id}/></div>
              ))}
            </div>
            
            <div title='desktop' className='hidden w-full h-full md:flex gap-[5vw] justify-center'>
              {products.slice(0, 5).map(product => (
                <div key={product.id} className="w-[10rem] h-[15rem] relative "><ProductDisplay productId={product.id}/></div>
              ))}
            </div>
              
          </div>

          <Link title='Explore ->' to={'/products'} className='flex flex-col items-center md:self-end md:mr-28 mt-8 md:mt-0 p-1 px-2 rounded hover:bg-cinzahover/10 transition-colors duration-[320ms]'>
              <div title='texto novidades.nouvelles' className='text-xs'>Explore &rarr;</div>
              <img src='/assets/separador.png' className="hidden md:block w-[8rem]"></img>
          </Link>
      
        </div>

        <div title='sessão Pra Você' className='flex flex-col items-center gap-3 w-full '>

          <div title='nome sessão + separador' className='flex flex-col items-center self-start ml-[5vw] md:ml-10 mb-5'>
            <div title='texto Pra Você' className='mt-10 text-lg'>PRA VOCÊ</div>
            <img src='/assets/separador.png' className="w-[8rem]"></img>
          </div>

          <div title="sliderBanners mobile" className="w-full h-[23rem] md:hidden ">
            <ForYou/>
          </div>
        
        </div>

        <div title='faixa explicações' className='mt-5 w-full  flex flex-col items-center justify-center gap-4  bg-cinza h-[29rem] md:h-[19rem]'>
          
          <div title='print.art.store' className='text-center text-lg'>
            PRINT.ART.STORE
          </div>
          
          <div title='texto' className='text-center w-[85%] text-xs text-cinzatexto mt-2'>
            A criação, edição e preparação de obras de arte, pra que você as tenha em sua casa, é nossa motivação diária.
          </div>

          <img title='separador' src='/assets/separador.png' className="w-[8rem] mb-3"></img>

          <div title='grid elementos' className='grid grid-cols-2 gap-y-6 md:gap-x-7 p-1 md:flex text-xs text-center items-center justify-items-center'>
            
            <div className='flex flex-col items-center gap-2 max-w-40'>
              <img src='/assets/envio rápido.png' className='h-10 md:h-8'></img>
              <div>Envio rápido. Grátis para pedidos acima de R$ 100.</div>
            </div>

            <div className='flex flex-col items-center gap-2 max-w-40'>
              <img src='/assets/processo sustentável.png' className='h-10 md:h-8'></img>
              <div>Processo sustentável, do início ao fim.</div>
            </div>

            <div className='flex flex-col items-center gap-2 max-w-40' >
              <img src='/assets/design único.png' className='h-10 md:h-8'></img>
              <div className=''>Design único, e materiais de alta qualidade.</div>
            </div>

            <div className='flex flex-col items-center gap-2 max-w-40'>
              <img src='/assets/curadoria especializada.png' className='h-10 md:h-8'></img>
              <div>Curadoria especializada. Feita de coração.</div>
            </div>

          </div>

          <img src='/assets/rashura.png' className="w-[4.5rem] object-scale-down mt-4"></img>

        </div>

      </div>
    </>
  )
}

 


