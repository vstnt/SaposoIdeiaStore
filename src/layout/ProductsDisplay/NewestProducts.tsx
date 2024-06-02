import { useEffect, useState, useRef, useCallback } from 'react';
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

export default function NewestProducts () {
  const [products, setProducts] = useState<Product[]>([]);
  const { theme } = useTheme()
  const swiperRef = useRef<SwiperInstance | null>(null); // Referência para o Swiper com tipagem correta

  useEffect(() => {
    axiosClient.get('/api/products/newest')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

  const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' [...]';
    }
    return description;
  };

  const handleVisibilityChange = useCallback(() => { // daqui pra baixo é a lógica pra conseguir fazer o swiper iniciar sempre que monta o componente
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
    <div id='caixa completa relative, pra poder fazer as caixas transbordando a caixa' 
    className='relative w-full h-full'>
      <div id='caixa completa' 
      className={` bg-black border shadow-md p-1 overflow-hidden rounded font-mono text-[17px] w-full h-full
      ${theme === 'dark' ? 'bg-black/30 border-slate-400/30 text-neutral-200' 
      : 'bg-slate-100/90 text-black border-zinc-500'}`}>

        <div id='novidades.novelties.nouvelles' 
          className={`absolute shadow z-50 bottom-0 right-0 -m-2 mr-3 mt-3 h-7 ml-1 flex items-center rounded px-3 py-4 text-[2.3vw] transition-colors duration-300 
          ${theme === 'dark' ? ' bg-zinc-900/70 border border-emerald-100' 
          : 'bg-zinc-100 text-stone-900 border border-zinc-700'} `}>
              <div className="font-bold tracking-widest">novidades</div><div>.novelties.nouvelles</div>
            
        </div>

        <Link id='botão lista completa' to={'/products'} 
        className={` absolute shadow z-50 top-0 right-0 justify-self-end px-3 pr-2 pt-1 pb-1 rounded border border-stone-400/60 transition-colors duration-300 tracking-tight hover:underline
            ${theme === 'dark' ? '' 
            : 'bg-neutral-100'} `}>
          lista completa</Link>

          <Swiper
            onSwiper={setSwiperRef} // Atribui a referência do Swiper usando callback ref
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 10000,
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
                        <div className={`text-[2.3rem] italic
                        ${theme === 'dark' ? 'text-neutral-300' 
                        : 'text-black'}`}>{product.name}</div>
                        <p className='leading-none '>{truncateDescription(product.description, 16)}</p>
                      </div>
                      <div id='price' className='text-2xl mt-2'>{product.price}</div>
                      <div id='botao ver mais' className='col-start-2 flex items-end hover:underline mb-7 text-[15px]'>
                        <Link to={`/product/${product.id}`} className=' border-black'>ver mais</Link>
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
}