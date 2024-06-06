import { useContext } from 'react'
import Navbar from '../../layout/components/Navbar'
import { AuthContext } from '../../context/Auth/AuthContext'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/Theme/useTheme'

const UserPreferences = () => {
  const auth = useContext(AuthContext)
  const { theme } = useTheme()

  return (
    <>
      <Navbar/>
      <div className='h-screen'>
        <div className='pt-36'>Minha Conta</div>

        Olá {auth.user?.name}, tudo bem?
        <div id="minha conta">
          <Link to={'/cart'} 
          className={`px-2 pb-0.5 pt-1 rounded-sm border-t transition-all duration-500  
          ${theme === 'dark' ? 'border-stone-900  hover:bg-zinc-100/50 hover:shadow-black hover:shadow-md' 
          : 'border-stone-900 hover:bg-zinc-800 hover:text-emerald-100 hover:shadow-sm hover:shadow-lime-500'} `}>
          Carrinho 
          </Link>
        </div>
      </div>
    </>  
  )
}

export default UserPreferences