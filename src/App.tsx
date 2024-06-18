import Navigation from "./navigation";
import { register } from 'swiper/element/bundle'; // Importa a função para registrar os elementos customizados do Swiper. Isso é tipo um registro para com o navegador...

register(); // Registra os elementos customizados do Swiper

export default function App() {
  return (
      <Navigation/>
  )
}
