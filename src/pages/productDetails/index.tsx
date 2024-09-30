import { useTheme } from '../../context/Theme/ThemeContext';
import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";
import { useCart } from '../../context/Cart/CartContext';
import { useAuth } from '../../context/Auth/AuthContext';
import { showToast } from '../../layout/components/Toasts';



export default function ProductDetails() {
  const { theme } = useTheme();
  const auth = useAuth()



  // adição do produto ao carrinho
  const [quantity, setQuantity] = useState<number>(1);
  const { updateItem } = useCart()
  
  const handleIncreaseButton = () => {setQuantity((prevCount) => prevCount + 1);};
  const handleDecreaseButton = () => {setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));};
  
  const handleValueBox = (event: React.ChangeEvent<HTMLInputElement>) => { // para lidar com o campo de input por texto
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = async (product_id: number, quantity: number) => {
    if(!auth.user){
      showToast('default', 'Você precisa estar logado pra adicionar items no carrinho!', '🚫', theme, {})
    } else {
      try {  
        const response = await updateItem(product_id, quantity)
        if (response) {
          showToast('toCart', 'Item adicionado ao', '🐸', theme, {autoClose: 4000,})
        } else {
          throw new Error('Sem resposta do banco de dados');
        }
      } catch (error) {
        alert(error)
      }
    } 
  }



  // recuperação do produto para podermos expô-lo
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : null;
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    axiosClient.get(`/api/products/${productId}`)
    .then(
      response => {
        if (response.data == 'Produto não encontrado') {
          console.log('sem resposta!')
          setProduct(null)
        } else {
          setProduct(response.data)
        }
        })
    .catch(error => console.error('Falha em recuperar produto', error))
  }, [productId])

  /* aqui a forma alternativa, padrão de uso try-catch. Vou deixar aqui as duas para comparação. 
  Ambas funcionam bem. Pelo jeito o axios já traz em si essa forma de try-catch própria

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/api/products/${productId}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Falha em recuperar produto', error)
      }
    }
    fetchProduct()
  }, [productId])

  */



  return ( 
    <>
      <div id="bg" 
      className={` pb-24 pt-24 md:pt-44 bg-gradient-to-b px-5
      ${theme === 'dark' ? 'from-indigo-950 to-indigo-500/80 to-90% text-neutral-200' 
      : 'from-slate-300  via-slate-200 via-10% to-slate-100 to-100% text-stone-900'}  `}>
        
        <div id="flex com tudo dessa página" 
        className="flex flex-col md:flex-row gap-5 mt-7">
          
          <div id="área imagem" 
          className="basis-5/12 h-[400px] flex justify-center items-start ">
            {product == null ? 
              <img id="prodimgnotfound" className="max-h-full h-auto object-contain w-full rounded-lg bg-black border-2 border-black" src='/assets/notFound.jpg'></img>
            : 
              <img id="prodimg" 
              className="max-h-72 md:max-h-full h-auto object-contain w-full rounded-lg" src={product.imageUrl}></img>
            }
          </div>
          
          <div id='infos e botões' className="basis-7/12 flex flex-col gap-2">  
            {product == null ?
              
              <div id="caixa infos produto nao encontrado" 
              className={` bg-slate-900/60 border border-zinc-600 rounded-lg p-2 grid content-start h-fit md:mr-5
                ${theme === 'dark' ? 'text-green-400' 
                : 'text-emerald-300'} `}>
                <h2 className="text-3xl md:text-[50px] mb-12  ml-14">Produto não encontrado</h2>
                <p className="text-white italic px-2">Houve algum problema</p>
                <p className="justify-self-end mt-12 mr-4">R$ ???</p>    
              </div>
            :
              <div id="caixa infos" 
              className={` bg-slate-900/60 border border-zinc-600 rounded-lg p-2 grid content-start h-fit md:mr-5
                ${theme === 'dark' ? 'text-green-400' 
                : 'text-emerald-300'} `}>
                <h2 className="text-3xl md:text-[50px] mb-12  ml-14">{product.name}</h2>
                <p className="text-white italic px-2">{product.description}</p>
                <p className="justify-self-end mt-12 mr-4">R$ {product.price}</p>    
              </div>
            }

            <div id='área botões carrinho' className="flex flex-col mt-2 self-end md:mr-10 ">
              
              <div title='Mais, menos e número' className='flex justify-center '>
                <button onClick={handleDecreaseButton}
                className={`border font-bold rounded-full w-6 h-6 leading-none transition-all duration-300 mr-3 pb-1
                ${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
                : 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
                  -
                </button>
              
                <input type="number" value={quantity} onChange={handleValueBox} min="1" 
                className={` w-16 rounded border text-end
                ${theme === 'dark' ? 'bg-slate-100/20 border-stone-900' 
                : 'bg-slate-100 border-slate-400'} `} />
                
                <button onClick={handleIncreaseButton}
                className={`border font-bold rounded-full w-6 h-6 -inset-16 leading-none transition-all duration-300 ml-3 pb-1
                ${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
                : 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
                    +
                </button>                
              </div>

              <button id="botão adicionar ao carrinho"
              onClick={ product == null ? () => {} : () => handleAddToCart(product.id, quantity)}
              className={`mt-3 shadow-inner px-3 py-1 text-sm text-green-900 italic duration-300 rounded
              ${theme === 'dark' ? 'border border-zinc-800 bg-emerald-400/90 hover:bg-emerald-500/80 text-white shadow-green-400/20 hover:shadow-green-400/5' 
              : 'bg-emerald-300/90 hover:bg-emerald-400/80 text-black  ' }`}>
                {product ? 'Adicionar ao carrinho 🛒' : 'Botão quebrado'}
              </button>
              
            </div>       
          
          </div>

        </div>
      </div>
    </>
  );
}

    


	