import { Link } from 'react-router-dom'
import { useTheme } from '../../context/Theme/ThemeContext';
import { useAuth } from '../../context/Auth/AuthContext';

// const UserPreferences = () => {      poderia usar desse jeito. Acho que não tem diferença. Mas agr estou padronizando meu uso
export default function UserPreferences() {   // assim fica mais limpo.
  const { theme } = useTheme()
  const auth = useAuth()


  return (
    <>
      <div className={`pb-24 pt-44 bg-gradient-to-b px-5 min-h-[80vh]
      ${theme === 'dark' ? 'from-bgdarkpurple to-bgdarkblue/80 to-70% text-neutral-200' 
      : 'from-emerald-300 via-gray-100 via-[6%] to-white to-100% text-stone-900'}  `}>
        
        <div className='flex flex-col place-items-center'>

          <div className='text-3xl'>Minha Conta</div>

          <div className='mt-10'>Olá {auth.user?.name}, tudo bem?</div>
          <div className='mt-10'>Olá {auth.user?.email}</div>
          <div className='mt-10'>Olá {auth.user?.id}</div>
          
          <div id="botão ir para o carrinho" className='mt-10'><Link to={'/cart'} 
            className={`px-2 py-1 rounded-sm border transition-all duration-300  
            ${theme === 'dark' ? 'border-stone-900 bg-indigo-600/70  hover:bg-zinc-100/30 hover:shadow-black hover:shadow-md' 
            : 'border-stone-400 bg-slate-300 hover:bg-zinc-500 hover:text-emerald-100 hover:shadow-md hover:shadow-black'} `}>
            Ir para seu Carrinho 
            </Link>
          </div>
          
        </div>
        
      </div>
    </>  
  )
};

// export default UserPreferences;