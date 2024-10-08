import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/Theme/ThemeContext';
import React, { useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { useEffect } from "react";

import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app";
import { firebaseAuth } from "../../firebase/firebaseConfig";
import axiosClient from "../../axiosClient";
import { apiPath } from "../../developmentOrProductionVariables";
import { showToast } from "../../layout/components/Toasts";



export default function Register() {
  const { theme } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(true)


  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
    return regex.test(email)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValidEmail(validateEmail(value))
    if (value == '') {setIsValidEmail(true)}
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    if (value.length > 25) {
      setIsValidName(false)
    } else {
      setIsValidName(true)
    }
  }

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/; // Ajuste do regex
    return regex.test(password);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setIsValidPassword(validatePassword(value))
    if (value == '') {setIsValidPassword(true)}
  }


  const handleRegister = async () => {
    if (!isValidEmail || !isValidName || !isValidPassword) {
      showToast('default', 'Dados inseridos não são válidos. Por favor, corrija-os e tente novamente.', '🐸 🚷', theme, {})
    } else {
      if(email && name && password) {
        const isRegistered = await auth.register('uid', 'backend', email, name, password)
        if (isRegistered) {
          showToast('default', 'Registro bem sucedido', '🐸 ✅', theme, {})
          const isLogged = await auth.signin(email, password);
          if(isLogged) {
            navigate('/');
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          } else {
          showToast('default', 'Registro funcionou, mas não conseguimos realizar o login. Por favor, procure ajuda imediatamente!', '🐸 🚷', theme, {})
          }
        } else {
          showToast('default', 'Registro falhou. Por favor, insira um email, seu nome e uma senha válidos e tente novamente.', '🐸 🚷', theme, {})
        }
      } else {
        showToast('default', 'Insira um email válido, um nome de usuário e uma senha.', '🚷🤔', theme, {})
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
            axiosClient.post(apiPath.createCart, {'uid': authResult.user.uid} )
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
      <div className={`pt-32 md:min-h-[550px] md:min-w-[600px] pb-14 w-full h-full flex items-center justify-center bg-gradient-to-b 
      ${theme === 'dark' ? 'from-indigo-950 to-indigo-500/80 to-100% text-neutral-200' 
      : 'md:from-slate-300  md:via-slate-300 md:via-10% md:to-slate-400 md:to-100% text-stone-900 from-slate-200  via-slate-400 via-30% to-slate-200 to-70%'}  `}>
        
        <div title='conteiner completo, bg-img + formulário' 
        className={` w-10/12 flex flex-col-reverse justify-center rounded-lg overflow-hidden md:w-8/12 md:h-96 md:min-h-[550px] md:min-w-[560px] md:flex-row 
        ${theme === 'dark' ? '' : 'border-2 border-gray-400'} `}>
          
          <div id='área formulário' 
          className="flex flex-col items-center justify-center bg-violet-200 pt-3 md:pt-0  w-full md:w-1/2 rounded-md h-full"> 
            
              
              <div id='imgperfil e texto' className="md:mb-10 font-semibold text-3xl p-2 text-center w-full text-slate-800">
                <div className="w-full flex items-center justify-center ">
                  <img
                    className={` w-[60px] mb-2  rounded-full ${theme === 'dark' ? 'bg-violet-500' : 'bg-violet-300'}  p-1 border-4 border-slate-700 `} src="/assets/newUser.png"
                  />
                </div>
                Registro
                <div className="mb-2 font-mono mt-1 text-sm text-slate-500">
                  Crie sua nova conta
                </div>
              </div>
              
              <div title='inputs' 
              className="md:-mt-5 flex flex-col items-center justify-center gap-2 w-10/12 ">
                
                <input
                  placeholder="Endereço de e-mail"
                  type="email"
                  className={`placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-full  md:w-8/12  pl-4 p-2 shadow-md mx-auto text-black 
                  ${isValidEmail ? 'border-transparent focus:border-slate-500' : 'border-red-500 focus:border-red-400'}`}
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="h-3 flex ">
                  {!isValidEmail && <span className="text-red-500 text-xs text-center">Email inválido</span>}
                </div>
                

                <input
                  placeholder="Como você se chama?"
                  className={`placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-full  md:w-8/12  pl-4 p-2 shadow-md mx-auto text-black
                    ${isValidName ? 'border-transparent focus:border-slate-500' : 'border-red-500 focus:border-red-400'}`}
                  value={name}
                  onChange={handleNameChange}
                />
                <div className="h-3 flex  ">
                  {!isValidName && <span className="text-red-500 text-xs text-center">Máximo de 25 caracteres atingido.</span>}
                </div>




                <input placeholder="Crie uma senha de acesso" 
                type="password" onChange={handlePasswordChange}
                  className={`placeholder-gray-500 shadow-slate-500 text-sm bg-white border-1 rounded-full w-full  md:w-8/12  pl-4 p-2 shadow-md mx-auto text-black
                    ${isValidPassword ? 'border-transparent focus:border-slate-500' : 'border-red-500 focus:border-red-400'}`}
                  value={password}
                />
                
                <div className="h-3 flex justify-center mb-2">
                  {!isValidPassword && <span className=" md:w-8/12 text-red-500 text-xs text-center">Sua senha deve conter ao menos 8 caracteres, e possuir ao menos uma letra.</span>}
                </div>


                <button title="botão registrar"
                onClick={handleRegister}
                className={`mt-3 text-sm w-1/3 p-2 shadow-md rounded-xl
                ${theme === 'dark' ? 'bg-indigo-950 text-white' 
                : 'bg-indigo-300 border-2 border-gray-500 text-black'}  `}>
                  Registrar
                </button>

                <div className="mt-4 md:mt-4 border-t w-8/12 border-slate-400"></div>
                <div className="text-xs text-slate-800  -mb-2 md:-mb-1  ">Quero acessar com minhas redes sociais</div>
                
                <div id="firebaseui-auth-container" className="mb-3 md:mb-0 w-60"></div>
                <div id="loader">Loading...</div>
       

                
                
              </div>

          </div>
          
          <div title='bg img do conteiner' 
          className="md:w-2/4 w-full h-40 md:h-full bg-cover bg-bottom"
          style={{ backgroundImage: `url('/assets/bgreg.jpg')` }} >
          </div>

        </div>
      </div>
    </>
  );
}
