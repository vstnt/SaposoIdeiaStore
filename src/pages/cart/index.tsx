import { useTheme } from '../../context/Theme/ThemeContext';
import { useCart } from '../../context/Cart/CartContext';
import ProductDisplayCart from '../../layout/components/ProductsDisplays/ProductDisplayCart';
import { Link } from 'react-router-dom';


export default function Cart() {
  const { cart, removeItem, clearCart, updateItem } = useCart()
  const { theme } = useTheme()
  console.log(cart)

  if (!cart) {
	return <div>Carregando carrinho...</div>;
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
        ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
        : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>        
        
            <div id='espaço contendo os elementos da página' className='w-11/12 '>
                <h2 className="text-lg text-center md:text-left md:text-2xl font-semibold mb-6 md:mb-4 italic md:ml-14">
					Seu carrinho de Compras
				</h2>
                
                {cart?.items.length === 0 ? (
                    
                    <div className={`flex justify-center items-center h-32 w-full rounded-lg
					${theme === 'dark' ? 'bg-slate-500/30 border-2 border-gray-400' 
					: 'bg-slate-500/30 border-2 border-slate-400'}`}>
                    	<p className="text-lg ">Carrinho  vazio...</p>
                    </div>

                ) : (

                    <>
                        <div className='flex flex-col gap-3'>
							<ul id='lista itens carrinho' className="space-y-4"> {cart?.items.sort((a, b) => a.createdAt - b.createdAt).map((item) => (
									
									<li key={item.productId} 
									className={`flex flex-col md:flex-row  rounded-lg h-44 md:h-fit
									${theme === 'dark' ? 'border-2  bg-black/30 border-slate-400 text-neutral-200' 
									: 'bg-slate-100/90 border-2 border-slate-400'}`}>
										
										<div id='imagem e nome' className='h-1/2 md:basis-7/12 md:h-full  '>
										<ProductDisplayCart productId={item.productId} />
										</div>

										<div className='relative flex-col justify-end h-1/2 md:h-auto md:basis-5/12 flex md:flex-row md:justify-start  overflow-hidden'>
											
											<div id='quantidade' className="-mb-4 md:mb-0 flex ml-1 md:basis-3/6 md:self-center text-xs md:text-sm  ">
												<div className='self-center'>Quantidade :</div> 
												<div className='ml-1 md:ml-3 px-3 md:px-6 py-1 self-center border rounded-sm text-black bg-slate-100'> {item.quantity}</div>

												<div id='+ e -' className='ml-3 self-center flex flex-col gap-1 md:gap-3  place-content-center'>
													<button onClick={() => updateItem(item.productId, 1)} 
													className={`border font-bold rounded-full w-6 h-6 leading-none transition-all duration-300
													${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
													: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
														+</button>
													<button onClick={() => updateItem(item.productId, -1)}
													className={`border font-bold rounded-full w-6 h-6 leading-none transition-all duration-300
													${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
													: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
														-</button>
												</div>
											</div>

											<div id='valor produto' className='hidden basis-2/6 md:flex flex-col justify-center place-items-end gap-1 '>
												<div className='text-xs'>${item.price}</div>
												<div className='text-xl text-emerald-300'>${item.price * item.quantity}.00</div>
											</div>

											<div title='botão X e valor-mobile' className='  basis-1/6 flex justify-between items-end md:justify-end md:items-start'>
												<button 
												onClick={() => removeItem(item.productId)} 
												className={`px-3 py-0.5 rounded border-b border-l transition-all duration-300 h-fit 
												${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
												: 'border-stone-900 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
												X
												</button>

												<div title='valores mobile' className='mr-1 md:mr-0 md:hidden basis-2/6 flex flex-col justify-center place-items-end gap-1 '>
													<div className='text-xs'>${item.price}</div>
													<div className='text-xl text-emerald-300'>${item.price * item.quantity}.00</div>
												</div>
											</div>

										</div>

									</li>
							
							))}</ul>
							
							<div className='self-end mr-[70px] mt-4 flex gap-3'>
								<div className='self-end'>total: </div>
								<div className=' text-3xl text-emerald-300'>${cart.total}</div>
							</div>

							<div id='botões limpar carrinho e finalizar compra' className="mt-8 flex gap-5 justify-center">
								<button 
									onClick={clearCart} 
									className={`px-5 pb-0.5 pt-1 rounded border-2 transition-all duration-300  text-center 
									${theme === 'dark' ? 'text-neutral-100 border-stone-700 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
									: 'border-2 border-gray-400 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-lime-500'}`}>
									Limpar Carrinho
								</button>
								<Link to={'/purchasecompleted'} >
									<button
									onClick={clearCart}
									className={`px-5 pb-0.5 pt-1 rounded border-2 transition-all duration-300 text-center md:h-14
									${theme === 'dark' ? 'text-slate-800 border-stone-700 bg-emerald-400/90 hover:bg-emerald-300 hover:shadow-black hover:shadow-md' 
									: 'border-2 border-slate-400 bg-emerald-300 hover:bg-green-200 hover: hover:shadow-sm hover:shadow-lime-500'}`}>
									Finalizar compra
									</button>

								</Link>
							</div>
						</div>

                    </>

                )}
            </div>

        </div>
    </>
  )
}


