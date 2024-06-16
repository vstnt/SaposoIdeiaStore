import React from 'react';
import Navbar from '../../layout/components/Navbar';
import Footer from '../../layout/components/Footer';
import { useTheme } from '../../context/Theme/useTheme';
import { useCart } from '../../context/Cart/useCart';
import ProductDisplayCart from '../../layout/ProductsDisplay/ProductDisplayCart';
import { Link } from 'react-router-dom';


const Cart: React.FC = () => {
  const { cart, removeItem, clearCart, updateItem } = useCart()
  const { theme } = useTheme()

  if (!cart) {
	return <div>Carregando carrinho...</div>;
  }

  return (
    <>
        <Navbar/>
        <div id='bg' className={`pb-24 pt-44 bg-gradient-to-b px-5 min-h-[80vh] flex justify-center
        ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
        : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>        
        
            <div id='espaço contendo os elementos da página' className='w-11/12'>
                <h2 className="text-2xl font-semibold mb-4 italic ml-14">
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
							<ul id='lista itens carrinho' className="space-y-4"> {cart?.items.map((item) => (
									
									<li key={item.productId} 
									className={`flex  rounded-lg
									${theme === 'dark' ? 'border-2  bg-black/30 border-slate-400 text-neutral-200' 
									: 'bg-slate-100/90 border-2 border-slate-400'}`}>
										
										<div id='imagem e nome' className='basis-7/12 h-full '>
										<ProductDisplayCart productId={item.productId} truncationN={19} truncationD={21} />
										</div>

										<div className='basis-5/12 flex justify-start '>
											
											<div id='quantidade' className="basis-3/6 self-center text-sm flex ">
												
												<div className='self-center'>Quantidade :</div> 
												<div className='ml-3 px-6 py-1 self-center border rounded-sm text-black bg-slate-100'> {item.quantity}</div>

												<div className=' ml-3 self-center flex flex-col gap-3  place-content-center'>
													<button onClick={() => updateItem(item.productId, 1)} 
													className={`border rounded-full w-6 h-6 leading-none transition-all duration-300
													${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
													: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
														+</button>
													<button onClick={() => updateItem(item.productId, -1)}
													className={`border rounded-full w-6 h-6 leading-none transition-all duration-300
													${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-sm' 
													: 'border-stone-500 text-stone-600 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
														-</button>
												</div>
											</div>

											<div className='basis-2/6 flex flex-col justify-center place-items-end gap-1 '>
												<div className='text-xs'>${item.price}</div>
												<div className='text-xl text-emerald-300'>${item.price * item.quantity}.00</div>
											</div>

											<div className='basis-1/6 flex justify-end'>
												<button 
												onClick={() => removeItem(item.productId)} 
												className={`px-3 py-0.5 rounded border-b border-l transition-all duration-300 h-fit 
												${theme === 'dark' ? 'text-neutral-100 border-stone-900 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
												: 'border-stone-900 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-sm hover:shadow-lime-500'}`}>
												X
												</button>
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
									className={`px-5 pb-0.5 pt-1 rounded border-2 transition-all duration-300  
									${theme === 'dark' ? 'text-neutral-100 border-stone-700 bg-zinc-100/20 hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
									: 'border-2 border-gray-400 bg-slate-100/90 hover:bg-slate-300/90 hover:shadow-lime-500'}`}>
									Limpar Carrinho
								</button>
								<Link to={'/purchasecompleted'} onClick={clearCart}
									className={`px-5 rounded border-2 transition-all duration-300  
									${theme === 'dark' ? 'text-slate-800 border-stone-700 bg-emerald-400/90 hover:bg-emerald-300 hover:shadow-black hover:shadow-md' 
									: 'border-2 border-slate-400 bg-emerald-300 hover:bg-green-200 hover: hover:shadow-sm hover:shadow-lime-500'}`}>
									Finalizar compra
								</Link>
							</div>
						</div>

						

                    </>

                )}
            </div>

        </div>
        <Footer/>    
    </>
  )
}

export default Cart;