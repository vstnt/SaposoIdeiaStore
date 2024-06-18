import { useTheme } from "../../../hooks/useTheme"

export default function Footer() {
    const { theme } = useTheme()    

    return (
        <div className={` grid grid-cols-3 place-items-center h-60 border-t absolute bottom-auto w-full
        ${theme === 'dark' ? 'bg-[#0a0b25] border-indigo-500' 
        : 'bg-gradient-to-b from-slate-200 from-65% to-violet-200 text-black border-t-[2px] border-indigo-300'}`}>
            <div className="">SapoSaposo</div>
            <div>Contato</div>
            <div>Rick</div>
        </div>
    )
}