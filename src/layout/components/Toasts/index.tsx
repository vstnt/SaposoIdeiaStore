import { toast, Flip } from "react-toastify";
import { Theme } from "../../../types/Theme";
import { Link } from "react-router-dom";


export const showToast = (type: string, toastText: string, emoticon: string|null, theme: Theme|null, options = {}) => {
    const SelectedComponent = toastComponents[type] || DefaultSubContainer;
    toast(<SelectedComponent toastText={toastText} emoticon={emoticon} />, {
        className: `${theme == 'dark' ? 'bg-gradient-to-b from-bgdarkpurple to-bgdarkblue/80 to-70% border border-white italic' : ''}`,
        position: "bottom-left",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        ...options,
    })
}


const DefaultSubContainer = ({ toastText, emoticon,}: { toastText: string; emoticon: string | null; }) => {
    return (
        <div className="flex gap-2 items-center">
            <div className="flex text-center whitespace-nowrap">{emoticon}</div>
            <div className="text-sm">{toastText}</div>
        </div>
    )
}

const CartToastSubContainer = ({ toastText, emoticon, }: { toastText: string; emoticon: string | null; }) => {
    return (
        <div
        className="flex gap-2 items-center">
            <div className="flex text-center whitespace-nowrap">{emoticon}</div>
            <div className="text-sm">{toastText}</div>
            <Link to={'/cart'}
                className="transition-all duration-300 border border-slate-500 rounded p-1 px-2 bg-green-200 text-black hover:bg-yellow-400">🛒 carrinho </Link>
        </div>
    )
}


// Mapeamento de componentes baseado no tipo
const toastComponents: {[key: string]: React.FC<{ toastText: string; emoticon: string | null }>} = { // isso aqui eu não entendo a sintáxe
    toCart: CartToastSubContainer,
    default: DefaultSubContainer,
  };