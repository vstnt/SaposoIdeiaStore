import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Auth/AuthContext";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false)

  const handlePageChanger = () => {
    window.scrollTo({top: 0, left: 0})
    if (menuVisible) {
      toggleMenu();
    } 
  }

  const handlePageChangerSmooth = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    if (menuVisible) {
      toggleMenu();
    }
  }

  /* Visibilidade do cabeçalho; 
  Não entendo 100% o ciclo de execução do useEffect... (gpt fala pra deixar lastScrollY como dependência... mas ta funcionando bem assim... */
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
  })  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);

    // Alternancia mostrar-esconder menu
    //const isMenuVisible = menu.style.top === '0%';
    //menu.style.top = isMenuVisible ? '-100%' : '0%';

    // Botão - efeito toggle
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    if (!menuVisible) {
      bar1?.classList.add("-rotate-45", "translate-y-1");
      bar2?.classList.add("opacity-0");
      bar3?.classList.add("rotate-45", "-translate-y-2");
    } else {
      bar1?.classList.remove("-rotate-45", "translate-y-1");
      bar2?.classList.remove("opacity-0");
      bar3?.classList.remove("rotate-45", "-translate-y-2");
    }

  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      toggleMenu(); // Fecha o menu se o clique for fora
    }
  };
  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  
  // OLD
  const handleMobileThemeButtonClick = () => {
    toggleTheme();
    toggleMenu();
  };
  const handleLogout = async () => {
    auth.signout();
    navigate('/');
    if (menuVisible) {
      toggleMenu();
    }
  }


  return (
    <div title='Header & Menu em lista'>
      
      <div title='Header' ref={headerRef} 
      style={{ transition: 'opacity 0.3s' }} 
      className={`h-[45px] transition-all duration-500 z-[987] fixed flex justify-between w-full text-[16px] text-neutral-900 font-mono 
      ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} 
      ${ theme === 'dark' ? '':'bg-gradient-to-b from-gray-100 from-30% to-gray-200 '} `}>
        
        <div title='hamburguer, md:logo,searchbox' className=" pl-4 basis-1/5 md:pl-7 md:basis-7/12 lg:basis-6/12 flex items-center justify-between">

          <div title="hamburguer" id="hamburguer" className="cursor-pointer flex flex-col justify-center gap-[5px] p-2 -mx-2" onClick={toggleMenu}>
            <div id="bar1" className="w-[19px] h-[1px] bg-gray-800 transition-all duration-[400ms]"></div>
            <div id="bar2" className="w-[13px] h-[1px] bg-gray-800 transition-all duration-[400ms]"></div>
            <div id="bar3" className="w-[19px] h-[1px] bg-gray-800 transition-all duration-[400ms]"></div>
          </div>

          <Link title="logo-md" 
          to={'/'} onClick={handlePageChangerSmooth} 
          className=" h-full justify-center py-[8px] hidden md:flex">
            <div title="conteiner total, com a borda, w-dependente dos elementos internos" 
            className={`h-full flex items-center justify-center
            ${theme == 'dark' ? '  ' 
            :'  '}`}> 
              <div title="conteiner p/ modulação da imagem" 
              className="mt-1 flex justify-center h-full w-[100%] ">
                <div title="imagem em si">
                {theme === 'dark' ? <img src='/assets/saposoideiastore2.png' className=" h-[130%]"></img> 
                : <img src='/assets/sphera3.png' className=' h-[88%]'></img>}
                </div>
              </div>
            </div>
          </Link>

          <div title='searchbox-md' className="hidden md:flex basis-3/6 items-center justify-start">
          <div className="relative w-full">
            <input type="search" 
            className={`bg-white pr-7 rounded border border-slate-400/70 shadow-inner w-full
            ${theme === 'dark' ? '' : ''}`} 
              placeholder="">  
            </input>

            <div title='botão pesquisar' className="flex items-center h-full  absolute right-3 top-0">
              <img src='/assets/search.png' className='h-[60%]' />
            </div>
          </div> 

              
          </div>

        </div>

        <Link title="sm:logo" 
        to={'/'} onClick={handlePageChangerSmooth} 
        className=" h-full flex justify-center py-[8px]  basis-3/5 md:hidden">
          <div title="conteiner total, com a borda, w-dependente dos elementos internos" 
          className={`h-full flex items-center justify-center
          ${theme == 'dark' ? '  ' 
          :'  '}`}> 
            <div title="conteiner p/ modulação da imagem" 
            className="mt-1 flex justify-center h-full w-[100%] ">
              <div title="imagem em si" className="flex items-center">
                {theme === 'dark' ? <img src='/assets/saposoideiastore2.png' className=" h-[130%]"></img> 
                : <img src='/assets/sphera3.png' className=' h-[80%]'></img>}
              </div>
            </div>
          </div>
        </Link>

        <div title='sacola, sm:botãoPesquisar, md:avatarUsuário' className="md:gap-9 flex justify-end items-center h-full basis-1/5 md:basis-1/3 font-sans">
          
          <div title='botãoPesquisar' className="flex items-center h-full mr-6 md:hidden">
            <Link to={'/products'} onClick={handlePageChanger} className="flex items-center h-full">
              <img src='/assets/search.png' className='h-[40%]' />
            </Link>
          </div>

          <Link title="sacola" to={'/cart'} onClick={handlePageChanger} className="flex items-center h-full mr-4 md:mr-0">
            <img src='/assets/shopping bag.png' className='h-[40%] '></img>
          </Link> 
 
          <Link title="avatarUsuário" to={'/login'} onClick={handlePageChanger} className="items-center h-full hidden md:flex mr-36">
              <img src='/assets/user.png' className='h-[37%] '></img>
          </Link>
          
        </div>

        <div title='OLD parte à direita do header, sem botão hamburguer' 
        className="basis-1/3 h-full /flex justify-end items-start relative hidden">

          {!auth.user &&
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
          
          {auth.user &&
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
                


                <div title="carrinho">
                  <Link to={'/cart'} onClick={handlePageChanger}
                  className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
                  ${theme === 'dark' ? `border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md
                    ${location.pathname.startsWith('/cart') ? 'bg-zinc-100/50 shadow-black shadow-md':''}` 
                  : `border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500
                  ${location.pathname.startsWith('/cart') ? 'bg-zinc-800 text-emerald-100 shadow-sm shadow-lime-500':''}`} `}>
                  Carrinho 🛒
                  </Link>
                </div>

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

      </div>

      <div title="Menu em lista" id="menu" ref={menuRef} 
      style={{transition: 'top 0.4s, opacity 0.3s'}} 
      className={`fixed ${menuVisible ? 'top-0' : 'top-[-100%]'} 
      z-[986] left-0 w-[18rem]  mt-[45px] bg-gray-200 flex flex-col visible pointer-events-auto border-b border-r 
      border-black text-black
      ${ headerVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} `}>
        
        <div title='lista itens do menu, menos icones do final' className="flex flex-col">
          <Link to={'/login'} onClick={handlePageChangerSmooth} className=" w-full h-14 border-b shadow-inner border-black flex items-center pl-10 hover:bg-gray-300 transition-all duration-300">Login</Link>
          <Link to={'/register'} onClick={handlePageChangerSmooth} className="w-full h-14 border-b border-black flex items-center pl-10 hover:bg-gray-300 transition-all duration-300">Crie sua conta</Link>
          <Link to={'/products'} onClick={handlePageChangerSmooth} className="w-full h-14 border-b border-black flex items-center pl-10 hover:bg-gray-300 transition-all duration-300">Encontre seu print</Link>
          <Link to={'/'} onClick={handlePageChangerSmooth} className="w-full h-14 border-b border-black flex items-center pl-10 hover:bg-gray-300 transition-all duration-300">Contato</Link>
          <Link to={'/'} onClick={handlePageChangerSmooth} className="w-full h-14 border-b border-black flex items-center pl-10 hover:bg-gray-300 transition-all duration-300">Sobre</Link>
        </div>
        
        <div title='fileira de icones, linkedin, github, wpp' className="w-full h-14 flex justify-center items-center gap-6">
          <Link title="Linkedin icon" to={'https://www.linkedin.com/in/ricardo-mass/'} className="h-8 w-8 flex justify-center items-center">
            <div className="h-[55%] flex justify-center">
              <img src='/assets/linkedin-black.png'></img>
            </div>
          </Link>                
          <Link title="Github icon" to={'https://github.com/vstnt'} className="h-8 w-8 flex justify-center items-center">
            <div className="h-[55%] flex justify-center">
              <img src='/assets/github-black.png'></img>
            </div>
          </Link> 
          <Link title="Whatsapp icon" to={'https://wa.me/message/B6TFIBMN7YE2H1'} className="h-8 w-8 flex justify-center items-center">
              <div className="h-[55%] flex justify-center">
                <img src='/assets/whatsapp-black.png'></img> 
              </div>
          </Link>
        </div>

      </div>


      <div title="OLD - SideMenu saposo antigo, que era apenas para mobile" 
      style={{ transition: 'left 0.3s' }} className={`md:hidden fixed top-0 z-[990] left-[-100%] w-full h-screen bg-gray-500 
      visible pointer-events-auto 
      ${ theme === 'dark' ? 'border-indigo-300 bg-gradient-to-tr from-indigo-900 to-indigo-700 to-80% text-neutral-200' 
      : 'bg-gradient-to-bl from-slate-400 via-20% via-slate-300  to-slate-200 to-100% border-b border-gray-500'} `}>
        <div id="todos os elementos" className="flex justify-between">
          
          <div title='saposo-home and theme-button, oi usuário' className="flex items-start"> 
            <div className="flex flex-col items-center">
              
              <Link title='Sapo-home' to={'/'} onClick={handlePageChangerSmooth}>
                <img 
                  className={`ml-[2vw] shadow w-[6rem] min-h-12 min-w-12 rounded-b-xl border-b-4  border-r-2 transition-all duration-300
                ${theme === 'dark' ? 'shadow-black/35 border-teal-300/50 bg-indigo-300/60 hover:bg-indigo-300/90' 
                : 'hover:shadow-black/80 shadow-violet-900/40 border-stone-800/70 bg-black/10'}`} 
                  src='/assets/sapososemfundo.png'>
                </img>
              </Link>

              <div title="txt home" className={`font-mono ${theme === 'dark' ? 'text-xs mb-5' : 'text-black text-xs mb-5'}`}>--&gt; Home</div> 
              
              {auth.user &&
              <div title="Oi, Usuário" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              className={`bg-gray-400 self-start ml-3 border flex items-center  py-3 mt-14 rounded h-fit text-xs mr-3
              ${theme === 'dark' ? 'border-gray-300' 
                : 'border-gray-800'} `}>
                Oi, {auth.user.name}!
              </div>
              } 

            </div>         
          </div>

          <div title="leave-menu" className="flex flex-col items-end">
            
            <button id="leaveMenu-Button" onClick={toggleMenu} 
            className={` border text-4xl text-[36px] m-5 px-2  self h-fit  rounded-lg shadow bg-slate-300/65 mr-[3vw]
            ${theme === 'dark' ? 'bg-slate-800/50 text-gray-300 border-gray-400/80  shadow-black' : 'border-slate-500  shadow-black text-slate-600'}`}>
              X
            </button>

            <button id="1-alternador tema" 
            onClick={handleMobileThemeButtonClick}  
            className={`flex items-center rounded transition-all duration-500 mr-[2.5vw] mt-2
            ${theme === 'dark' ? ' bg-emerald-200/90 hover:bg-[#c7e9db] text-black shadow shadow-black ' 
            : 'bg-violet-600/50 hover:bg-violet-800/90 text-emerald-100  shadow shadow-black'}`}>
              <div id="imagem" 
              className="w-[30px] mr-1 ml-2 my-1">
                {theme === 'dark' ? 
                  <img src='/assets/themeicon.png'></img> 
                  : <img src='/assets/themeicon2.png'></img>}
              </div>
            </button>

          </div>
          
          <ul title="buttons-list" className="absolute right-0 mt-[180px] mr-5 flex flex-col text-center gap-6 text-2xl w-[65vw] ">

            <li>
              <Link id='botão buscar produtos' 
              to={'/products'}
                className="w-full ">
                  <button onClick={handlePageChanger}
                  className={`italic pb-1 pt-0.5 px-3 w-[100%] max-w-[300px] tracking-tight rounded border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-black shadow-md'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 shadow-black shadow-md'}   `}>
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
                    className={`italic pb-1 pt-0.5 px-3 w-[100%] max-w-[300px] tracking-tight rounded border-t transition-all duration-300
                    ${theme === 'dark' ? 
                    ' text-black border-black bg-zinc-100/70 shadow-black shadow-md'
                    : 'border-stone-900 text-emerald-50 bg-zinc-800/80 hover:shadow-sm shadow-black shadow-md'}   `}>
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
                    className={`italic pb-1 pt-0.5 px-3 w-[100%] max-w-[300px] tracking-tight rounded border-t transition-all duration-300
                    ${theme === 'dark' ? 
                    ' text-black border-black bg-zinc-100/70 shadow-black shadow-md'
                    : 'border-stone-900 text-emerald-50 bg-zinc-800/80 shadow-black shadow-md'}   `}>
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
                    className={`italic pb-1 pt-0.5 px-3 w-[100%] max-w-[300px] tracking-tight rounded border-t transition-all duration-300
                    ${theme === 'dark' ? 
                    ' text-black border-black bg-zinc-100/70 shadow-black shadow-md'
                    : 'border-stone-900 text-emerald-50 bg-zinc-800/80 shadow-black shadow-md'}   `}>
                      Minha Conta
                    </button>
                </Link>
              </li>
            }

            {auth.user &&
              <li>
                <Link id='botão carrinho' 
                to={'/cart'}
                  className="w-full ">
                    <button onClick={handlePageChanger}
                    className={`italic pb-1 pt-0.5 px-3 w-[100%] max-w-[300px] tracking-tight rounded border-t transition-all duration-300
                    ${theme === 'dark' ? 
                    ' text-black border-black bg-zinc-100/70 shadow-black shadow-md'
                    : 'border-stone-900 text-emerald-50 bg-zinc-800/80 shadow-black shadow-md'}`}>
                      Carrinho 🛒
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
                  className={`italic pb-1 pt-0.5 px-3 w-[50%] max-w-[150px]  tracking-tight rounded border-t transition-all duration-300
                  ${theme === 'dark' ? 
                  ' text-black border-black bg-zinc-100/70 shadow-red-600 shadow-md'
                  : 'border-stone-900 text-emerald-50 bg-zinc-800/80 shadow-red-600 shadow-md'}   `}>
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

