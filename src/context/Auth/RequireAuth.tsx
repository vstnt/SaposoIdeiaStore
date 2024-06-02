import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Login from "../../pages/login";

// Esse e o RequireNotAuth são usados nas routes, como forma de direcionar o usuário para os locais corretos caso esteja ou não logado.
// por ex: usuário logado não pode ir para a oágina de login, então é direcionado à página de minha conta.
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if(!auth.user) {
        return <Login/>
    }

    return children
}