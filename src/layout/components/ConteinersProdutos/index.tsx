import { Link } from "react-router-dom";
import { useTheme } from "../../../context/useTheme";

export default function ConteinerProduto() {
  const { theme } = useTheme()

  return (
    <div className={` ${theme === 'dark' ? 'bg-black/50 text-[#c5c0c0]' : 'bg-white/30 text-black'} bg-black border border-zinc-800 rounded-md text-[17px] flex text-[#c5c0c0] font-mono justify-between  w-full h-full p-2 `}>

      <div id='novidadestexto' className={` mt-3 ml-1 flex items-center rounded px-2 pt-0.5 pb-0.5 mr-16 text-stone-300/90  transition-colors duration-300 ${theme === 'dark' ? 'hover:bg-zinc-600/20 bg-zinc-900/50' : 'hover:bg-zinc-600 bg-zinc-900/60'}  text-[2.3vw] h-[22%] `}>
        <Link to={'/'} className="flex"><div className="font-bold tracking-widest">novidades</div><div>.novelties.nouvelles</div></Link>
      </div>
      <div id='menudadireita' className="flex flex-col justify-start gap-6 items-end mt-3 mb-3 leading-3">
        <div><Link to={'/register'} className={` px-3 pb-0.5 pt-1 mr-4 rounded border-b ${theme === 'dark' ? 'hover:bg-zinc-100/50' : 'hover:bg-zinc-400/50'} border-stone-300/60  transition-colors duration-300 tracking-tight `}>acesse a lista completa</Link></div>
      </div>
    </div>
    )
  }