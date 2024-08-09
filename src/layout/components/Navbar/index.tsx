import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Auth/AuthContext";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate();


  const handleLogout = async () => {
    auth.signout();
    navigate('/');
  }

  const handlePageChanger = () => {
    window.scrollTo({top: 0, left: 0})
  }

  const handlePageChangerSmooth = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  // visibilidade do cabeçalho
  const [headerVisible,  setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  useEffect(() => { 
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setHeaderVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }) /* gpt fala pra deixar lastScrollY como dependência... mas ta funcionando bem assim... 
        Não entendo 100% o ciclo de execução do useEffect... */



  const menuButton = document.getElementById('menu-button');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuButton)
  menuButton.addEventListener('click', () => {
    if(navMenu)
    navMenu.classList.toggle('hidden'); // Alterna entre mostrar/esconder o menu
  });


  return ( 
    <div id='Cabeçalho' 
    style={{ transition: 'opacity 0.3s' }} 
    className={`transition-all duration-500 z-[999] fixed flex items-center border-b h-[80px] w-full text-[16px] text-neutral-900 font-mono 
    ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} 
    ${ theme === 'dark' ? 'border-indigo-300 bg-gradient-to-tr to-violet-900 from-10% from-violet-500 md:bg-gradient-to-r md:from-violet-900 md:from-5% md:via-violet-400 md:to-violet-300' 
    : 'bg-gradient-to-b from-gray-100 from-30% to-gray-200 border-b border-gray-500'} `}>
      
      <div id='Menudaesquerda' className="h-full sm:basis-1/3 md:basis-1/3 flex items-start gap-5">
        
        <div id='imgsaposo'>
          <Link to={'/'} onClick={handlePageChangerSmooth}>
            <img 
            className={`hidden sm:block ml-[2vw] shadow transition-shadow duration-300 w-[4.5rem] min-h-12 min-w-12 rounded-b-xl border-b-2 border-l-2 border-r-2 
            ${theme === 'dark' ? 'shadow-black/35 hover:shadow-teal-200 border-stone-700' 
            : 'hover:shadow-black/80 shadow-violet-900/40 border-stone-300'}`
            } 
            src='/assets/saposo.png'></img>
          </Link>
        </div>
        
        <div id='botão buscar produtos' 
        className="hidden 
        md:block ml-[1vw] italic text-sm mb-2 self-end
        lg:text-base ">
          <Link to={'/products'} onClick={handlePageChanger}
          className={` px-[1vw] pb-1 pt-0.5 tracking-tight rounded-sm border-t transition-all duration-300
          ${theme === 'dark' ? 
          'border-neutral-300/80 text-neutral-300 hover:text-black hover:border-black hover:bg-zinc-100/70 hover:shadow-black hover:shadow'
           : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}   
          `}>
          buscar produtos
          </Link>
        </div>

      </div>
      
      <div id='SaposoIdeiaStore texto' 
      className={`basis-1/3 ml-[2%] px-[1%] py-1  text-[170%] 
        sm:ml-[10%] sm:pb-0.5
        md:ml-[0%] md:h-[63%] md:mt-auto md:mb-2 md:text-[3vw] flex items-center justify-center rounded transition-colors duration-300
      ${theme === 'dark' ? 'text-gray-700 bg-zinc-300/50  hover:bg-zinc-100/80' 
      : 'text-emerald-50 bg-zinc-900/80  hover:bg-zinc-800'} `}>
        <Link to={'/'} onClick={handlePageChangerSmooth} className="flex"><div className="font-bold tracking-widest">Saposo</div><div>.ideiaStore</div></Link>
      </div>
      
      <div id='Menudadireita' 
      className="basis-1/3 h-full flex justify-end items-start relative">

        {!auth.user && // CASO usuário não logado
          <div id="botões login, crie sua conta"
          className="hidden
          md:flex text-sm gap-3 self-end justify-items-end mb-2 -mr-8
          lg:text-base "> 
            
            <div><Link to={'/login'} onClick={handlePageChanger}
            className={` px-[1.5vw] pb-0.5 pt-1 rounded-sm border-t  transition-all duration-500 
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              login</Link></div>
            
            <div><Link to={'/register'} onClick={handlePageChanger}
            className={`mr-1 px-[1vw] pb-0.5 pt-1 rounded-sm border-t transition-all duration-500 tracking-tight
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              crie sua conta</Link></div>
        
          </div>
        }

        {auth.user && // CASO usuário logado
          <div id="Menu da direita, primeira parte"
          className="hidden 
          md:grid text-sm h-full gap-1 justify-items-end mr-2
          lg:text-base">
              
            <div id="parte superior. Oi, Usuário" 
            className={`bg-gray-400 border flex items-center px-3 rounded h-fit text-xs mt-3 absolute left-10
            ${theme === 'dark' ? 'border-gray-300' 
              : 'border-gray-800'} `}>
              Oi, {auth.user.name}</div>
            
            <div id="parte inferior. minha conta, sair" className="flex mb-1 items-end gap-3 justify-end -mr-10">
              
              <div id="minha conta">
                <Link to={'/userpreferences'} onClick={handlePageChanger}
                className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
                ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
                : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'} `}>
                Minha Conta
                </Link>
              </div>
              
              <div id="sair" onClick={handleLogout}><Link to={''} onClick={handlePageChangerSmooth}
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
        className={`hidden md:flex items-center rounded-bl transition-all duration-500 
        ${theme === 'dark' ? ' bg-[#c7e9db]/60 hover:bg-[#c7e9db] text-black shadow shadow-black ' 
        : 'bg-violet-600/60 hover:bg-violet-800/90 text-emerald-100  shadow shadow-black'}`}>
            <div id="imagem" 
            className="w-[23px] mr-1 ml-2 my-1">
            {theme === 'dark' ? 
              <img src='/assets/themeicon.png'></img> 
              : <img src='/assets/themeicon2.png'></img>}
            </div>
        </button>
      </div>












      <button id="botão menu" className="md:hidden border border-indigo-300 px-1 mr-2 text-2xl rounded bg-slate-300/65">&#9776;</button>
      

      
      <button id="menu-button" className="block md:hidden text-3xl focus:outline-none">
        &#9776;
      </button>
      <nav id="nav-menu" className="hidden  flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto">
        <ul className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto text-center md:text-left">
          <li><a href="#home" className="block py-2 md:py-0">Home</a></li>
          <li><a href="#about" className="block py-2 md:py-0">Sobre</a></li>
          <li><a href="#products" className="block py-2 md:py-0">Produtos</a></li>
          <li><a href="#contact" className="block py-2 md:py-0">Contato</a></li>
        </ul>
      </nav>
      
      
      
      
      
      
      
      
      
      
      
      <div id='menu-mobile'>
      <div id='Menudadireita' 
      className="hidden basis-1/3 h-full flex justify-end items-start relative">

        {!auth.user && // CASO usuário não logado
          <div id="botões login, crie sua conta"
          className="hidden
          md:flex text-sm gap-3 self-end justify-items-end mb-2 -mr-8
          lg:text-base "> 
            
            <div><Link to={'/login'} onClick={handlePageChanger}
            className={` px-[1.5vw] pb-0.5 pt-1 rounded-sm border-t  transition-all duration-500 
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              login</Link></div>
            
            <div><Link to={'/register'} onClick={handlePageChanger}
            className={`mr-1 px-[1vw] pb-0.5 pt-1 rounded-sm border-t transition-all duration-500 tracking-tight
            ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
            : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'}`}>
              crie sua conta</Link></div>
        
          </div>
        }

        {auth.user && // CASO usuário logado
          <div id="Menu da direita, primeira parte"
          className="hidden 
          md:grid text-sm h-full gap-1 justify-items-end mr-2 bg-slate-600
          lg:text-base">
              
            <div id="parte superior. Oi, Usuário" 
            className={`bg-gray-400 border flex items-center px-3 rounded h-fit text-xs mt-3 absolute left-10
            ${theme === 'dark' ? 'border-gray-300' 
              : 'border-gray-800'} `}>
              Oi, {auth.user.name}</div>
            
            <div id="parte inferior. minha conta, sair" className="flex mb-1 items-end gap-3 justify-end -mr-10">
              
              <div id="minha conta">
                <Link to={'/userpreferences'} onClick={handlePageChanger}
                className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
                ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
                : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'} `}>
                Minha Conta
                </Link>
              </div>
              
              <div id="sair" onClick={handleLogout}><Link to={''} onClick={handlePageChangerSmooth}
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
        className={`hidden md:flex items-center rounded-bl transition-all duration-500 
        ${theme === 'dark' ? ' bg-[#c7e9db]/60 hover:bg-[#c7e9db] text-black shadow shadow-black ' 
        : 'bg-violet-600/60 hover:bg-violet-800/90 text-emerald-100  shadow shadow-black'}`}>
            <div id="imagem" 
            className="w-[23px] mr-1 ml-2 my-1">
            {theme === 'dark' ? 
              <img src='/assets/themeicon.png'></img> 
              : <img src='/assets/themeicon2.png'></img>}
            </div>
        </button>
      </div>

      </div>
    </div>
    )
}

