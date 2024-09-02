import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/Theme/ThemeContext';
import { useAuth } from "../../context/Auth/AuthContext";

import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app";
import { firebaseAuth } from "../../firebase/firebaseConfig";



export default function Login() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth()
  const navigate = useNavigate();


  const handleLogin = async () => {
    if(!email || !password) {
      alert("Insira um nome de usuário e uma senha.") 
    } else {
      const isLogged = await auth.signin(email, password);
      if(isLogged) {
        navigate('/');
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      }
      else {alert("Login falhou. Por favor, cheque suas credenciais e tente novamente.")
      }
    }
  }

  // bloco para lidar com o botão do firestore para auth via google. 
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth); // Assim inicializamos a FirebaseUI.

    var uiConfig = { 
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function(authResult: any) {
          auth.googleSignin(authResult.user)
          const isNewUser = authResult.additionalUserInfo.isNewUser
          if (isNewUser) {
            auth.register(authResult.user.uid, 'firebase', authResult.user.email, authResult.user.displayName, null)
          }
          navigate('/');
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          return false;
        },
        signInFailure: (error: any) => {
          console.error('Erro no login:', error);
          return handleSignInFailure(error);
        },

        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader')!.style.display = 'none';
        },
      },

    };

    ui.start('#firebaseui-auth-container', uiConfig); // Isso renderiza a FirebaseUI Auth interface

    return () => ui.reset();
  }, []); // dependência vazia assim significa montar apenas uma vez, quando o componente que o contém é montado.

  const handleSignInFailure = (error: any) => {
    console.error('Erro durante o login:', error);
  };



  return (
    <>
      <div id='bg' className={`pt-32 md:min-h-[550px] md:min-w-[600px] pb-14 w-full h-full flex items-center justify-center bg-gradient-to-r 
      ${theme === 'dark' ? 'from-violet-500 via-violet-900 via-25% to-violet-400 to-95%' 
      : 'from-emerald-200 via-gray-100 via-[3%] to-white to-100% text-stone-900'}  `}> 
        
        <div title='conteiner completo, bg-img + formulário' 
        className={` w-10/12 flex flex-col justify-center rounded-lg overflow-hidden md:w-8/12 md:h-96 md:min-h-[550px] md:min-w-[560px] md:flex-row 
        ${theme === 'dark' ? '' : 'border-2 border-gray-400'} `}>
          
          <div id='bg-img' 
          style={{ backgroundImage: `url('/assets/bglogin.jpg')`}} 
          className="md:w-2/4 w-full h-40 md:h-full bg-cover bg-bottom">
          </div>

          <div title="área formulário" 
          className="flex flex-col items-center justify-center bg-violet-200 pt-3 md:pt-0  w-full md:w-1/2 rounded-md h-full">
            
            <div title='imgperfil e texto' className="md:mb-10 font-semibold text-3xl p-2 text-center w-full text-slate-800">
              <div className="w-full flex items-center justify-center ">
                <img
                  className={` w-[60px] mb-2 rounded-full 
                    ${theme === 'dark' ? 'bg-emerald-300 border-slate-200' : 'bg-emerald-100 border-slate-400'}  p-1 border-4  `}
                  src="/assets/login.png"
                />
              </div>
              <div>Log in</div>
              <div className="font-mono mt-1 text-sm text-slate-600">
                Entre na sua conta
              </div>
            </div>
            
            <div title='inputs'
            className="md:-mt-5 flex flex-col items-center justify-center gap-4 w-10/12">
              <input
                placeholder="Email"
                className="placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-full  md:w-8/12  pl-4 p-2 shadow-md mx-auto text-black"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                placeholder="Senha" 
                type="password"
                className="placeholder-gray-500 text-sm bg-white border-1 rounded-full w-full md:w-8/12 pl-4 p-2 shadow-md shadow-slate-500 mx-auto text-black"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button 
                onClick={handleLogin}
                className={` mt-3 text-sm w-1/3 p-2 shadow-md rounded-xl
                ${theme === 'dark' ? 'bg-indigo-950 text-white' : 'bg-indigo-300 border-2 border-gray-500 text-black'} `}>
                Entrar
              </button>
              <div className="mt-2 md:mt-4 border-t w-8/12 border-slate-400"></div>
              <div className="text-xs text-slate-800 -mt-3 -mb-5 md:-mb-1  ">Quero acessar com minhas redes sociais</div>
              
              <div id="firebaseui-auth-container" className="mb-3 md:mb-0 w-60"></div>
              <div id="loader">Loading...</div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
