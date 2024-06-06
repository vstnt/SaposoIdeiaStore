import { useTheme } from "../../../context/Theme/useTheme"

export default function Footer() {
    const { theme } = useTheme()    

    return (
        <div className={` grid grid-cols-3 place-items-center h-60 border-t absolute bottom-auto w-full
        ${theme === 'dark' ? 'bg-[#0a0b25] border-indigo-500' 
        : 'bg-gradient-to-b from-slate-300/95 from-65% to-violet-300 text-black border-t-[3px] border-emerald-200'}`}>
            <div className="">SapoSaposo</div>
            <div>Contato</div>
            <div>Rick</div>
        </div>
    )
}