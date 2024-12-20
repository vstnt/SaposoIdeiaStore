import { useEffect, useState, useRef, useCallback } from 'react';
import { Product } from "../../../types/Product";
import axiosClient from '../../../axiosClient';
//import { Link } from "react-router-dom";
//import { useTheme } from '../../../context/Theme/ThemeContext';
//import { truncateCharacters } from '../../../helpers/truncate';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
//import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import '../../../styles/swiper.css';
import ProductDisplay from '../ProductsDisplays/ProductDisplay';


export default function ForYou () {
  //const { theme } = useTheme()
  const [products, setProducts] = useState<Product[]>([])

  // Recuperar produtos
  useEffect(() => {
    axiosClient.get('/api/products')
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
    <Swiper
      onSwiper={setSwiperRef} // Atribui a referência do Swiper
      spaceBetween={30}
      centeredSlides={true}
      width={210}
      style={{ height: '100%' }}
      slidesOffsetBefore={50}    
    >
      {products.slice(3,8).reverse().map(product => (
          <SwiperSlide key={product.id}>
           <ProductDisplay productId={product.id}/>
          </SwiperSlide> 
      ))}              
    </Swiper>
  );
}