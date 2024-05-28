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
    <div id='Cabeçalho' 
    style={{ transition: 'opacity 0.3s' }} 
    className={`transition-all duration-500 z-[999] fixed flex items-start border-b min-h-[90px] max-h-[110px] w-full h-[6.5vw] text-[16px]  text-neutral-900 font-mono 
    ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} 
    ${ theme === 'dark' ? 'border-indigo-500 bg-gradient-to-r from-violet-900 from-5% via-violet-400 to-slate-400' 
    : 'bg-gradient-to-b from-gray-100 from-30% to-gray-200 border-b border-gray-500'} `}>
      
      <div id='Menudaesquerda' className="h-full basis-1/3 flex items-start gap-5">
        
        <div id='imgsaposo'>
          <Link to={'/'}>
            <img 
            className={`ml-9 shadow transition-shadow duration-300 w-[4.5rem] min-h-12 min-w-12 rounded-b-xl border-b-2 border-l-2 border-r-2 
            ${theme === 'dark' ? 'shadow-black/35 hover:shadow-teal-200 border-stone-700' 
            : 'hover:shadow-black/80 shadow-violet-900/40 border-stone-300'}`
            } 
            src='/assets/saposo.png'></img>
          </Link>
        </div>
        
        <div id='botão buscar produtos' className="italic text-lg mb-2 ml-14 self-end  ">
          <Link to={'/products'} 
          className={` px-3 pb-1 pt-0.5 tracking-tight rounded-sm border-t transition-all duration-300
          ${theme === 'dark' ? 
          'border-neutral-300/80 text-neutral-300 hover:text-black hover:border-black hover:bg-zinc-100/70 hover:shadow-black hover:shadow'
           : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}   
          `}>
          buscar produtos
          </Link>
        </div>

      </div>
      
      <div id='SaposoIdeiaStore' 
      className={` basis-1/3 flex items-center justify-center mt-auto rounded px-2 pb-0.5 mb-2 text-[3vw] h-[63%] transition-colors duration-300
      ${theme === 'dark' ? 'text-gray-700 bg-zinc-300/50  hover:bg-zinc-100/80' : 'text-emerald-100 bg-zinc-900/80  hover:bg-zinc-800'} `}>
        <Link to={'/'} className="flex"><div className="font-bold tracking-widest">Saposo</div><div>.ideiaStore</div></Link>
      </div>

      <div id='Menudadireita' 
      className="basis-1/3 h-full flex justify-end items-start  ">

        {!auth.user && <div id="2)botões - login; crie sua conta" // CASO usuário não logado
        className="flex gap-3 self-end justify-items-end mb-2 -mr-8 "> 
            
            <div><Link to={'/login'} 
            className={` px-6 pb-0.5 pt-1 rounded-sm border-t  transition-all duration-500 
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              login</Link></div>
            
            <div><Link to={'/register'} 
            className={` px-4 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500 tracking-tight
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              crie sua conta</Link></div>
        
        </div>
        }

        {auth.user && // CASO usuário logado
          <div id="Menu da direita, primeira parte"
          className="h-full grid gap-1 justify-items-end mr-2  ">
              
            <div id="parte superior. Oi, Usuário" 
            className={`bg-gray-400 border  flex items-center px-3 rounded h-fit text-xs mr-56 mt-3
            ${theme === 'dark' ? 'border-gray-300' 
              : 'border-gray-800'} `}>
              Oi, {auth.user.name}</div>
            
            <div id="parte inferior. minha conta, sair" className="flex mb-1 items-end gap-3 justify-end -mr-10">
              
              <div id="minha conta"><Link to={'/userpreferences'} 
              className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
              ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
              : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'} `}>
                Minha Conta</Link>
              </div>
              
              <div id="sair" onClick={handleLogout}><Link to={''} 
              className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500
              ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
              : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}   `}>
                Sair</Link>   
              </div>
              
            </div>

          </div>
        }

        <button id="1-alternador tema" 
        onClick={toggleTheme} 
        className={`flex items-center rounded-bl transition-all duration-500 
        ${theme === 'dark' ? ' bg-[#c7e9db]/60 hover:bg-[#c7e9db] text-black shadow shadow-black ' 
        : 'bg-violet-800/70 hover:bg-violet-800/90 text-emerald-100  shadow shadow-black'}`}>
            <div id="imagem" 
            className="w-[23px] mr-1 ml-2 my-1">
            {theme === 'dark' ? 
              <img src='/assets/themeicon.png'></img> 
              : <img src='/assets/themeicon2.png'></img>}
            </div>
        </button>
        

      </div>
    </div>
    )
}