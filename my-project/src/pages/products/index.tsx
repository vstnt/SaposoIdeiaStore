import Navbar from "../../layout/components/Navbar";
import { Link } from "react-router-dom";

export default function Products() {
    return (
      <>
        <Navbar/>
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-cyan-700 to-purple-100">
          Products
          <Link to={'/'}>Home</Link>
        </div>
      </>
    )
  }