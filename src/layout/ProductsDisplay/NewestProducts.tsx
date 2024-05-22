import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Product } from "../../types/Product";
import axiosClient from '../../api/axiosClient';
import { Link } from "react-router-dom";
import { useTheme } from '../../context/useTheme';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';

import '../../styles/swiper.css';



const CarouselComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { theme } = useTheme()
  const swiperRef = useRef<SwiperInstance | null>(null); // Referência para o Swiper com tipagem correta

  useEffect(() => {
    axiosClient.get('/api/products/newest')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (swiperRef.current) {
      if (document.visibilityState === 'visible') {
        swiperRef.current.slideToLoop(0, 0); // Força o swiper a voltar para o início
        swiperRef.current.autoplay.start(); // Reinicia o autoplay
      } else {
        swiperRef.current.autoplay.stop(); // Para o autoplay quando a aba fica invisível
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const setSwiperRef = useCallback((node: SwiperInstance | null) => {
    if (node) {
      swiperRef.current = node;
      node.autoplay.start();
    }
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(0, 0); // Força o swiper a voltar para o início
      swiperRef.current.autoplay.start();
    }
  }, [products]);

  
  return (
    <div id='caixa completa relative, pra poder faazer as caixas transbordando a caixa' 
    className='relative w-full h-full'>
      <div id='caixa completa' 
      className={` bg-black border border-zinc-800  p-1 overflow-hidden rounded-md font-mono text-[17px] w-full h-full
      ${theme === 'dark' ? 'bg-black/50 text-neutral-200' 
      : 'bg-white/30 text-black'}`}>

        <div id='novidades.novelties.nouvelles' 
          className={`absolute z-50 bottom-0 right-0 -m-2 -mr-5 mt-3 h-7 ml-1 flex items-center rounded px-4 py-4 text-[2.3vw] transition-colors duration-300 
          ${theme === 'dark' ? ' bg-zinc-900/50 border border-emerald-100' 
          : 'bg-zinc-100 text-stone-900 border border-black'} `}>
              <div className="font-bold tracking-widest">novidades</div><div>.novelties.nouvelles</div>
            
        </div>

        <Link id='link lista completa' to={'/products'} 
        className={`absolute z-50 top-0 right-0 justify-self-end px-3 pr-8 pt-6 pb-2 -mt-5 -mr-6 rounded border-b-2 border-l border-stone-400 transition-colors duration-300 tracking-tight hover:underline
            ${theme === 'dark' ? '' 
            : ''} `}>
          lista completa</Link>

          <Swiper
            onSwiper={setSwiperRef} // Atribui a referência do Swiper usando callback ref
            spaceBetween={50}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            loop
            style={{ height: '100%' }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className={`mySwiper ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
            >
              {products.map(product => (
                  <SwiperSlide key={product.id}>
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
                  </SwiperSlide> 
              ))}              
            </Swiper>
            <div className={`custom-prev ${theme === 'dark' ? 'dark-theme' : 'light-theme'} `}>&lt;</div>
            <div className={`custom-next ${theme === 'dark' ? 'dark-theme' : 'light-theme'} `}>&gt;</div>

      </div>
    </div>
    
  );
};

export default CarouselComponent;