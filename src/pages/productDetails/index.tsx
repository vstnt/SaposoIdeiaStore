import Navbar from "../../layout/components/Navbar";
import Footer from "../../layout/components/Footer";
import { useTheme } from "../../context/Theme/useTheme";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";
import { useCart } from "../../context/Cart/useCart";
import { useAuth } from "../../context/Auth/useAuth";


const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : null;
  const { theme } = useTheme();
  const { updateItem } = useCart()
  const auth = useAuth()


    // Lógica de adição ao carrinho
    const [quantity, setQuantity] = useState<number>(1);

    const handleIncrease = () => {
      setQuantity((prevCount) => prevCount + 1);
    };
  
    const handleDecrease = () => {
      setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      setQuantity(isNaN(value) || value < 1 ? 1 : value);
    };

    const handleUpdateItem = async (product_id: number, quantity: number) => {
      try {
        const response = await updateItem(product_id, quantity)
        if(!auth.user){
          alert('Você precisa estar logado para adicionar itens ao carrinho!')
        }
        if (response){
          alert(response)
        }
      } catch (error) {
        console.error("Erro ao atualizar item:", error)
      }
    }


  // Lógica de recuperação do produto
  const [product, setProduct] = useState<Product | null>(null)

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

  if (!product) {
    return (
    <>
      <Navbar/>
      <p className="pt-32">Produto não encontrado</p>
      <Footer/>
    </>
    )
  }

  if (product.id == null) {
    return (
      <>
        <Navbar/>
        <p className="pt-32">Produto não encontrado</p>
        <Footer/>
      </>
      )
  }




  



  return (
    <>
      <Navbar/>
      <div id="bg" 
      className={` pb-24 pt-44 bg-gradient-to-b px-5
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>
        
        <div id="flex com tudo dessa página" 
        className="flex gap-5 mt-7">
          
          <div id="área imagem" 
          className="basis-5/12 h-[400px] flex justify-center items-start ">
            <img id="imgproduto" 
            className="max-h-full h-auto object-contain w-full rounded-lg" src={product.imageUrl}></img>
          </div>
          
          <div className="basis-7/12 flex flex-col gap-2">
            
            <div id="caixa infos" 
            className={` bg-slate-900/60 border border-zinc-600 rounded-lg p-2 grid content-start h-fit mr-5
              ${theme === 'dark' ? 'text-green-400' 
              : 'text-emerald-300'} `}>
              <h2 className="text-[50px] mb-12  ml-14">{product.name}</h2>
              <p className="text-white italic px-2">{product.description}</p>
              <p className="justify-self-end mt-12 mr-4">R$ {product.price}</p>    
            </div>

            <div className=" mt-2 self-end mr-10">

              <button onClick={handleDecrease}
              className={`border rounded-full w-6 h-6 leading-none transition-all duration-300 mr-3 pb-1
                ${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
                : 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
                  -</button>
             
              <input type="number" value={quantity} onChange={handleChange} min="1" 
              className={` w-16 rounded border text-end
              ${theme === 'dark' ? 'bg-slate-100/20 border-stone-900' 
              : 'bg-slate-100 border-slate-400'} `} />
              
              <button onClick={handleIncrease}
              className={`border rounded-full w-6 h-6 -inset-16 leading-none transition-all duration-300 ml-3 mr-7 pb-1
                ${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
                : 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
                  +</button>

              <button id="botão adicionar ao carrinho"
              onClick={() => handleUpdateItem(product.id, quantity)}
              className={`shadow-inner px-3 py-1 text-sm text-green-900 italic duration-300 rounded
              ${theme === 'dark' ? 'bg-slate-500/50 hover:bg-slate-500/80 text-white shadow-green-400/20 hover:shadow-green-400/5' 
              : 'bg-slate-200 text-black hover:bg-gray-300 ' }`}>
                Adicionar ao carrinho
              </button>

            </div>       
          
          </div>


          
          
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetails;
    


	