import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  function redirect(link: string) {
    navigate(link);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-cyan-700 to-purple-500">
      <div className="w-8/12 h-4/6 rounded-lg overflow-hidden flex  items-center justify-center">
        <div className="w-1/3 h-full bg-purple-800 flex flex-col items-center justify-center">
          <div className="bg-purple-800 px-4 w-full rounded-lg shadow-lg h-full">
            <div className="font-semibold text-xl mt-10 p-2 text-center w-full text-purple-100 mb-2 ">
              <div className="w-full flex items-center justify-center ">
                <img
                  className="w-[60px] rounded-full bg-yellow-500 p-1 border-4 border-purple-100"
                  src="/assets/mojodojo.png"
                />
              </div>
              Registro
            </div>
            <div className="flex items-center justify-center flex flex-col gap-4">
              <input
                placeholder="Email"
                className="w-full text-sm bg-white border-1 rounded-full w-10/12 pl-4 p-2 shadow-md mx-auto text-black"
              />
              <input
                placeholder="Senha"
                className="w-full text-sm bg-white border-1 rounded-full w-10/12 pl-4 p-2 shadow-md mx-auto text-black"
              />
              <button className="text-sm bg-blue-900 w-full p-2 shadow-md text-white rounded-full">
                Sign in
              </button>
              <button
                className="animate-bounce w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-sm rounded-full p-2 mt-2"
                onClick={() => redirect("/")}
              >
                MojoDojoCasaHouse
              </button>
              <button onClick={() => redirect("/products")}>Produtos</button>
            </div>
          </div>
        </div>
        <div className="bg-purple-600 w-2/3 h-full relative bg-login"></div>
      </div>
    </div>
  );
}
