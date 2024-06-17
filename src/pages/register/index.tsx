import Footer from "../../layout/components/Footer";
import Navbar from "../../layout/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/Theme/useTheme";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";



export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { theme } = useTheme()
  const api = useApi()


  const handleRegister = async () => {
    if(email && name && password) {
      try {
        api.register(email, name, password)
        navigate('/')
        alert('Registro bem sucedido')
      } catch (error) {
        console.error("Error during register (handleRegister): ", error);
        alert(error)
      }
    }
    else{alert("Insira um email válido, um nome de usuário e uma senha.")
    }
  }



  return (
    <>
      <Navbar/>
      <div className={` min-h-[550px] min-w-[600px] pt-48 pb-40 w-full h-full flex items-center justify-center bg-gradient-to-r 
      ${theme === 'dark' ? 'from-violet-500 via-violet-900 via-25% to-violet-400 to-95' 
      : 'from-emerald-200 via-gray-100 via-[3%] to-white to-100% text-stone-900'} `}>
        <div id='conteiner inteiro' className={` min-h-[550px] min-w-[560px] w-8/12 h-96 rounded-lg overflow-hidden flex items-center justify-center  ${theme === 'dark' ? '' : 'border-2 border-gray-400'} `}>
          <div id='área do formulário' className="min-w-[250px] w-1/3 h-full bg-purple-800 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center bg-violet-200 px-4 w-full rounded-md shadow-lg h-full">
              <div id='img e texto' className="-mt-5 mb-5 font-semibold text-3xl p-2 text-center w-full text-slate-800">
                <div className="w-full flex items-center justify-center ">
                  <img
                    className={` w-[60px]  rounded-full ${theme === 'dark' ? 'bg-violet-500' : 'bg-violet-300'}  p-1 border-4 border-slate-700 `} src="/assets/newUser.png"
                  />
                </div>
                Registro
                <div className="mt-1 text-sm text-slate-500">
                  Crie sua nova conta
                </div>
              </div>
              
              <div id='inputs' className="text-black flex flex-col items-center justify-center gap-2">
                <p className="self-start ml-5">
                  Endereço de e-mail</p>
                <input
                  placeholder="Email"
                  className="mb-1 -mt-2 placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md mx-auto "
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <p className="self-start ml-5">
                  Como você se chama?</p>
                <input
                  placeholder="Seu nome"
                  className="mb-1 -mt-2 placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md mx-auto "
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <p className="self-start ml-5">
                  Crie uma senha de acesso</p>
                <input
                  placeholder="Senha" type="password"
                  className="mb-1 -mt-2 placeholder-gray-500 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md shadow-slate-500 mx-auto "
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button className={` mt-3 text-sm ${theme === 'dark' ? 'bg-indigo-950 text-white' : 'bg-indigo-300 border-2 border-gray-500 text-black'}  w-6/12 p-2 shadow-md  rounded-xl `}
                onClick={handleRegister}
                >
                  Sign up
                </button>
              </div>

            </div>
          </div>
          <div id='bg img do conteiner' className="bg-purple-600 w-2/3 h-full relative bg-register"></div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
