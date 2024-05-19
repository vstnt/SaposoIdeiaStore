import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useTheme } from "../../../context/useTheme";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [lastScrolY, setLastScrollY] = useState(window.scrollY);
  const [headerVisible,  setHeaderVisible] = useState(true);
  const navigate = useNavigate();

  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    await auth.signout();
    window.location.href;
    navigate('/');
  }

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
    <div style={{ position:"fixed", transition: 'opacity 0.3s' }} className={` ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} z-[999] fixed min-h-[90px] max-h-[110px] w-full h-[6.5vw] p-2 text-[17px] flex border-b text-neutral-900 font-mono border-indigo-500 ${ theme === 'dark' ? 'bg-gradient-to-r from-violet-900 from-5% via-violet-400 to-slate-400' : 'bg-gradient-to-r from-white to-emerald-100'} `}>
      
      <div id='menudaesquerda' className="basis-1/3 pl-5  flex items-end gap-5">
        <div id='imgsaposo'>
          <Link to={'/'}><img className={` ${theme === 'dark' ? 'shadow-black hover:shadow-slate-400 hover:shadow-sm' : ' shadow-violet-900 hover:shadow-green-700'} shadow-md   transition-shadow duration-200 w-[6rem] min-h-24 min-w-20 rounded-xl pt-4 `} src='/assets/saposo.png'></img></Link>
        </div>
        <div className="mb-1">
          <Link to={'/products'} className={` px-2 pb-1 pt-0.5 tracking-tight rounded border-t ${theme === 'dark' ? 'text-neutral-300 border-stone-100/30 hover:bg-zinc-400/40' : 'border-stone-900 hover:bg-zinc-500/60'}    transition-colors duration-300 `}>nossos produtos</Link>
        </div>
      </div>
      
      
      <div id='saposoideiastore' className={` basis-1/3 flex items-center justify-center mt-auto rounded px-2 pb-0.5 mb-[5px] text-[3vw] h-[63%] ${theme === 'dark' ? 'text-gray-700 bg-zinc-300/50  hover:bg-zinc-100/70' : 'text-emerald-100 bg-zinc-900/70  hover:bg-zinc-800'}  transition-colors duration-300`}>
        <Link to={'/'} className="flex"><div className="font-bold tracking-widest">Saposo</div><div>.ideiaStore</div></Link>
      </div>

      {!auth.user &&
        <div id='menudadireita' className="basis-1/3 flex gap-7 justify-end items-start">
          <div className="flex flex-col justify-end gap-6 items-end mb-3 mt-5 leading-3">
            <div><Link to={'/login'} className={` px-7 pb-0.5 pt-1 rounded border-t ${theme === 'dark' ? 'border-stone-900 hover:bg-zinc-100/50' : 'border-stone-900 hover:bg-zinc-500/60'} border-stone-900 hover:bg-zinc-100/50 transition-colors duration-300 `}>Login</Link></div>
            <div><Link to={'/register'} className={` px-3 pb-0.5 pt-1 rounded border-t ${theme === 'dark' ? 'border-stone-900 hover:bg-zinc-100/50' : 'border-stone-900 hover:bg-zinc-500/60'} border-stone-900 hover:bg-zinc-100/50 transition-colors duration-300 tracking-tight `}>crie sua conta</Link></div>
          </div>
          <button id='alternador tema' onClick={toggleTheme} className={`  -mt-2 w-11 text-[10px] flex flex-col items-center ${theme === 'dark' ? 'bg-[#c7e9db] text-black shadow shadow-black' : 'bg-violet-600 text-emerald-100 border border-black shadow shadow-black'}  rounded-b `}>
              <div>tema</div>
              <div className="-mt-[6px]">
                {theme === 'light' ? <div className="tracking-[0.2em]">roxo</div> : 'claro'}
              </div>
              {theme === 'dark' ? <img src='/assets/themeicon.png' className='w-[26px] -mt-1'></img> : <img src='/assets/themeicon2.png' className='-mt-1 w-[26px]'></img>}
          </button>
        </div>
      }
      {auth.user &&
        <div id='menudadireita' className="basis-1/3 flex gap-7 justify-end items-start">
        <div className="flex flex-col justify-end gap-6 items-end mb-3 mt-5 leading-3">
        <div>Logado como {auth.user.name}, <button onClick={handleLogout} className="px-7 pb-0.5 pt-1 rounded border-t border-stone-300/60 hover:bg-zinc-100/50 transition-colors duration-300">Sair.</button></div>
          <div><Link to={'/userpreferences'} className="px-3 pb-0.5 pt-1 rounded border-t border-stone-300/60 hover:bg-zinc-100/50 transition-colors duration-300 tracking-tight">Minha conta</Link></div>
        </div>
        <button id='alternador tema' onClick={toggleTheme} className={`  -mt-2 w-11 text-[10px] flex flex-col items-center ${theme === 'dark' ? 'bg-[#c7e9db] text-black shadow shadow-black' : 'bg-violet-600 text-emerald-100 border border-black shadow shadow-black'}  rounded-b `}>
            <div>tema</div>
            <div className="-mt-[6px]">
              {theme === 'light' ? <div className="tracking-[0.2em]">roxo</div> : 'claro'}
            </div>
            {theme === 'dark' ? <img src='/assets/themeicon.png' className='w-[26px] -mt-1'></img> : <img src='/assets/themeicon2.png' className='-mt-1 w-[26px]'></img>}
        </button>
      </div>
      }
    </div>
    )
}