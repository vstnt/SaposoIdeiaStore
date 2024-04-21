import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [lastScrolY, setLastScrollY] = useState(window.scrollY);
  const [headerVisible,  setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrolY) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrolY) {
        setHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  })

  return (
    <div style={{ transition: 'opacity 0.3s', zIndex: '999', minHeight: '90px', maxHeight: '110px' }} className={` ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} text-[17px] fixed flex text-neutral-900 font-mono justify-between border-b border-indigo-500 w-full h-[6.5vw] p-2 bg-gradient-to-r from-violet-900 from-5% via-violet-400 to-slate-400 `}>
      <div id='menudaesquerda' className="flex items-end gap-5">
        <div id='imgsaposo'>
          <Link to={'/'}><img className=" shadow-md shadow-black hover:shadow-md hover:shadow-slate-400 transition-shadow duration-500 w-[6rem] min-h-24 min-w-20 rounded-xl pt-4" src='/assets/saposo.png'></img></Link>
        </div>
        <div className="mb-1">
          <Link to={'/products'} className="px-2 pb-1 pt-0.5 tracking-tight rounded border-t text-neutral-300 border-stone-300/30 hover:bg-zinc-400/40 transition-colors duration-300">nossos produtos</Link>
        </div>
      </div>
      <div id='saposoideiastore' className="flex items-center mt-auto rounded px-2 pb-0.5 mr-16 text-gray-700 bg-zinc-300/50 transition-colors duration-300 hover:bg-zinc-100/70 " style={{ fontSize: '3vw', height: '63%' }}>
        <Link to={'/'} className="flex"><div className="font-bold tracking-widest">Saposo</div><div>.ideiaStore</div></Link>
      </div>
      <div id='menudadireita' className="flex flex-col justify-end gap-6 items-end mb-3 leading-3">
        <div><Link to={'/login'} className="px-7 pb-0.5 pt-1 rounded border-t border-stone-300/60 hover:bg-zinc-100/50 transition-colors duration-300">Login</Link></div>
          <div><Link to={'/register'} className="px-3 pb-0.5 pt-1 rounded border-t border-stone-300/60 hover:bg-zinc-100/50 transition-colors duration-300 tracking-tight">crie sua conta</Link></div>
      </div>
    </div>
    )
}