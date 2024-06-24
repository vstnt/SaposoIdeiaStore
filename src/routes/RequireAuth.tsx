import Login from "../pages/login";
import { useAuth } from "../context/Auth/AuthContext";

// Esse e o RequireNotAuth são usados nas routes, como forma de direcionar o usuário para os locais corretos caso esteja ou não logado.
// por ex: usuário logado não pode ir para a oágina de login, então é direcionado à página de minha conta.
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth()

    if(!auth.user) {
        return <Login/>
    }
    return children
}