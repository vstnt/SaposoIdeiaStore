import { Link } from "react-router-dom"
import { useTheme } from "../../../context/Theme/ThemeContext"

export default function Footer() {
    const { theme } = useTheme()    

    return (
        <div className={`px-12 grid grid-cols-1 md:grid-cols-4 justify-items-center items-center h-60 border-t absolute bottom-auto w-full
        ${theme === 'dark' ? 'bg-[#0a0b25] border-indigo-500' 
        : 'bg-gradient-to-b from-slate-200 from-65% to-violet-200 text-black border-t-[2px] border-indigo-300'}`}>
            
            <div className="font-mono text-lg">SapoSaposo</div>
            <div className="font-mono text-lg">SapoSaposo</div>
            <div className="font-mono text-lg">SapoSaposo</div>
            <div className="font-mono text-lg underline underline-offset-4"><Link to={'https://wa.me/message/B6TFIBMN7YE2H1'}>Contato dev Ricardo Mass</Link></div>


        </div>
    )
}