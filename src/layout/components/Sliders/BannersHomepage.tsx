import { useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useTheme } from '../../../context/Theme/ThemeContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import '../../../styles/swiper.css';


export default function BannersHomepage () {
  const { theme } = useTheme()

  //Daqui pra baixo é a lógica pra conseguir fazer o swiper iniciar sempre que montamos o componente.
  // Cria uma referência com o tipo do swiper ou null. O novo Ref tem um .current que pode ser atualizado..
  const swiperRef = useRef<SwiperInstance | null>(null) 
  // função pra atualizar a referência, apontando sempre pra o swiper atual. Veja na configuração do swiper que esse objeto é chamado
  const setSwiperRef = useCallback((node: SwiperInstance | null) => {
    if (node) { // Verifica se node não é null. Creio que ele existe quando a página montada chama ele no HTML via <swiper></swiper>, se não, será null
      swiperRef.current = node;     
    }
  }, []);
  // Força o swiper a voltar para o início, para poder iniciar. Ele precisa ser posto em algum slide específico, se não, não inicia.
  useEffect(() => { 
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(0, 0);
      swiperRef.current.autoplay.resume;
    }
  }, []);


   
  return (
    <div id='caixa completa' className='relative w-full h-full flex'>

        <Link title='botão ver coleção' to={'/products'} 
        className={`absolute z-50 px-6 py-2 rounded-3xl bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap tracking-wider font-tenorsans   transition-colors duration-300  text-white bg-black/40
        `}>
          EXPLORE A COLEÇÂO
        </Link>

        <Swiper
          onSwiper={setSwiperRef} // Atribui a referência do Swiper
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            //delay: 100,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          initialSlide={3}
          slidesPerView={1}
          loop={false}
          style={{ height: '100%' }}
          pagination={false}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className={`mySwiper ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
        >
         
          <SwiperSlide key="slide-1">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-2">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner2.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-3">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner3.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide> 

          <SwiperSlide key="slide-4">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-5">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner2.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-6">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner3.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide> 

          <SwiperSlide key="slide-7">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-8">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner2.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-9">
            <div id='slide' className='h-full w-full bg-slate-600'>
              <img src='/assets/Banner3.jpg' className='h-full w-full'></img>
            </div>
          </SwiperSlide>  
             
        </Swiper>

    </div>  
  );
}