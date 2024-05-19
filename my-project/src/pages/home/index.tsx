import Navbar from "../../layout/components/Navbar";
import ConteinerProduto from "../../layout/components/ConteinersProdutos";
import Footer from "../../layout/components/Footer";
import { useTheme } from "../../context/useTheme";
import ProductDisplay from "../../layout/ProductsDisplay/ProductDisplay";



export default function Home() {
  const { theme } = useTheme();


  return (
    <>
      <Navbar/>
      <div id='background' className={` min-h-[550px] min-w-[600px] w-full flex flex-col gap-5 items-center justify-center bg-gradient-to-b ${theme === 'dark' ? ' to-bgdarkblue/70 from-bgdarkpurple' : 'from-gray-200 via-emerald-100 to-gray-400'}  `}>
        
        <div id="grande caixa que contém a grade" className="mt-32  gap-5 grid grid-cols-3 justify-items-center items-start w-11/12 h-5/6 min-h-[800px]">
          
          <div id="novidades" className="col-span-3 w-full h-40 "><ConteinerProduto/></div>

          <div id="conteiner boas vindas" className="flex flex-col justify-center w-full h-full col-span-2 row-span-5 rounded">
            <div className="text-7xl text-black p-4">
              <img src="assets/saposoideiastore.png"></img>
            </div>
          </div>          
          
          <div id="lista mais vendidos" className={` ${theme === 'dark' ? 'bg-black/50 text-[#c5c0c0]' : 'bg-white/30 text-black'} flex font-mono text-xl justify-center border border-zinc-800 row-span-5 w-full h-full rounded`}><div className="mt-5">lista mais vendidos</div>
            <div id="lista produtos" className=" col-start-3 container rounded-lg flex flex-col gap-4 mt-36 w-fit h-fit">
              <div className=""><ProductDisplay productId={1} /></div>
              <div className=""><ProductDisplay productId={2} /></div>
              <div className=""><ProductDisplay productId={3} /></div>
              <div className=""><ProductDisplay productId={4} /></div>
            </div>
          </div>
          
        </div>

        <div id="big saposo" className="flex justify-center"><img src="assets/saposobig.png" className="w-[60%]"></img></div>
        <div id="caixa do aviso misterioso" className={` mb-10 flex flex-col items-center gap-6 ${theme === 'dark' ? 'bg-[#1d1d1d]' : 'bg-slate-400/30 text-slate-800 shadow-inner border-b border-[6px]'}  shadow-lg shadow-[#874e96] rounded-t-md rounded-bl-[100px] border-t border-r border-[#73ff00] `}>
          <div id="grande sapo de chapéu" className="mx-6 mt-14 mb-4">o grande sapo te viu</div>
            <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
            <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
            <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
            <div id="grande sapo de chapéu" className="mb-4">o grande sapo</div>
            <div id="grande sapo de chapéu" className="mb-10">.</div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

 


