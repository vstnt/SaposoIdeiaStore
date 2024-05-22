import Footer from "../../layout/components/Footer";
import Navbar from "../../layout/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/useTheme";

export default function Register() {
  const navigate = useNavigate();
  function redirect(link: string) {
    navigate(link);
  }

  const { theme } = useTheme()

  return (
    <>
      <Navbar/>
      <div className={` min-h-[550px] min-w-[600px] pt-20 w-full h-screen flex items-center justify-center bg-gradient-to-r ${theme === 'dark' ? 'from-slate-400 via-violet-800 via-25% to-violet-300 to-95%' : 'from-gray-200 via-emerald-200 via-25% to-gray-200 to-95%'} `}>
        <div id='conteiner inteiro' className={` min-h-[420px] min-w-[560px] w-8/12 h-5/6 rounded-lg overflow-hidden flex items-center justify-center  ${theme === 'dark' ? '' : 'border-2 border-gray-400'} `}>
          <div id='área do formulário' className="min-w-[250px] w-1/3 h-full bg-purple-800 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center bg-violet-200 px-4 w-full rounded-md shadow-lg h-full">
              <div id='img e texto' className="mb-10 font-semibold text-3xl p-2 text-center w-full text-slate-800">
                <div className="w-full flex items-center justify-center ">
                  <img
                    className={` w-[60px] mb-2 rounded-full ${theme === 'dark' ? 'bg-violet-500' : 'bg-violet-300'}  p-1 border-4 border-slate-700 `} src="/assets/newUser.png"
                  />
                </div>
                Registro
                <div className="mt-1 text-sm text-slate-500">
                  Crie sua nova conta
                </div>
              </div>
              <div id='inputs' className=" flex flex-col items-center justify-center gap-4">
                <input
                  placeholder="Email"
                  className="placeholder-gray-500 shadow-slate-500 mb-5 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md mx-auto text-black"
                />
                <input
                  placeholder="Senha" type="password"
                  className="placeholder-gray-500 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md shadow-slate-500 mx-auto text-black"
                />
                <input
                  placeholder="Repita sua senha" type="password"
                  className="placeholder-gray-500 text-sm bg-white border-1 rounded-full w-11/12 pl-4 p-2 shadow-md shadow-slate-500 mx-auto text-black"
                />
                <button className={` mt-3 text-sm ${theme === 'dark' ? 'bg-indigo-950 text-white' : 'bg-indigo-300 border-2 border-gray-500 text-black'}  w-6/12 p-2 shadow-md  rounded-xl `}
                onClick={() => redirect("/")}
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
