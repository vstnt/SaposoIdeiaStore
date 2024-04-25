import Navbar from "../../layout/components/Navbar";
import ProductDisplay from "../../layout/ProductsDisplay/ProductDisplay";

export default function Home() {

    return (
      <>
        <Navbar/>
        <div className="w-full bg-gradient-to-r from-slate-400 to-violet-950 pt-1 pr-5 h-[700px] grid grid-cols-3">
          <div id="lista produtos" className=" col-start-3 container rounded-lg flex flex-col gap-4 mt-36 w-fit h-fit">
            <div className=""><ProductDisplay productId={1} /></div>
            <div className=""><ProductDisplay productId={2} /></div>
            <div className=""><ProductDisplay productId={3} /></div>
            <div className=""><ProductDisplay productId={4} /></div>
        </div>
        </div>
      </>
      
    )
  }
  