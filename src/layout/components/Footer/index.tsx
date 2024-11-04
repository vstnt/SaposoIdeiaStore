import { Link } from "react-router-dom"
//import { useTheme } from "../../../context/Theme/ThemeContext"

export default function Footer() {
    //const { theme } = useTheme()    

    return (
        <div className={`h-[22rem] w-full flex flex-col gap-8 justify-end items-center bg-white text-black font-mono text-sm`}>
            
            <div title='icones redes sociais' className="flex justify-between gap-10  h-6 ">
                <Link title="Linkedin icon" to={'https://www.linkedin.com/in/ricardo-mass/'} className=" h-full">
                    <img src='/assets/linkedin.png' className='h-full'></img>
                </Link>                
                <Link title="Github icon" to={'https://github.com/vstnt'} className="h-full">
                    <img src='/assets/github.png' className='h-full'></img>
                </Link>                
                <Link title="Whatsapp icon" to={'https://wa.me/message/B6TFIBMN7YE2H1'} className="h-full ">
                    <img src='/assets/whatsapp.png' className='h-full'></img>
                </Link>
            </div>

            <img title='separador' src="/assets/separador2.png" className="w-[8rem] "></img>

            <div className="flex flex-col items-end gap-1">
                <div>ricardoaraujomass@gmail.com</div>
                <div>+55 41 99293 0654</div>
            </div>

            <img title='separador' src="/assets/separador2.png" className="w-[8rem]"></img>

            <div className="flex gap-8 justify-end ">
                <Link title="currículo" to={'/sla'} className="">
                    Currículo
                </Link>       
                <Link title="Portfólio" to={'/portfólio'} className="">
                    Portfólio
                </Link>       
                <Link title="Whatsapp" to={'https://wa.me/message/B6TFIBMN7YE2H1'} className=" ">
                    Whatsapp
                </Link>
            </div>

            <div className="md:w-[27rem] w-full h-8 flex items-center justify-center text-xs bg-[#C4C4C4]/30">Ricardo Mass, 2024</div>
            
        </div>
    )
}       