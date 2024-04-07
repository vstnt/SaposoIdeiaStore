import Navbar from "../../layout/components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function redirect(link: string) {
    navigate(link);
  }

  return (
    <>
      <Navbar/>
      <div id='bg' className="min-h-[550px] min-w-[600px] pt-20 w-full h-screen flex items-center justify-center bg-gradient-to-r from-slate-400 to-violet-950">
        <div id='conteiner inteiro' className="min-h-[420px] min-w-[560px] w-8/12 h-5/6 flex items-center justify-center rounded-lg overflow-hidden">
          <div id='bg img do conteiner' className="bg-purple-600 w-2/4 h-full relative bg-login">
          </div>
          <div id='área do formulário' className="min-w-[250px] w-1/2 h-full bg-purple-800 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center bg-gray-400 px-4 w-full rounded-md h-full">
              <div id='img e texto' className="mb-10 font-semibold text-xl p-2 text-center w-full text-slate-800">
                <div className="w-full flex items-center justify-center ">
                  <img
                    className="w-[60px] mb-2 rounded-full bg-emerald-300 p-1 border-4 border-slate-500"
                    src="/assets/login.png"
                  />
                </div>
                Log in
                <div className="text-sm text-slate-600">
                  Entre na sua conta
                </div>
              </div>
              <div id='inputs' className=" flex flex-col items-center justify-center gap-4">
                <input
                  placeholder="Email"
                  className="placeholder-gray-500 shadow-slate-500 mb-2 text-sm bg-white border-1 rounded-full w-2/3 pl-4 p-2 shadow-md mx-auto text-black"
                />
                <input
                  placeholder="Senha" type="password"
                  className="placeholder-gray-500 text-sm bg-white border-1 rounded-full w-2/3 pl-4 p-2 shadow-md shadow-slate-500 mx-auto text-black"
                />
                <button className="mt-4 text-sm bg-indigo-950 w-1/3 p-2 shadow-md text-white rounded-xl"
                onClick={() => redirect("/")}
                >
                  Entrar
                </button>

              </div>
            </div>
          </div>          
        </div>
      </div>
    </>
  );
}
