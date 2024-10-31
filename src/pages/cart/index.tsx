import { useTheme } from '../../context/Theme/ThemeContext';
import { useCart } from '../../context/Cart/CartContext';
import ProductDisplayCart from '../../layout/components/ProductsDisplays/ProductDisplayCart';
import { Link } from 'react-router-dom';

import axiosClient from '../../axiosClient';
import { apiPath } from '../../developmentOrProductionVariables';
import { useAuth } from '../../context/Auth/AuthContext';


export default function Cart() {
  const { cart, removeItem, clearCart, updateItem } = useCart()
  const { theme } = useTheme()
  const auth = useAuth()

  if (!cart?.items) {
	axiosClient.post(apiPath.createCart, {'uid': auth.user?.firebaseId} )
  }

  const handlePageChangerSmooth = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }


/* ao invés de usar:
const Cart: React.FC = () => {
e após a função ter de usar:
export default Cart; (além de ter de importar o React)
parece mais simples usar a versão abaixo.
Porém segundo o GPT "Em componentes mais complexos, ou quando você deseja adicionar tipos específicos ao componente,
a primeira abordagem pode ser mais adequada."
*/

// lembrete de não usar mais 4 pontos de espaçamento (em html. Em lógica pura até que fica ok)


  return (
    <>
        <div id='bg' className={`pb-24 pt-32 md:pt-44 bg-gradient-to-b px-5 min-h-[80vh] flex justify-center
        ${theme === 'dark' ? 'from-indigo-950 to-bgdarkblue/80 to-90% text-neutral-200' 
      : 'from-slate-300  via-slate-200 via-10% to-slate-100 to-100% text-stone-900'}  `}>        
        
            <div id='espaço contendo os elementos da página' className='w-11/12 '>
                <h2 className="text-lg font-mono md:text-2xl font-semibold mb-6 ">
					Seu carrinho de compras 🛒
				</h2>
				
                
				{!cart?.items ? (
                    
                    <div className={`flex justify-center items-center h-32 w-full rounded-lg
					${theme === 'dark' ? 'bg-slate-500/30 border-2 border-gray-400' 
					: 'bg-slate-500/30 border-2 border-slate-400'}`}>
                    	<p className="text-lg ">Aguarde...</p>
                    </div> 

				) : (
					cart?.items.length === 0 ? (
						
						<div className={`flex justify-center items-center h-32 w-full rounded-lg
						${theme === 'dark' ? 'bg-slate-500/30 border-2 border-gray-400' 
						: 'bg-slate-500/30 border-2 border-slate-400'}`}>
							<p className="text-lg ">Carrinho  vazio...</p>
						</div>

					) : (

						<>
							<div className='flex flex-col gap-3  place-items-center'>
								<ul id='lista itens carrinho' className="space-y-4"> {cart?.items.sort((a, b) => a.createdAt - b.createdAt).map((item) => (
										
										<li key={item.productId} 
										className={`relative flex flex-col rounded-lg h-36 w-[80vw] max-w-[600px]
										${theme === 'dark' ? 'border-2  bg-black/30 border-slate-400 text-neutral-200' 
										: 'bg-slate-400/50 border-2 border-slate-400'}`}>
											
											<button title='X' 
												onClick={() => removeItem(item.productId)} 
												className={`absolute right-0 w-7 text-center  rounded border-b border-l transition-all duration-300 h-fit 
												${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
												: 'border-slate-900 bg-slate-100/50 hover:bg-slate-300/90 hover:shadow hover:shadow-lime-500'}`}>
												X
											</button>

											<div id='imagem e nome' className='h-fit'>
												<ProductDisplayCart productId={item.productId} />
											</div>

											<div className='h-full relative flex justify-between overflow-hidden'>
												
												<div id='área quantidade' className=" flex flex-col justify-end ml-4 mb-2 text-xs">
													
													<div className='mb-2'>Quantidade :</div> 
													
													<div title='unidades, botões + -' className='flex gap-2'>
															
														<button onClick={() => updateItem(item.productId, -1)}
														className={`border font-bold rounded-full w-6 h-6 leading-none transition-all duration-300
														${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-600 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
														: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
															-
														</button>

														<div title='qtd' className='w-9 px-3 py-1 border rounded-sm text-black bg-slate-100'> {item.quantity}</div>
														
														<button onClick={() => updateItem(item.productId, 1)} 
															className={`border font-bold rounded-full w-6 h-6 leading-none transition-all duration-300
															${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-600 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
															: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
															+
														</button>

													</div>

												</div>



												<div title='valor mobile' className=' basis-1/6 flex justify-end items-end'>
													<div className=' m-2 basis-2/6 flex flex-col justify-center place-items-end gap-1 '>
														<div className='text-xs'>${item.price}</div>
														<div className={`text-lg 
															${theme=='dark'? 'text-emerald-300':'text-slate-500'}`}>${(item.price * item.quantity).toFixed(2)}</div>
													</div>
												</div>

											</div>

										</li>
								
								))}</ul>
								
								<div title='total' className='self-end md:mr-[20vw] mt-4 flex gap-3'>
									<div className='self-end'>total: </div>
									<div className=' text-2xl text-[28px] text-emerald-400'>${Number(cart.total).toFixed(2)}</div>
								</div>

								<div id='botões limpar carrinho e finalizar compra' className="mt-8 flex gap-5 justify-center">
									<button 
										onClick={clearCart} 
										className={`px-5 pb-0.5 pt-1 rounded border-2 transition-all duration-300  text-center 
										${theme === 'dark' ? 'text-neutral-100 border-stone-700 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
										: 'border-2 border-gray-400 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-lime-500'}`}>
										Limpar Carrinho
									</button>
									<Link to={'/purchasecompleted'} onClick={handlePageChangerSmooth} >
										<button
										onClick={clearCart}
										className={`px-5 pb-0.5 pt-1 rounded border-2 transition-all duration-300 text-center 
										${theme === 'dark' ? 'text-slate-800 border-stone-700 bg-emerald-400/90 hover:bg-emerald-300 hover:shadow-black hover:shadow-md' 
										: 'border-2 border-slate-400 bg-emerald-300 hover:bg-green-200 hover: hover:shadow-sm hover:shadow-lime-500'}`}>
										Finalizar compra
										</button>

									</Link>
								</div>
							</div>

						</>

					)

				)}
            </div>

        </div>
    </>
  )
}


