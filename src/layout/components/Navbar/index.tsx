import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Auth/AuthContext";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = async () => {
    auth.signout();
    navigate('/');
  }

  const handlePageChanger = () => {
    window.scrollTo({top: 0, left: 0})
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      const isMenuVisible = sideMenu.style.left === '0%';
      sideMenu.style.left = isMenuVisible ? '-100%' : '-100%'; // Alterna entre mostrar e esconder o menu
    } 
  }

  const handlePageChangerSmooth = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      const isMenuVisible = sideMenu.style.left === '0%';
      sideMenu.style.left = isMenuVisible ? '-100%' : '-100%'; // Alterna entre mostrar e esconder o menu
    } 
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
  }) /* gpt fala pra deixar lastScrollY como dependência... mas ta funcionando bem assim... Não entendo 100% o ciclo de execução do useEffect... */


  const toggleMenu = () => {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      const isMenuVisible = sideMenu.style.left === '0%';
      sideMenu.style.left = isMenuVisible ? '-100%' : '0%'; // Alterna entre mostrar e esconder o menu
    }    
  }

  const handleMobileThemeButtonClick = () => {
    toggleTheme();
    toggleMenu();
  };


  return (
    <div id='header-and-sideMenu'>
      
      <div id='header' 
      style={{ transition: 'opacity 0.3s' }} 
      className={`transition-all duration-500 z-[987] fixed flex items-center border-b h-[80px] w-full text-[16px] text-neutral-900 font-mono 
      ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} 
      ${ theme === 'dark' ? 'border-indigo-300 bg-gradient-to-tr to-violet-900 from-10% from-violet-500 md:bg-gradient-to-r md:from-violet-900 md:from-5% md:via-violet-400 md:to-violet-300' 
      : 'bg-gradient-to-b from-gray-100 from-30% to-gray-200 border-b border-gray-500'} `}>
        
        <div id='Menudaesquerda' className="h-full sm:basis-1/3 md:basis-1/3 flex items-start gap-5">
          
          <div id='imgsaposo'>
            <Link to={'/'} onClick={handlePageChangerSmooth}>
              <img 
              className={` hidden sm:block ml-[2vw] shadow w-[4.5rem] min-h-12 min-w-12 rounded-b-xl border-b-4 border-r-2 transition-all duration-300
              ${theme === 'dark' ? 'shadow-black/35 border-teal-300/50 bg-indigo-300/60 hover:bg-indigo-300/90' 
              : 'hover:shadow-black/80 shadow-violet-900/40 border-stone-800/70 bg-black/10'}`
              } 
              src='/assets/sapososemfundo.png'></img>
            </Link>
          </div>
          
          <div id='botão buscar produtos' 
          className="hidden 
          md:block ml-[1vw] italic text-sm mb-2 self-end
          lg:text-base ">
            <Link to={'/products'} onClick={handlePageChanger}
            className={` px-[1vw] pb-1 pt-0.5 tracking-tight  rounded-sm border-t transition-all duration-300
            ${theme === 'dark' ? 
            `border-neutral-300/80  hover:text-black hover:border-black hover:bg-zinc-100/70 hover:shadow-black hover:shadow
            ${location.pathname.startsWith('/product') ?  'text-black  border-black bg-zinc-100/70 shadow shadow-black' : 'text-neutral-300'}   `
            : `border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500
            ${location.pathname.startsWith('/product') ? 'bg-zinc-800/100 text-emerald-100 shadow-sm shadow-lime-500' : ''}   `}
            `}>
            Buscar produtos
            </Link>
          </div>

        </div>

        <Link title="logo-saposoideiastore" 
        to={'/'} onClick={handlePageChangerSmooth} 
        className="ml-3 h-full flex justify-center py-[5px] md:basis-4/12 md:ml-0 lg:basis-1/3 ">
          <div title="conteiner total, com a borda, w-dependente dos elementos internos" 
          className={`w-[75vw] max-w-[300px] sm:w-fit h-full flex items-center justify-center rounded-lg transition-[400]
          ${theme == 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/80 border border-slate-300/60 shadow-inner shadow-black' 
          :' bg-cyan-800/70 hover:bg-cyan-800  border border-black/40 shadow-inner shadow-gray-800 '}`}> 
            <div title="conteiner p/ modulação da imagem" 
            className="flex justify-center h-full sm:w-[100%] w-[100%] md:w-auto mb-5 md:mb-9 ">
              <div title="imagem em si">
                {theme === 'dark' ? <img src='/assets/saposoideiastore2.png' className=" h-[130%] md:h-[150%] "></img> 
                : <img src='/assets/saposoideiastore2.png' className=' h-[130%] md:h-[150%] '></img>}
              </div>
            </div>
          </div>
        </Link>

  
        <div title='parte à direita do header, sem botão hamburguer' 
        className="basis-1/3 h-full flex justify-end items-start relative">

          {!auth.user && // CASO usuário não logado
            <div id="botões login, crie sua conta"
            className="hidden
            md:flex text-sm gap-3 self-end justify-items-end mb-2 -mr-8
            lg:text-base "> 
              
              <div><Link to={'/login'} onClick={handlePageChanger}
              className={` px-[1.5vw] pb-0.5 pt-1 rounded-sm border-t  transition-all duration-500 
              ${theme === 'dark' ? `border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md
                ${location.pathname.startsWith('/login') ? 'bg-zinc-100/50 shadow-black shadow-md' : ''}` 
              : `border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500
                ${location.pathname.startsWith('/login') ? 'bg-zinc-800 text-emerald-100 shadow-sm shadow-lime-500' : ''}` }`
              }>
                Login</Link></div>
              
              <div><Link to={'/register'} onClick={handlePageChanger}
              className={`mr-1 px-[1vw] pb-0.5 pt-1 rounded-sm border-t transition-all duration-500 tracking-tight
              ${theme === 'dark' ? `border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md
                ${location.pathname.startsWith('/register') ? 'bg-zinc-100/50 shadow-black shadow-md':''}`
              : `border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500
                ${location.pathname.startsWith('/register') ? 'bg-zinc-800 text-emerald-100 shadow-sm shadow-lime-500':''}`}`}>
                Crie sua conta</Link></div>
          
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
                Oi, {auth.user.name}!
              </div>
              
              <div id="parte inferior. minha conta, sair" className="flex mb-1 items-end gap-3 justify-end -mr-10">
                
                <div id="minha conta">
                  <Link to={'/userpreferences'} onClick={handlePageChanger}
                  className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
                  ${theme === 'dark' ? `border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md
                    ${location.pathname.startsWith('/userpreferences') ? 'bg-zinc-100/50 shadow-black shadow-md':''}` 
                  : `border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500
                  ${location.pathname.startsWith('/userpreferences') ? 'bg-zinc-800 text-emerald-100 shadow-sm shadow-lime-500':''}`} `}>
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


        <button id="menuButton" onClick={toggleMenu} className={`md:hidden border px-1 mr-[3vw] text-4xl rounded
          ${ theme == 'dark' ? 'bg-slate-800/50 text-gray-200 border-gray-200/60' : 'border-black'} `}>
          &#9776;
        </button>

      </div>


      <div title="página menu mobile" id="sideMenu" 
      style={{ transition: 'left 0.3s' }} 
      className={`md:hidden fixed top-0 z-[990] left-[-100%] w-full h-full bg-gray-500 visible pointer-events-auto 
      ${ theme === 'dark' ? 'border-indigo-300 bg-gradient-to-tr to-violet-900 from-10% from-violet-500 md:bg-gradient-to-r' 
      : 'bg-gradient-to-b from-gray-100 from-30% to-gray-200 border-b border-gray-500'} `}>
        <div id="flex base elementos" className="flex justify-between">
          
        <div id='saposo-home and theme-button' className="flex items-start">
            
            <div id="saposo-home" className="flex flex-col items-center">
            <Link to={'/'} onClick={handlePageChangerSmooth}>
              <img 
                className={`ml-[2vw] shadow w-[6rem] min-h-12 min-w-12 rounded-b-xl border-b-4  border-r-2 transition-all duration-300
              ${theme === 'dark' ? 'shadow-black/35 border-teal-300/50 bg-indigo-300/60 hover:bg-indigo-300/90' 
              : 'hover:shadow-black/80 shadow-violet-900/40 border-stone-800/70 bg-black/10'}`} 
                src='/assets/sapososemfundo.png'>
              </img>
            </Link>
            <div className={`font-mono ${theme === 'dark' ? 'text-xs mb-5' : 'text-black text-xs mb-5'}`}>--&gt; Home</div>              
            </div>

            


            <button id="1-alternador tema" 
            onClick={handleMobileThemeButtonClick}  
            className={`flex items-center rounded-b transition-all duration-500 ml-4
            ${theme === 'dark' ? ' bg-[#c7e9db]/60 hover:bg-[#c7e9db] text-black shadow shadow-black ' 
            : 'bg-violet-600/60 hover:bg-violet-800/90 text-emerald-100  shadow shadow-black'}`}>
              <div id="imagem" 
              className="w-[30px] mr-1 ml-2 my-1">
                {theme === 'dark' ? 
                  <img src='/assets/themeicon.png'></img> 
                  : <img src='/assets/themeicon2.png'></img>}
              </div>
            </button>
            
                  
          </div>



          <div id="leave-menu and oi, usuário" className="flex flex-col items-end">
            
            <button id="leaveMenu-Button" onClick={toggleMenu} 
            className={` border text-3xl  m-5 px-2  self h-fit  rounded bg-slate-300/65 mr-[3vw]
            ${theme === 'dark' ? 'bg-slate-800/50 text-gray-200 border-gray-200/60' : 'border-black text-slate-700'}`}>
              X
            </button>




            {auth.user &&
              <div id="parte superior. Oi, Usuário" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              className={`bg-gray-400 border flex items-center px- py-3 mt-20 rounded h-fit text-xs mr-3 transform-
              ${theme === 'dark' ? 'border-gray-300' 
                : 'border-gray-800'} `}>
                Oi, {auth.user.name}!
              </div>
            }
          </div>
          
          <ul id="buttons-list" className="absolute ml-10 mt-40 flex flex-col text-center gap-5 text-xl w-[50vw]">

            <li>
              <Link id='botão buscar produtos' 
              to={'/products'}
                className="w-full ">
                  <button onClick={handlePageChanger}
                  className={`italic pb-1 pt-0.5 px-3 w-[45vw] min-w-44 tracking-tight rounded-sm border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm '}   `}>
                    Buscar produtos
                  </button>
              </Link>
            </li>

            {!auth.user &&
              <li>
              <Link id='botão login' 
              to={'/login'}
                className="w-full ">
                  <button onClick={handlePageChanger}
                  className={`italic pb-1 pt-0.5 px-3 w-[45vw] min-w-44 tracking-tight rounded-sm border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm '}   `}>
                    Login
                  </button>
              </Link>
            </li>
            }
            
            {!auth.user &&
              <li>
              <Link id='botão registro' 
              to={'/register'}
                className=" w-full ">
                  <button onClick={handlePageChanger}
                  className={`italic pb-1 pt-0.5 px-3 w-[45vw] min-w-44 tracking-tight rounded-sm border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm '}   `}>
                    Registro
                  </button>
              </Link>
            </li>
            }
            {auth.user &&
              <li>
              <Link id='botão minha conta' 
              to={'/userpreferences'}
                className="w-full ">
                  <button onClick={handlePageChanger}
                  className={`italic pb-1 pt-0.5 px-3 w-[40vw] min-w-44 tracking-tight rounded-sm border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm '}   `}>
                    Minha Conta
                  </button>
              </Link>
            </li>
            }
            
            {auth.user &&
              <li>
              <Link id='botão logout' 
              onClick={handleLogout} to={''}
                className="w-full ">
                  <button onClick={handlePageChangerSmooth}
                  className={`italic pb-1 pt-0.5 px-3 w-[40vw] min-w-44 tracking-tight rounded-sm border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm '}   `}>
                    Sair
                  </button>
              </Link>
            </li>
            }

            

          </ul>

        </div>

      </div>

    </div>
    
    )
}

