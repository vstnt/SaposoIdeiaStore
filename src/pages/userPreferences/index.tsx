import { useContext } from 'react'
import Navbar from '../../layout/components/Navbar'
import { AuthContext } from '../../context/Auth/AuthContext'

const UserPreferences = () => {
  const auth = useContext(AuthContext)

  return (
    <>
      <Navbar/>
      <div className='pt-36'>UserPreferences</div>

      Olá {auth.user?.name}, tudo bem?
    </>  
  )
}

export default UserPreferences