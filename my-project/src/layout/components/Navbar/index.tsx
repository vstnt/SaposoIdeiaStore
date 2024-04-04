import { Link } from "react-router-dom";

export default function Navbar() {
    return (
      <div className="w-full h-[60px] gap-2 flex items-center justify-center p-2 bg-purple-700">
        Navbar
        <Link to={'/register'}>Registrar</Link>
      </div>
    )
  }