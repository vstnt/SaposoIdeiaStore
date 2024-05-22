import { useEffect, useState } from 'react';
import { Product } from "../../types/Product";
import axiosClient from '../../api/axiosClient';
import { Link } from "react-router-dom";
import { useTheme } from '../../context/useTheme';

import { register } from 'swiper/element';

register();



const CarouselComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { theme } = useTheme()
    
  useEffect(() => {
    axiosClient.get('/api/products/newest')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  return (
    <div className='relative w-full h-full'>
      <div id='caixa completa' 
      className={` bg-black border border-zinc-800 text-[#c5c0c0] p-1 overflow-hidden rounded-md font-mono text-[17px] w-full h-full
      ${theme === 'dark' ? 'bg-black/50 text-[#c5c0c0]' 
      : 'bg-white/30 text-black'}`}>

        <div id='novidades.novelties.nouvelles' 
          className={`absolute z-50 bottom-0 right-0 -m-2 -mr-5 mt-3 h-7 ml-1 flex items-center rounded px-4 py-4 text-[2.3vw] transition-colors duration-300 
          ${theme === 'dark' ? 'hover:bg-zinc-600/20 bg-zinc-900/50' 
          : 'bg-zinc-100 text-stone-900 border border-black'} `}>
            <Link to={'/products'} className="flex">
              <div className="font-bold tracking-widest">novidades</div><div>.novelties.nouvelles</div>
            </Link>
        </div>

        <Link id='link lista completa' to={'/products'} 
        className={`absolute z-50 top-0 right-0 justify-self-end px-7 py-3 pt-4 pb-2 -mt-3 -mr-4 rounded border-b-2 border-l border-stone-400 transition-colors duration-300 tracking-tight hover:underline
            ${theme === 'dark' ? 'hover:bg-zinc-100/50' 
            : ''} `}>
          lista completa</Link>

          <swiper-container
            space-between="50"
            slides-per-view="1"
            autoplay={true}
            autoplay-delay="2500"
            autoplay-disable-on-interaction="false"
            loop={true}
            style={{ height: '100%' }}
            >
            {products.map(product => (
                <swiper-slide key={product.id}>
                  <div id='slide' className='grid grid-cols-3 grid-rows-3 h-full w-full'>
                    
                    <img id='imagem produto' className='object-contain max-h-full rounded-lg col-span-1 row-span-3 justify-self-center -ml-16 flex items-center' src={product.imageUrl} alt={product.name} />
                    <div id='nome, descrição' className='col-span-1 row-span-2' >
                      <div className='text-5xl'>{product.name}</div>
                      <p>{product.description}</p>
                    </div>
                    <div id='price' className='text-2xl mt-2'>{product.price}</div>
                    <div id='ver mais' className='col-start-2 flex items-end'>
                      <div className='underline'><Link to={`/product/${product.id}`}>ver mais</Link></div>
                    </div>

                  </div>
                </swiper-slide>              
            ))}
          </swiper-container> 

      </div>
    </div>
    
  );
};

export default CarouselComponent;