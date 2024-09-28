import { useEffect, useState, useRef, useCallback } from 'react';
import { Product } from "../../../types/Product";
import axiosClient from '../../../axiosClient';
import { Link } from "react-router-dom";
import { useTheme } from '../../../context/Theme/ThemeContext';
import { truncateCharacters, truncateWords } from '../../../helpers/truncate';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';

import '../../../styles/swiper.css';


export default function NewestProducts () {
  const { theme } = useTheme()
  const [products, setProducts] = useState<Product[]>([])


  useEffect(() => {
    axiosClient.get('/api/products/newest')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);


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
  }, [products]);


   
  return (
    <div id='caixa completa relative, pra poder fazer as caixas transbordando a caixa' 
    className='relative w-full h-full'>
      <div id='caixa completa' 
      className={`border shadow-md p-1 overflow-hidden rounded font-mono text-[17px] w-full h-full
      ${theme === 'dark' ? 'bg-black/30 border-slate-500 text-neutral-200' 
      : 'bg-slate-100/90 text-black border-zinc-500'}`}>

        <div id='novidades.novelties.nouvelles' 
        className={`absolute shadow z-50 bottom-0 right-0 -mb-7 -mr-1 sm:-m-7 sm:mr-3 sm:mt-3 h-7 ml-1 flex items-center rounded px-3 py-4 text-base transition-colors duration-300 
          md:-m-2 
        ${theme === 'dark' ? ' bg-zinc-900/70 border border-emerald-100' 
        : 'bg-zinc-100 text-stone-900 border border-zinc-700'} `}>
          <div className="font-bold tracking-widest">novidades</div><div>.novelties.nouvelles</div> 
        </div>

        <Link id='botão lista completa' to={'/products'} 
        className={`text-xs md:text-md absolute shadow z-50 top-0 right-0 justify-self-end px-3 pr-2 pt-1 pb-1 rounded border  border-stone-400/60 transition-colors duration-300 tracking-tight hover:underline
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-neutral-100'} `}>
          lista completa
        </Link>

          <Swiper
            onSwiper={setSwiperRef} // Atribui a referência do Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
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
                  <div id='slide' className='flex flex-col lg:flex-row h-full w-full justify-start'>
                    
                    <div className='hidden py-1 basis-3/12 object-contain max-h-full lg:flex justify-center'>
                      <img id='imagem produto' className='rounded-lg  object-contain max-h-full  justify-self-center' src={product.imageUrl} alt={product.name} />
                    </div>
                    
                    <div id='nome, descrição' 
                    className='hidden basis-6/12 lg:flex flex-col ml-[1vw]' >
                      <div id='nome' className={` basis-1/3 text-[2.5vw] italic ${theme === 'dark' ? 'text-neutral-300' : 'text-black'}`}>{truncateCharacters(product.name, 50)}</div>
                      <div id='descrição' className='basis-2/3 leading-none '>{truncateWords(product.description, 40)}</div>
                    </div>

                    <div className='hidden lg:flex flex-col pl-10 place-items-center pt-12  basis-3/12'>
                      <div id='price' className='text-2xl'>R$ {product.price}</div>
                      <div id='botao ver mais' className='ml-14 p-1 rounded border  border-gray-300 hover:underline text-[15px]'>
                          <Link to={`/product/${product.id}`} className=' border-black'>ver mais</Link>
                      </div>
                    </div>






                    <div className='lg:hidden mt-2 h-[45%] bg-slate-300/30 rounded-3xl w-[85%] self-center'>
                      <div className=' py-4 flex justify-center h-full '>
                        <img id='imagem produto' className='lg:hidden object-contain max-h-full max-w-[75%]' src={product.imageUrl} alt={product.name} />
                      </div>
                    </div>


                    <div id='nome' className={`lg:hidden text-lg mt-2 py-2 font-bold text-center italic ${theme === 'dark' ? 'text-emerald-300' : 'text-black'}`}>{product.name}</div>
                    
                    <div id='descrição' className={`lg:hidden h-[23%] px-5 font-sans text-sm text-justify overflow-hidden line-clamp-4
                      ${theme == 'dark'? 'text-slate-200':''} `}><div >{truncateWords(product.description, 40)}</div></div>
                    
                    <div className='lg:hidden flex justify-between items-end h-[8%]  px-3'>
                      <div id='price' className={` ${theme == 'dark'? 'text-slate-300':''}`}>R$ {product.price}</div>
                      <div id='botao ver mais' className={` p-1 px-2    hover:underline text-[15px] ${theme == 'dark'? 'rounded bg-emerald-400/60 border border-gray-300':'rounded-sm border border-slate-700/70'}`}>
                          <Link to={`/product/${product.id}`} className=' border-black'>ver mais</Link>
                      </div>
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